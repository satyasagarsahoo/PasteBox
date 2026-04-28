import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useReveal from '../components/useReveal';
import '../index.css';

export default function About() {
  useReveal();
  return (
    <>
      <Navbar />

      <main className="hero">
        <div className="content">
          <h1 className="reveal">About Us</h1>
          <p className="tagline reveal">Privacy isn't a feature, it's a right.</p>
          <p className="reveal" style={{ color: 'white', maxWidth: 500, lineHeight: 1.6 }}>
            PasteBox was born in Bhubaneswar with a simple goal: to make digital sharing
            as ephemeral as a conversation in person.
          </p>
        </div>
        <div className="illustration-container reveal">
          <div className="blob-bg"></div>
          <img
            src="/assets/image/iStock-1286378180-Converted-1.webp"
            alt="Privacy Illustration"
            onError={(e) => { e.target.src = 'https://illustrations.popsy.co/white/abstract-art.svg'; }}
          />
        </div>
      </main>

      <section className="how-it-works">
        <div className="header-group reveal">
          <h2>WHAT WE SOLVE</h2>
          <div className="line"></div>
        </div>
        <div className="steps-container">
          <div className="step-card reveal">
            <h3>THE PROBLEM</h3>
            <ul>
              <li>Files shared via email stay forever</li>
              <li>Cloud storage tracks your data</li>
              <li>No control over who accesses your files</li>
            </ul>
          </div>
          <div className="step-card reveal">
            <h3>OUR SOLUTION</h3>
            <ul>
              <li>Files self-destruct after use</li>
              <li>Zero tracking or analytics</li>
              <li>You control expiry & access</li>
            </ul>
          </div>
          <div className="step-card reveal">
            <h3>OUR MISSION</h3>
            <ul>
              <li>Privacy-first file sharing</li>
              <li>Simple, fast, no signup needed</li>
              <li>Open and transparent</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="why-choose">
        <div className="header-group-right reveal">
          <div className="line"></div>
          <h2>OUR VALUES</h2>
        </div>
        <div className="features-grid">
          {[
            { title: 'Privacy by Design', desc: 'Every feature is built with your privacy as the top priority. We store only what\'s needed, and only for as long as you allow.' },
            { title: 'Transparency', desc: 'We believe you should know exactly what happens to your data. Our process is simple and clear.' },
            { title: 'Zero Footprint', desc: 'Once your file expires, it is permanently deleted from our servers. No backups, no logs, no traces.' },
            { title: 'Accessibility', desc: 'No sign-up, no app download. PasteBox works in any browser on any device.' },
          ].map((v) => (
            <div className="feature-card reveal" key={v.title}>
              <h4>{v.title}</h4>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="how-it-works" style={{ background: '#fcf6e4', color: '#4a5d5a' }}>
        <div className="header-group reveal">
          <h2>THE FOUNDER</h2>
          <div className="line"></div>
        </div>
        <div className="steps-container">
          <div className="step-card reveal" style={{ width: '60%' }}>
            <h3>Satya Sagar Sahoo</h3>
            <p style={{ marginTop: 15, lineHeight: 1.8 }}>
              A developer from Bhubaneswar, Odisha, passionate about building tools that respect users.
              PasteBox started as a weekend project and grew into a mission — proving that useful software
              doesn't need to compromise on privacy.
            </p>
            <p style={{ marginTop: 10 }}>
              <a href="https://in.linkedin.com/in/satyasagarsahoo" target="_blank" rel="noreferrer"
                style={{ color: 'var(--nav-bg)', fontWeight: 700 }}>
                LinkedIn →
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
