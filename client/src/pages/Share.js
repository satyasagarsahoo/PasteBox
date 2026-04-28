import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useReveal from '../components/useReveal';
import '../index.css';

export default function Share() {
  useReveal();
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const [file, setFile] = useState(null);
  const [expiry, setExpiry] = useState('30');
  const [downloadLimit, setDownloadLimit] = useState('1');
  const [password, setPassword] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFile = (f) => {
    if (f) { setFile(f); setResult(null); setError(''); }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return setError('Please select a file first.');
    setUploading(true);
    setProgress(0);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('expiry', expiry);
    formData.append('downloadLimit', downloadLimit);
    if (password.trim()) formData.append('password', password);

    try {
      const res = await axios.post('/api/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          setProgress(Math.round((e.loaded * 100) / e.total));
        },
      });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const formatBytes = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const formatExpiry = (date) => new Date(date).toLocaleString();

  return (
    <>
      <Navbar />

      <main className="hero">
        <div className="content">
          <h1 className="reveal">Share File</h1>
          <p className="tagline reveal">Secure your data in seconds.</p>

          {/* Upload Zone */}
          <div
            className={`upload-zone reveal ${dragOver ? 'dragover' : ''}`}
            id="uploadArea"
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => !uploading && fileInputRef.current.click()}
          >
            <div className="upload-icon">✦</div>
            {file ? (
              <p style={{ color: '#f5d491', fontWeight: 700 }}>📄 {file.name} ({formatBytes(file.size)})</p>
            ) : (
              <>
                <p>Drag &amp; Drop files here</p>
                <p style={{ margin: '10px 0', fontSize: '0.8rem', opacity: 0.7 }}>— OR —</p>
                <span className="btn-upload" style={{
                  background: 'var(--nav-bg)', color: '#000', padding: '10px 25px',
                  borderRadius: '20px', fontWeight: 700, cursor: 'pointer'
                }}>SELECT FILE</span>
              </>
            )}
            <input type="file" ref={fileInputRef} hidden onChange={(e) => handleFile(e.target.files[0])} />

            {uploading && (
              <div className="progress-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
              </div>
            )}
          </div>

          {error && <div className="alert alert-error" style={{ marginTop: 15 }}>{error}</div>}

          {file && !result && !uploading && (
            <button className="btn-share" style={{ marginTop: 20, width: '100%' }} onClick={handleUpload}>
              UPLOAD & GENERATE CODE
            </button>
          )}

          {uploading && (
            <p style={{ color: 'white', marginTop: 15, textAlign: 'center' }}>
              Uploading... {progress}%
            </p>
          )}
        </div>

        {/* Dashboard panel */}
        <div className="illustration-container reveal">
          {result ? (
            <div className="share-dashboard">
              <div className="alert alert-success">✅ File uploaded successfully!</div>

              <div className="dash-item">
                <label>UNIQUE SHARE LINK</label>
                <div className="input-action">
                  <input type="text" readOnly value={result.shareUrl} />
                  <button className="btn-copy" onClick={() => copyToClipboard(result.shareUrl)}>
                    {copied ? '✓' : 'COPY'}
                  </button>
                </div>
              </div>

              <div className="dash-grid">
                <div className="dash-item">
                  <label>6-DIGIT ACCESS CODE</label>
                  <div className="digit-code">
                    {result.accessCode.split('').join(' ')}
                  </div>
                </div>
                <div className="dash-item">
                  <label>DYNAMIC QR</label>
                  <div className="qr-box">
                    {result.qrCode && <img src={result.qrCode} alt="QR Code" />}
                  </div>
                </div>
              </div>

              <div className="dash-item" style={{ fontSize: '0.8rem', color: '#666', marginTop: 10 }}>
                <p>📁 {result.fileName} ({formatBytes(result.fileSize)})</p>
                <p>⏰ Expires: {formatExpiry(result.expiry)}</p>
                <p>⬇️ Downloads: {result.downloadLimit === -1 ? 'Unlimited' : result.downloadLimit}</p>
              </div>

              <button
                className="btn-share"
                style={{ width: '100%', marginTop: 15 }}
                onClick={() => { setFile(null); setResult(null); setPassword(''); }}
              >
                SHARE ANOTHER FILE
              </button>
            </div>
          ) : (
            <div className="share-dashboard">
              <div className="dash-item">
                <label>UNIQUE SHARE LINK</label>
                <div className="input-action">
                  <input type="text" readOnly value="Upload a file to generate" style={{ opacity: 0.5 }} />
                  <button className="btn-copy" disabled style={{ opacity: 0.5 }}>COPY</button>
                </div>
              </div>
              <div className="dash-grid">
                <div className="dash-item">
                  <label>6-DIGIT ACCESS CODE</label>
                  <div className="digit-code" style={{ opacity: 0.4 }}>— — — — — —</div>
                </div>
                <div className="dash-item">
                  <label>DYNAMIC QR</label>
                  <div className="qr-box">
                    <div style={{ width: 60, height: 60, background: 'repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 50% / 10px 10px', opacity: 0.4 }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Link Control */}
      <section className="how-it-works">
        <div className="header-group reveal">
          <h2>LINK CONTROL</h2>
          <div className="line"></div>
        </div>
        <div className="steps-container">
          <div className="step-card reveal">
            <h4>Expiration</h4>
            <select className="minimal-select" value={expiry} onChange={(e) => setExpiry(e.target.value)}>
              <option value="10">10 Minutes</option>
              <option value="30">30 Minutes</option>
              <option value="60">60 Minutes</option>
            </select>
          </div>
          <div className="step-card reveal">
            <h4>Download Limit</h4>
            <select className="minimal-select" value={downloadLimit} onChange={(e) => setDownloadLimit(e.target.value)}>
              <option value="1">1 Time</option>
              <option value="5">5 Times</option>
              <option value="unlimited">Unlimited</option>
            </select>
          </div>
          <div className="step-card reveal">
            <h4>Password</h4>
            <input
              type="password"
              placeholder="Optional"
              className="minimal-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Live Status */}
      <section className="why-choose">
        <div className="header-group-right reveal">
          <div className="line"></div>
          <h2>LIVE STATUS</h2>
        </div>
        <div className="features-grid">
          <div className="feature-card reveal">
            <h4>Encryption</h4>
            <p>AES-256 GCM Enabled</p>
          </div>
          <div className="feature-card reveal">
            <h4>Server Node</h4>
            <p>MongoDB Atlas (Active)</p>
          </div>
          <div className="feature-card reveal">
            <h4>Integrity</h4>
            <p>SHA-256 Checksum Verified</p>
          </div>
        </div>
      </section>

      <section className="how-it-works" style={{ background: '#f5d491', color: '#4a5d5a' }}>
        <div className="header-group reveal">
          <h2>HOW TO SHARE</h2>
          <div className="line"></div>
        </div>
        <div className="instruction-flex">
          <p>1. Upload your file. 2. Copy the <strong>6-digit code</strong>. 3. Send it to the recipient to use on the <strong>Receive Page</strong>.</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
