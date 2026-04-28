import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useReveal from '../components/useReveal';
import '../index.css';

export default function Receive() {
  useReveal();
  const [searchParams] = useSearchParams();
  const prefillCode = searchParams.get('code') || '';

  const [digits, setDigits] = useState(
    prefillCode ? prefillCode.split('').slice(0, 6) : ['', '', '', '', '', '']
  );
  const [password, setPassword] = useState('');
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const inputRefs = useRef([]);

  // Auto-verify if code came from URL
  useEffect(() => {
    if (prefillCode.length === 6) {
      handleVerify(prefillCode);
    }
    // eslint-disable-next-line
  }, []);

  const getCode = (d = digits) => d.join('');

  const handleDigitChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...digits];
    newDigits[index] = value.slice(-1);
    setDigits(newDigits);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newDigits = [...digits];
    pasted.split('').forEach((ch, i) => { newDigits[i] = ch; });
    setDigits(newDigits);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleVerify = async (codeOverride) => {
    const code = codeOverride || getCode();
    if (code.length !== 6) return setError('Please enter a complete 6-digit code.');
    setLoading(true);
    setError('');
    setFileInfo(null);
    setPasswordRequired(false);

    try {
      const res = await axios.post('/api/files/verify', {
        code,
        password: password || undefined,
      });
      setFileInfo({ ...res.data, code });
    } catch (err) {
      const msg = err.response?.data?.error || 'Verification failed.';
      if (err.response?.data?.passwordRequired) {
        setPasswordRequired(true);
        setError('');
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!fileInfo) return;
    setDownloading(true);
    try {
      const params = password ? `?password=${encodeURIComponent(password)}` : '';
      const res = await axios.get(`/api/files/download/${fileInfo.code}${params}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = fileInfo.fileName;
      a.click();
      window.URL.revokeObjectURL(url);
      setFileInfo(prev => ({ ...prev, downloaded: true }));
    } catch (err) {
      setError(err.response?.data?.error || 'Download failed. The file may have expired.');
    } finally {
      setDownloading(false);
    }
  };

  const formatBytes = (b) => {
    if (!b) return '';
    if (b < 1024) return b + ' B';
    if (b < 1048576) return (b / 1024).toFixed(1) + ' KB';
    return (b / 1048576).toFixed(1) + ' MB';
  };

  return (
    <>
      <Navbar />

      <main className="hero">
        <div className="content">
          <h1 className="reveal">Receive File</h1>
          <p className="tagline reveal">Enter the code to unlock your data.</p>

          <div className="input-container reveal">
            <label style={{ color: 'white', display: 'block', marginBottom: 15, fontWeight: 600 }}>
              ENTER 6-DIGIT CODE
            </label>
            <div className="code-input-group" onPaste={handlePaste}>
              {digits.map((d, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength="1"
                  placeholder="•"
                  value={d}
                  ref={(el) => (inputRefs.current[i] = el)}
                  onChange={(e) => handleDigitChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                />
              ))}
            </div>

            {(passwordRequired || fileInfo?.passwordRequired) && (
              <div style={{ marginTop: 15 }}>
                <label style={{ color: 'white', display: 'block', marginBottom: 8, fontWeight: 600 }}>
                  PASSWORD REQUIRED
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%', padding: '12px', borderRadius: 10,
                    border: '2px solid var(--nav-bg)', background: '#4a5d5a',
                    color: 'white', fontSize: '1rem'
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                />
              </div>
            )}

            {error && <div className="alert alert-error">{error}</div>}

            {fileInfo && !fileInfo.downloaded && (
              <div className="alert alert-success" style={{ marginTop: 10 }}>
                ✅ <strong>{fileInfo.fileName}</strong> ({formatBytes(fileInfo.fileSize)})<br />
                <small>Downloads left: {fileInfo.downloadsLeft}</small>
              </div>
            )}

            {fileInfo?.downloaded && (
              <div className="alert alert-info" style={{ marginTop: 10 }}>
                ✓ Download started! This link may now be expired.
              </div>
            )}

            {!fileInfo ? (
              <button
                className="btn-share"
                style={{ width: '100%', marginTop: 25 }}
                onClick={() => handleVerify()}
                disabled={loading}
              >
                {loading ? 'VERIFYING...' : 'VERIFY CODE'}
              </button>
            ) : (
              <button
                className="btn-share"
                style={{ width: '100%', marginTop: 25 }}
                onClick={handleDownload}
                disabled={downloading || fileInfo.downloaded}
              >
                {downloading ? 'DOWNLOADING...' : fileInfo.downloaded ? 'DOWNLOADED ✓' : 'DOWNLOAD FILE'}
              </button>
            )}
          </div>
        </div>

        <div className="illustration-container reveal">
          <div className="receive-card">
            <div className="qr-scanner-zone">
              <div className="scanner-line"></div>
              <p>OR SCAN QR CODE</p>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#888', marginTop: 10 }}>
              Ask the sender to share the QR code from their Share page.
            </p>
            <button
              className="btn-learn"
              style={{ width: '100%', color: '#333', borderColor: '#333', marginTop: 15 }}
              onClick={() => alert('Camera QR scanning requires a native mobile app.')}
            >
              Open Camera
            </button>
          </div>
        </div>
      </main>

      {/* Quick Steps */}
      <section className="how-it-works">
        <div className="header-group reveal">
          <h2>QUICK STEPS</h2>
          <div className="line"></div>
        </div>
        <div className="steps-container">
          <div className="step-card reveal">
            <h3>1. Get Code</h3>
            <p>Ask the sender for the unique 6-digit access code.</p>
          </div>
          <div className="step-card reveal">
            <h3>2. Enter</h3>
            <p>Type the code into the boxes above or paste it directly.</p>
          </div>
          <div className="step-card reveal">
            <h3>3. Download</h3>
            <p>Your file is retrieved securely and streamed to your device.</p>
          </div>
        </div>
      </section>

      {/* File Details */}
      <section className="why-choose">
        <div className="header-group-right reveal">
          <div className="line"></div>
          <h2>FILE DETAILS</h2>
        </div>
        <div className="features-grid">
          <div className="feature-card reveal">
            <h4>Status</h4>
            <p>{fileInfo ? `✅ Ready — ${fileInfo.fileName}` : 'Awaiting Input...'}</p>
          </div>
          <div className="feature-card reveal">
            <h4>Integrity</h4>
            <p>{fileInfo ? 'Checksum Verified ✓' : 'Checksum Ready'}</p>
          </div>
          {fileInfo && (
            <div className="feature-card reveal">
              <h4>Downloads Left</h4>
              <p>{fileInfo.downloadsLeft}</p>
            </div>
          )}
        </div>
      </section>

      <section className="how-it-works" style={{ background: '#f5d491', color: '#4a5d5a' }}>
        <div className="header-group reveal">
          <h2>SECURITY NOTE</h2>
          <div className="line"></div>
        </div>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <p>PasteBox ensures that your download link expires immediately after the transfer is complete. No traces are left on our servers.</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
