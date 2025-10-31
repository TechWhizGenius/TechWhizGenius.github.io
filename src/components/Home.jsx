import { useEffect, useRef, useState } from 'react';
import './Home.css';

function Home() {
  const canvasRef = useRef(null);
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    { prefix: "I'm a ", text: 'MLOps Engineer' },
    { prefix: "I'm an ", text: 'AI Researcher' },
    { prefix: 'I build ', text: 'RAG Systems' },
    { prefix: 'I deploy ', text: 'ML at Scale' }
  ];

  // Typing animation effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const fullText = currentRole.prefix + currentRole.text;
    const displayText = fullText.substring(currentRole.prefix.length);
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (typedText.length < displayText.length) {
          setTypedText(displayText.substring(0, typedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(displayText.substring(0, typedText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, roleIndex]);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    updateCanvasSize();

    const particles = [];
    const particleCount = 60;
    const maxDistance = 150;
    const mouse = { x: null, y: null, radius: 150 };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 1.5 + 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        if (mouse.x && mouse.y) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.vx -= Math.cos(angle) * force * 0.05;
            this.vy -= Math.sin(angle) * force * 0.05;
          }
        }

        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > 1) {
          this.vx = (this.vx / speed) * 1;
          this.vy = (this.vy / speed) * 1;
        }
      }

      draw(theme) {
        const color = theme === 'dark' 
          ? 'rgba(150, 150, 150, 0.15)' 
          : 'rgba(100, 100, 100, 0.18)';
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    function animate() {
      const theme = document.documentElement.getAttribute('data-theme');
      const bgColor = theme === 'dark' 
        ? 'rgba(10, 10, 10, 0.12)' 
        : 'rgba(255, 255, 255, 0.12)';
      
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw(theme);
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.04;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = theme === 'dark'
              ? `rgba(150, 150, 150, ${opacity})`
              : `rgba(100, 100, 100, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      updateCanvasSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const currentRole = roles[roleIndex];

  return (
    <section id="home" className="home-section">
      <canvas ref={canvasRef} className="home-canvas"></canvas>
      
      <div className="availability-badge">
        🟢 Open to Opportunities
      </div>

      <div className="home-centered">
        <div className="home-content-centered">
          <div className="profile-image-top">
            <img 
              src="/images/profile.jpg" 
              alt="Teja Mandaloju" 
              className="profile-img"
            />
          </div>
          
          <h1 className="home-name">TEJA MANDALOJU</h1>
          
          <div className="typing-container">
            <span className="typing-prefix">{currentRole.prefix}</span>
            <span className="typing-text">{typedText}</span>
            <span className="typing-cursor">|</span>
          </div>
          
          <div className="divider"></div>
          
          <div className="home-social-top">
            <a href="https://www.linkedin.com/in/teja-mandaloju/" target="_blank" rel="noopener noreferrer" className="social-icon-circle" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://github.com/TechWhizGenius/" target="_blank" rel="noopener noreferrer" className="social-icon-circle" aria-label="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="mailto:teja.mandaloju1512@gmail.com" className="social-icon-circle" aria-label="Email">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
          </div>
          
          <div className="stats-badges">
            <span className="stat-badge">50+ Models Deployed</span>
            <span className="stat-badge">5+ Years Experience</span>
            <span className="stat-badge">Azure Certified</span>
            <span className="stat-badge">RAG Systems Expert</span>
          </div>
          
          <p className="home-intro">
            👋Hi! I'm an <strong>MLOps Engineer</strong> and <strong>AI Researcher</strong> building production AI systems that process millions of queries. Led <strong>50+ agent deployments</strong> at <strong>Vosyn Inc.</strong> and researching multimodal ML at <strong>University of North Texas</strong>. Specialized in RAG systems, LLM deployment, and scalable ML infrastructure. ❤️
          </p>
          
          <div className="home-buttons-centered">
            <a href="#experience" className="btn-centered btn-primary-centered">
              VIEW EXPERIENCE
            </a>
            <a href="/resume.pdf" download className="btn-centered btn-secondary-centered">
              DOWNLOAD RESUME
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;