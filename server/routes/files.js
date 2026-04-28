const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFSBucket } = require('mongodb');
const bcrypt = require('bcryptjs');
const QRCode = require('qrcode');
const { Readable } = require('stream');
const File = require('../models/File');

// Multer memory storage (we stream to GridFS manually)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100 MB max
});

// Helper: generate a unique 6-digit code
async function generateUniqueCode() {
  let code, exists;
  do {
    code = Math.floor(100000 + Math.random() * 900000).toString();
    exists = await File.findOne({ accessCode: code });
  } while (exists);
  return code;
}

// Helper: calculate expiry date
function getExpiryDate(option) {
  const now = new Date();
  const map = {
    '10': 10,
    '30': 30,
    '60': 60
  };
  const minutes = map[option] || 30;
  return new Date(now.getTime() + minutes * 60 * 1000);
}

// Helper: parse download limit
function parseDownloadLimit(option) {
  if (option === 'unlimited') return -1;
  return parseInt(option) || 1;
}

// ─── POST /api/files/upload ────────────────────────────────────────────────
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const gfsBucket = req.app.locals.gfsBucket;
    if (!gfsBucket) return res.status(500).json({ error: 'Storage not ready' });

    const { expiry = '30', downloadLimit = '1', password } = req.body;

    // Stream buffer → GridFS
    const readableStream = Readable.from(req.file.buffer);
    const uploadStream = gfsBucket.openUploadStream(req.file.originalname, {
      contentType: req.file.mimetype
    });

    await new Promise((resolve, reject) => {
      readableStream.pipe(uploadStream)
        .on('finish', resolve)
        .on('error', reject);
    });

    const gridfsId = uploadStream.id;
    const accessCode = await generateUniqueCode();
    const baseUrl = process.env.CLIENT_URL || 'http://localhost:3000';
    const shareUrl = `${baseUrl}/receive?code=${accessCode}`;

    // Hash password if provided
    let hashedPassword = null;
    if (password && password.trim() !== '') {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Generate QR Code
    const qrCode = await QRCode.toDataURL(shareUrl);

    const expiryDate = getExpiryDate(expiry);
    const dlLimit = parseDownloadLimit(downloadLimit);

    const fileDoc = await File.create({
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      gridfsId,
      accessCode,
      shareUrl,
      qrCode,
      password: hashedPassword,
      expiry: expiryDate,
      downloadLimit: dlLimit,
      downloadCount: 0
    });

    res.status(201).json({
      success: true,
      accessCode: fileDoc.accessCode,
      shareUrl: fileDoc.shareUrl,
      qrCode: fileDoc.qrCode,
      expiry: fileDoc.expiry,
      downloadLimit: fileDoc.downloadLimit,
      fileName: fileDoc.originalName,
      fileSize: fileDoc.size
    });

  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Upload failed', details: err.message });
  }
});

// ─── POST /api/files/verify ────────────────────────────────────────────────
router.post('/verify', async (req, res) => {
  try {
    const { code, password } = req.body;
    if (!code) return res.status(400).json({ error: 'Access code required' });

    const file = await File.findOne({ accessCode: code });
    if (!file) return res.status(404).json({ error: 'Invalid access code' });

    if (!file.isAccessible()) {
      return res.status(410).json({ error: 'This file has expired or reached its download limit' });
    }

    // Check password if set
    if (file.password) {
      if (!password) return res.status(401).json({ error: 'Password required', passwordRequired: true });
      const match = await bcrypt.compare(password, file.password);
      if (!match) return res.status(401).json({ error: 'Incorrect password' });
    }

    res.json({
      success: true,
      fileName: file.originalName,
      fileSize: file.size,
      mimetype: file.mimetype,
      downloadsLeft: file.downloadLimit === -1 ? 'Unlimited' : (file.downloadLimit - file.downloadCount),
      expiry: file.expiry
    });

  } catch (err) {
    console.error('Verify error:', err);
    res.status(500).json({ error: 'Verification failed' });
  }
});

// ─── GET /api/files/download/:code ────────────────────────────────────────
router.get('/download/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const { password } = req.query;

    const file = await File.findOne({ accessCode: code });
    if (!file) return res.status(404).json({ error: 'Invalid access code' });

    if (!file.isAccessible()) {
      return res.status(410).json({ error: 'This file has expired or reached its download limit' });
    }

    // Check password
    if (file.password) {
      if (!password) return res.status(401).json({ error: 'Password required', passwordRequired: true });
      const match = await bcrypt.compare(password, file.password);
      if (!match) return res.status(401).json({ error: 'Incorrect password' });
    }

    const gfsBucket = req.app.locals.gfsBucket;

    // Increment download count
    file.downloadCount += 1;
    if (file.downloadLimit !== -1 && file.downloadCount >= file.downloadLimit) {
      file.isExpired = true;
    }
    await file.save();

    // Stream file from GridFS
    res.set({
      'Content-Type': file.mimetype,
      'Content-Disposition': `attachment; filename="${encodeURIComponent(file.originalName)}"`,
      'Content-Length': file.size
    });

    const downloadStream = gfsBucket.openDownloadStream(new mongoose.Types.ObjectId(file.gridfsId));
    downloadStream.pipe(res);
    downloadStream.on('error', () => res.status(500).json({ error: 'Download stream error' }));

  } catch (err) {
    console.error('Download error:', err);
    res.status(500).json({ error: 'Download failed' });
  }
});

// ─── GET /api/files/status/:code ──────────────────────────────────────────
router.get('/status/:code', async (req, res) => {
  try {
    const file = await File.findOne({ accessCode: req.params.code });
    if (!file) return res.status(404).json({ error: 'Not found' });

    res.json({
      isAccessible: file.isAccessible(),
      downloadCount: file.downloadCount,
      downloadLimit: file.downloadLimit,
      expiry: file.expiry,
      isExpired: file.isExpired
    });
  } catch (err) {
    res.status(500).json({ error: 'Status check failed' });
  }
});

module.exports = router;
