import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useReveal from '../components/useReveal';
import '../index.css';

export default function Home() {
  useReveal();
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <main className="hero">
        <div className="content">
          <h1 className="reveal">PasteBox</h1>
          <p className="tagline reveal">Share without any footprints!!!</p>
          <div className="btn-group reveal">
            <button className="btn-share" onClick={() => navigate('/share')}>SHARE NOW</button>
            <button className="btn-learn" onClick={() => navigate('/about')}>LEARN MORE</button>
          </div>
        </div>
        <div className="illustration-container reveal">
          <div className="blob-bg"></div>
          <img src="/assets/image/1-1024x908.webp" alt="Laptops sharing files" />
        </div>
      </main>

      <section className="how-it-works">
        <div className="header-group reveal">
          <h2>HOW DOES IT WORK</h2>
          <div className="line"></div>
        </div>
        <div className="steps-container">
          <div className="step-card reveal">
            <h3>UPLOAD</h3>
            <ul>
              <li>Drag &amp; drop or select your file</li>
              <li>Supports multiple formats</li>
            </ul>
          </div>
          <div className="step-card reveal">
            <h3>GENERATE LINK</h3>
            <ul>
              <li>Instant secure link is created</li>
              <li>Optional password / expiry settings</li>
            </ul>
          </div>
          <div className="step-card reveal">
            <h3>SHARE &amp; EXPIRE</h3>
            <ul>
              <li>Send the link to anyone</li>
              <li>File auto-deletes after access or time limit</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="why-choose">
        <div className="header-group-right reveal">
          <div className="line"></div>
          <h2>WHY CHOOSE PASTEBOX</h2>
        </div>
        <div className="features-grid">
          {[
            { title: 'Privacy First', items: ['No data tracking', 'Zero storage after expiry', 'End-to-end encrypted'] },
            { title: 'Fast & Lightweight', items: ['Instant uploads', 'No login required', 'Minimal UI for quick use'] },
            { title: 'Auto-Destruction', items: ['Files expire after download', 'No digital footprint left behind'] },
            { title: 'Secure Link Sharing', items: ['Unique encrypted links', 'Optional password protection'] },
            { title: 'Multi-Format Support', items: ['Share documents, images, videos, etc.'] },
            { title: 'Accessible Anywhere', items: ['Works on all devices (mobile, tablet, desktop)'] },
          ].map((f) => (
            <div className="feature-card reveal" key={f.title}>
              <h4>{f.title}</h4>
              <ul>{f.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
