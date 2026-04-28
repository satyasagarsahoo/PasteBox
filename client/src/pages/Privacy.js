import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useReveal from '../components/useReveal';
import '../index.css';

export default function Privacy() {
  useReveal();
  return (
    <>
      <Navbar />

      <div className="legal-hero">
        <h1 className="reveal" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '3rem', color: 'white', marginBottom: 15 }}>
          Privacy Policy
        </h1>
        <p className="reveal" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>
          Last updated: April 2026
        </p>
      </div>

      <div className="legal-container">
        {[
          {
            title: '1. Information We Collect',
            content: null,
            list: [
              'The file you upload (stored temporarily in GridFS, deleted after expiry)',
              'File metadata: original name, size, MIME type',
              'Upload timestamp and expiry settings you choose',
              'We do NOT collect your name, email, IP address, or any personal identifiers',
            ],
          },
          {
            title: '2. How We Use Your Information',
            content: 'The only purpose of storing your file is to make it available to the recipient via the 6-digit access code. No analytics, no advertising, no profiling.',
          },
          {
            title: '3. File Retention & Deletion',
            content: null,
            list: [
              'Files are automatically deleted when the expiry time is reached',
              'Files are deleted when the download limit is reached',
              'No backups are kept after deletion',
              'Metadata records are also removed upon expiry',
            ],
          },
          {
            title: '4. Security',
            content: 'All transfers are conducted over HTTPS. Passwords are hashed with bcrypt and never stored in plaintext. Files are stored in MongoDB GridFS with access controlled via unique codes.',
          },
          {
            title: '5. Cookies & Tracking',
            content: 'PasteBox does not use cookies, tracking pixels, analytics tools, or any third-party trackers. We do not use Google Analytics or any similar service.',
          },
          {
            title: '6. Third-Party Services',
            content: 'We use MongoDB Atlas as our cloud database provider. Files stored in GridFS are subject to MongoDB\'s data handling practices. No other third-party services have access to your files.',
          },
          {
            title: '7. Your Rights',
            content: null,
            list: [
              'You may share the access code with as many or as few people as you choose',
              'You can set the file to expire in as little as 10 minutes',
              'You can password-protect files to restrict access',
              'Files cannot be retrieved after expiry — not even by us',
            ],
          },
          {
            title: '8. Contact',
            content: 'If you have any privacy-related concerns, please reach out: ssagarsahoo23@gmail.com',
          },
        ].map((s) => (
          <div className="legal-section reveal" key={s.title}>
            <h3>{s.title}</h3>
            {s.content && <p>{s.content}</p>}
            {s.list && (
              <ul>
                {s.list.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}
