import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useReveal from '../components/useReveal';
import '../index.css';

export default function Products() {
  useReveal();
  return (
    <>
      <Navbar />

      <main className="hero">
        <div className="content">
          <h1 className="reveal">Product Info</h1>
          <p className="tagline reveal">Enterprise-grade privacy for everyone.</p>
          <p className="reveal" style={{ color: 'white', maxWidth: 500, lineHeight: 1.6 }}>
            PasteBox combines military-grade encryption with dead-simple UX —
            no setup, no accounts, no compromise.
          </p>
        </div>
        <div className="illustration-container reveal">
          <div className="tech-stack-visual">
            <div className="glow-effect"></div>
            <div className="data-line"></div>
            <div className="data-line"></div>
            <div className="data-line"></div>
            <div className="shield-icon">
              <div className="lock-bolt"></div>
            </div>
          </div>
        </div>
      </main>

      <section className="how-it-works">
        <div className="header-group reveal">
          <h2>HOW IT'S BUILT</h2>
          <div className="line"></div>
        </div>
        <div className="steps-container">
          <div className="step-card reveal">
            <h3>UPLOAD</h3>
            <p>Your file is streamed directly into MongoDB GridFS using chunked binary storage — no temp files on disk.</p>
          </div>
          <div className="step-card reveal">
            <h3>SECURE</h3>
            <p>A random 6-digit code is generated. Passwords are hashed with bcrypt (10 rounds). Transfer is over HTTPS.</p>
          </div>
          <div className="step-card reveal">
            <h3>EXPIRE</h3>
            <p>After the time or download limit is hit, the GridFS chunks and metadata are flagged expired and removed.</p>
          </div>
        </div>
      </section>

      <section className="why-choose">
        <div className="header-group-right reveal">
          <div className="line"></div>
          <h2>PRODUCT SPECS</h2>
        </div>
        <div className="features-grid">
          {[
            { title: 'Max File Size', desc: '100 MB per upload. Streamed via GridFS — no RAM bottleneck.' },
            { title: 'Expiry Options', desc: '10 minutes, 30 minutes, or 60 minutes from upload time.' },
            { title: 'Download Limits', desc: 'Set 1, 5, or unlimited downloads. File locks after limit is reached.' },
            { title: 'Password Protection', desc: 'Optional bcrypt-hashed password enforced server-side before download.' },
            { title: 'QR Code', desc: 'Auto-generated QR encodes the direct receive URL with code prefilled.' },
            { title: 'File Types', desc: 'All file types supported — documents, images, videos, archives, etc.' },
            { title: 'Storage', desc: 'MongoDB GridFS on Atlas cloud — globally distributed, always available.' },
            { title: 'No Login', desc: 'Zero authentication required. Share in under 10 seconds.' },
          ].map((s) => (
            <div className="feature-card reveal" key={s.title}>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="how-it-works" style={{ background: '#f5d491', color: '#4a5d5a' }}>
        <div className="header-group reveal">
          <h2>API ENDPOINTS</h2>
          <div className="line"></div>
        </div>
        <div className="steps-container">
          <div className="step-card reveal">
            <h4>POST /api/files/upload</h4>
            <p>Upload a file with expiry, download limit, and optional password. Returns access code + QR.</p>
          </div>
          <div className="step-card reveal">
            <h4>POST /api/files/verify</h4>
            <p>Verify a 6-digit code and optional password. Returns file metadata before download.</p>
          </div>
          <div className="step-card reveal">
            <h4>GET /api/files/download/:code</h4>
            <p>Stream the file binary to the client. Increments download count and auto-expires if limit hit.</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
