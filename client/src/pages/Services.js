import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useReveal from '../components/useReveal';
import '../index.css';

export default function Services() {
  useReveal();
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <main className="hero">
        <div className="content">
          <h1 className="reveal">Our Services</h1>
          <p className="tagline reveal">Built for speed, locked for privacy.</p>
          <div className="btn-group reveal">
            <button className="btn-share" onClick={() => navigate('/share')}>START UPLOADING</button>
          </div>
        </div>
        <div className="illustration-container reveal">
          <div className="abstract-graphic">
            <div className="orb-core"></div>
            <div className="pulse-ring"></div>
            <div className="pulse-ring" style={{ animationDelay: '1s' }}></div>
            <div className="pulse-ring" style={{ animationDelay: '2s' }}></div>
            <div className="floating-particles">
              <span></span><span></span><span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </main>

      <section className="how-it-works">
        <div className="header-group reveal">
          <h2>CORE SERVICES</h2>
          <div className="line"></div>
        </div>
        <div className="steps-container">
          <div className="step-card reveal">
            <h3>FILE SHARE</h3>
            <ul>
              <li>Upload any file type</li>
              <li>Get a unique 6-digit code</li>
              <li>Share via link or QR code</li>
            </ul>
          </div>
          <div className="step-card reveal">
            <h3>AUTO EXPIRE</h3>
            <ul>
              <li>Set expiry: 10, 30, or 60 mins</li>
              <li>Limit downloads: 1, 5, or unlimited</li>
              <li>File deleted after expiry</li>
            </ul>
          </div>
          <div className="step-card reveal">
            <h3>SECURE ACCESS</h3>
            <ul>
              <li>Optional password protection</li>
              <li>End-to-end secure transfer</li>
              <li>No account needed</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="why-choose">
        <div className="header-group-right reveal">
          <div className="line"></div>
          <h2>SERVICE FEATURES</h2>
        </div>
        <div className="features-grid">
          {[
            { title: 'Instant Upload', desc: 'Files go directly to our secure GridFS storage on MongoDB Atlas — no preprocessing delays.' },
            { title: 'QR Code Generation', desc: 'Every upload generates a scannable QR code that links directly to the receive page with the code prefilled.' },
            { title: 'Password Lock', desc: 'Add a password to your share so only the intended recipient can download the file.' },
            { title: 'Auto-Destruction', desc: 'Files are permanently deleted from storage when the expiry time passes or the download limit is reached.' },
            { title: 'Large File Support', desc: 'Upload files up to 100 MB. Streamed directly without loading fully into memory.' },
            { title: 'No Registration', desc: 'Start sharing in seconds — no email, no account, no tracking.' },
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
          <h2>TECH STACK</h2>
          <div className="line"></div>
        </div>
        <div className="steps-container">
          <div className="step-card reveal">
            <h3>FRONTEND</h3>
            <ul>
              <li>React 18 + React Router</li>
              <li>Axios for API calls</li>
              <li>Custom CSS animations</li>
            </ul>
          </div>
          <div className="step-card reveal">
            <h3>BACKEND</h3>
            <ul>
              <li>Node.js + Express</li>
              <li>Multer for file handling</li>
              <li>bcryptjs for passwords</li>
            </ul>
          </div>
          <div className="step-card reveal">
            <h3>DATABASE</h3>
            <ul>
              <li>MongoDB Atlas</li>
              <li>GridFS for file storage</li>
              <li>Mongoose ODM</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
