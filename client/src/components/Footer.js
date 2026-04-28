import React from 'react';

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="contact-card reveal">
          <p><strong>Email:</strong> ssagarsahoo23@gmail.com</p>
          <p><strong>Website:</strong> www.pastebox.com</p>
          <p><strong>Location:</strong> Bhubaneswar, Odisha, India</p>
          <p><strong>LinkedIn:</strong> satyasagarsahoo</p>
        </div>
        <div className="footer-illustration reveal">
          <div className="blob-bg-footer"></div>
          <img
            src="/assets/image/97c30568-407d-4db7-a59d-89cb1992919b.gif"
            alt="Contact Us Illustration"
            className="floating"
          />
        </div>
      </div>
      <div className="bottom-bar">
        <p>Developed by <a href="https://in.linkedin.com/in/satyasagarsahoo" target="_blank" rel="noreferrer">Satya  Sagar Sahoo</a></p>
      </div>
    </footer>
  );
}
