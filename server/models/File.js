const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  gridfsId: { type: mongoose.Schema.Types.ObjectId, required: true },
  accessCode: { type: String, required: true, unique: true, length: 6 },
  shareUrl: { type: String, required: true },
  qrCode: { type: String }, // base64 QR image
  password: { type: String, default: null }, // bcrypt hash if set
  expiry: { type: Date, required: true },
  downloadLimit: { type: Number, default: 1 }, // -1 = unlimited
  downloadCount: { type: Number, default: 0 },
  isExpired: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Auto-expire check
fileSchema.methods.isAccessible = function () {
  if (this.isExpired) return false;
  if (new Date() > this.expiry) return false;
  if (this.downloadLimit !== -1 && this.downloadCount >= this.downloadLimit) return false;
  return true;
};

module.exports = mongoose.model('File', fileSchema);
