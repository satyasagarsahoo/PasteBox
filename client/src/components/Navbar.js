import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/products', label: 'Products' },
  { to: '/share', label: 'Share' },
  { to: '/receive', label: 'Receive' },
  { to: '/privacy', label: 'Privacy' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile menu whenever the URL changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="navbar-header">
      <Link to="/" className="logo">PasteBox</Link>


      {/* Hamburger Toggle Button */}
      <button 
        className={`menu-toggle ${isOpen ? 'is-active' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <nav className={`nav-menu ${isOpen ? 'nav-open' : ''}`}>
        {NAV_LINKS.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`nav-link ${pathname === link.to ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}