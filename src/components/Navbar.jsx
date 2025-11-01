import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import './Navbar.css';

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false); // Close menu on mobile after clicking
    
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const navbarHeight = 70; // Approximate navbar height
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 300);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 70; // Approximate navbar height
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleProjectsClick = () => {
    setIsMenuOpen(false);
    // Scroll to top immediately when clicking Projects
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-spacer"></div>
        
        {/* Hamburger Menu Button */}
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        {/* Theme toggle - visible on mobile navbar */}
        <button className="theme-toggle theme-toggle-mobile" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        
        <div className={`navbar-right ${isMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-menu">
            <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
            <li><a href="#experience" onClick={(e) => { e.preventDefault(); scrollToSection('experience'); }}>Experience</a></li>
            <li><a href="#education" onClick={(e) => { e.preventDefault(); scrollToSection('education'); }}>Education</a></li>
            <li><Link to="/projects" onClick={handleProjectsClick}>Projects</Link></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
          </ul>
          
          {/* Theme toggle for desktop */}
          <button className="theme-toggle theme-toggle-desktop" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;