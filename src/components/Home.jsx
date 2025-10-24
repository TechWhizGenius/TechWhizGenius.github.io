import { useEffect, useRef } from 'react';
import './Home.css';

function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Professional BioTech Network - Minimalist and elegant
    const entities = [];
    const connections = [];
    const dataFlows = [];
    const entityCount = 30; // CHANGED: Reduced from 50 to 30 for less visual clutter

    const entityTypes = ['dna', 'dna', 'molecule', 'neuron', 'cloud', 'cloud', 'heartbeat', 'heartbeat'];
    
    class BioEntity {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.type = entityTypes[Math.floor(Math.random() * entityTypes.length)];
        this.size = 5 + Math.random() * 3;
        
        if (this.type === 'neuron') {
          this.size = 5 + Math.random() * 3;
          this.neuralLayers = [
            { x: -this.size * 2, nodes: 2 },
            { x: 0, nodes: 3 },
            { x: this.size * 2, nodes: 2 }
          ];
        }
        
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.015;
        this.active = false;
        this.cluster = Math.floor(Math.random() * 3);
        
        if (this.type === 'dna') {
          this.segments = 6;
          this.helixWidth = 16;
          this.helixTwist = Math.random() * Math.PI * 2;
        }
        
        if (this.type === 'molecule') {
          this.atoms = 5;
          this.atomPositions = [];
          for (let i = 0; i < this.atoms; i++) {
            const angle = (i / this.atoms) * Math.PI * 2;
            const radius = this.size * 2;
            this.atomPositions.push({
              x: Math.cos(angle) * radius,
              y: Math.sin(angle) * radius
            });
          }
        }
        
        if (this.type === 'cloud') {
          this.cloudParts = 3;
        }
        
        if (this.type === 'heartbeat') {
          this.beatOffset = Math.random() * Math.PI * 2;
          this.beatSpeed = 0.05;
        }
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        
        this.rotation += this.rotationSpeed;
        
        if (this.type === 'heartbeat') {
          this.beatOffset += this.beatSpeed;
        }
      }

      applyClusterForce(entities) {
        if (Math.random() > 0.98) {
          entities.forEach(other => {
            if (other !== this && other.cluster === this.cluster) {
              const dx = other.x - this.x;
              const dy = other.y - this.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < 200 && distance > 50) {
                this.vx += (dx / distance) * 0.002;
                this.vy += (dy / distance) * 0.002;
              } else if (distance < 50) {
                this.vx -= (dx / distance) * 0.001;
                this.vy -= (dy / distance) * 0.001;
              }
            }
          });
          
          const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
          if (speed > 0.5) {
            this.vx = (this.vx / speed) * 0.5;
            this.vy = (this.vy / speed) * 0.5;
          }
        }
      }

      checkMouseProximity(mouseX, mouseY) {
        if (!mouseX || !mouseY) {
          this.active = false;
          return;
        }
        
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        this.active = distance < 80;
      }

      draw(theme) {
        // CHANGED: Dramatically reduced opacity for subtlety
        const baseColor = theme === 'dark' 
          ? 'rgba(140, 160, 180, 0.2)'  // Changed from 0.85 to 0.2
          : 'rgba(80, 100, 120, 0.2)';   // Changed from 0.85 to 0.2
        
        const activeColor = theme === 'dark'
          ? 'rgba(180, 200, 220, 0.4)'   // Changed from 1 to 0.4
          : 'rgba(60, 80, 100, 0.4)';    // Changed from 1 to 0.4

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        const color = this.active ? activeColor : baseColor;

        switch (this.type) {
          case 'dna':
            this.drawDNA(color, theme);
            break;
          case 'molecule':
            this.drawMolecule(color);
            break;
          case 'neuron':
            this.drawNeuron(color);
            break;
          case 'cloud':
            this.drawCloud(color);
            break;
          case 'heartbeat':
            this.drawHeartbeat(color);
            break;
        }

        ctx.restore();
      }

      drawDNA(color, theme) {
        const twist = this.rotation + this.helixTwist;
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        const points1 = [];
        const points2 = [];
        const steps = 20;
        
        for (let i = 0; i < steps; i++) {
          const t = i / (steps - 1);
          const y = (t - 0.5) * this.segments * 5;
          const angle = twist + t * Math.PI * 3;
          
          const x1 = Math.cos(angle) * this.helixWidth / 2;
          const x2 = Math.cos(angle + Math.PI) * this.helixWidth / 2;
          
          points1.push({ x: x1, y: y, angle: angle });
          points2.push({ x: x2, y: y, angle: angle + Math.PI });
        }
        
        ctx.beginPath();
        ctx.moveTo(points1[0].x, points1[0].y);
        for (let i = 1; i < points1.length - 1; i++) {
          const xc = (points1[i].x + points1[i + 1].x) / 2;
          const yc = (points1[i].y + points1[i + 1].y) / 2;
          ctx.quadraticCurveTo(points1[i].x, points1[i].y, xc, yc);
        }
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(points2[0].x, points2[0].y);
        for (let i = 1; i < points2.length - 1; i++) {
          const xc = (points2[i].x + points2[i + 1].x) / 2;
          const yc = (points2[i].y + points2[i + 1].y) / 2;
          ctx.quadraticCurveTo(points2[i].x, points2[i].y, xc, yc);
        }
        ctx.stroke();
        
        for (let i = 0; i < points1.length; i += 4) {
          ctx.beginPath();
          ctx.moveTo(points1[i].x, points1[i].y);
          ctx.lineTo(points2[i].x, points2[i].y);
          ctx.strokeStyle = color;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      drawMolecule(color) {
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 1;
        
        for (let i = 0; i < this.atoms; i++) {
          const nextIndex = (i + 1) % this.atoms;
          ctx.beginPath();
          ctx.moveTo(this.atomPositions[i].x, this.atomPositions[i].y);
          ctx.lineTo(this.atomPositions[nextIndex].x, this.atomPositions[nextIndex].y);
          ctx.stroke();
        }
        
        this.atomPositions.forEach(pos => {
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, this.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        });
        
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      drawNeuron(color) {
        this.neuralLayers.forEach((layer, layerIndex) => {
          const nodeSpacing = (this.size * 4) / (layer.nodes + 1);
          
          for (let i = 0; i < layer.nodes; i++) {
            const nodeY = (i + 1) * nodeSpacing - this.size * 2;
            
            ctx.beginPath();
            ctx.arc(layer.x, nodeY, this.size * 0.7, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            
            if (layerIndex < this.neuralLayers.length - 1) {
              const nextLayer = this.neuralLayers[layerIndex + 1];
              const nextNodeSpacing = (this.size * 4) / (nextLayer.nodes + 1);
              
              for (let j = 0; j < nextLayer.nodes; j++) {
                const nextNodeY = (j + 1) * nextNodeSpacing - this.size * 2;
                
                ctx.beginPath();
                ctx.moveTo(layer.x, nodeY);
                ctx.lineTo(nextLayer.x, nextNodeY);
                ctx.strokeStyle = color;
                ctx.lineWidth = 0.8;
                ctx.stroke();
              }
            }
          }
        });
      }

      drawCloud(color) {
        ctx.fillStyle = color;
        
        const cloudWidth = this.size * 3;
        const cloudHeight = this.size * 2;
        
        ctx.beginPath();
        ctx.arc(-cloudWidth / 4, 0, cloudHeight / 2, 0, Math.PI * 2);
        ctx.arc(cloudWidth / 4, 0, cloudHeight / 2, 0, Math.PI * 2);
        ctx.arc(0, -cloudHeight / 3, cloudHeight / 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      drawHeartbeat(color) {
        const beat = Math.sin(this.beatOffset) * 0.3 + 1;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2 * beat;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        const width = this.size * 3;
        const height = this.size * 2;
        
        ctx.beginPath();
        ctx.moveTo(-width, 0);
        ctx.lineTo(-width / 2, 0);
        ctx.lineTo(-width / 3, -height);
        ctx.lineTo(0, 0);
        ctx.lineTo(width / 3, height);
        ctx.lineTo(width / 2, 0);
        ctx.lineTo(width, 0);
        ctx.stroke();
      }
    }

    class Connection {
      constructor(entity1, entity2) {
        this.entity1 = entity1;
        this.entity2 = entity2;
      }

      draw(theme) {
        const dx = this.entity2.x - this.entity1.x;
        const dy = this.entity2.y - this.entity1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const maxDistance = 220;
        const opacity = Math.max(0, 1 - distance / maxDistance);
        
        // CHANGED: Reduced connection opacity
        const connectionColor = theme === 'dark' 
          ? `rgba(140, 160, 180, ${opacity * 0.1})`  // Changed from opacity * 0.2
          : `rgba(80, 100, 120, ${opacity * 0.1})`;  // Changed from opacity * 0.2
        
        ctx.beginPath();
        ctx.moveTo(this.entity1.x, this.entity1.y);
        ctx.lineTo(this.entity2.x, this.entity2.y);
        ctx.strokeStyle = connectionColor;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    class DataFlow {
      constructor(connection) {
        this.connection = connection;
        this.progress = Math.random();
        this.speed = 0.003 + Math.random() * 0.002;
      }

      update() {
        this.progress += this.speed;
        if (this.progress > 1) {
          this.progress = 0;
        }
      }

      draw(theme) {
        const x = this.connection.entity1.x + 
                  (this.connection.entity2.x - this.connection.entity1.x) * this.progress;
        const y = this.connection.entity1.y + 
                  (this.connection.entity2.y - this.connection.entity1.y) * this.progress;
        
        // CHANGED: Reduced data flow opacity
        const flowColor = theme === 'dark' 
          ? 'rgba(180, 200, 220, 0.3)'  // Changed from 0.6
          : 'rgba(60, 80, 100, 0.3)';   // Changed from 0.6
        
        ctx.beginPath();
        ctx.arc(x, y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = flowColor;
        ctx.fill();
      }
    }

    for (let i = 0; i < entityCount; i++) {
      entities.push(new BioEntity());
    }

    entities.forEach((e1, i) => {
      entities.slice(i + 1).forEach(e2 => {
        const dx = e2.x - e1.x;
        const dy = e2.y - e1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 220) {
          let shouldConnect = false;
          
          if ((e1.type === 'heartbeat' && (e2.type === 'dna' || e2.type === 'molecule')) ||
              (e2.type === 'heartbeat' && (e1.type === 'dna' || e1.type === 'molecule'))) {
            shouldConnect = true;
          }
          
          if ((e1.type === 'dna' && e2.type === 'neuron') ||
              (e2.type === 'dna' && e1.type === 'neuron') ||
              (e1.type === 'molecule' && e2.type === 'neuron') ||
              (e2.type === 'molecule' && e1.type === 'neuron')) {
            shouldConnect = true;
          }
          
          if ((e1.type === 'neuron' && e2.type === 'cloud') ||
              (e2.type === 'neuron' && e1.type === 'cloud')) {
            shouldConnect = true;
          }
          
          if ((e1.type === 'dna' && e2.type === 'molecule') ||
              (e2.type === 'dna' && e1.type === 'molecule')) {
            shouldConnect = Math.random() > 0.3;
          }
          
          if (e1.type === 'heartbeat' && e2.type === 'heartbeat') {
            shouldConnect = Math.random() > 0.5;
          }
          
          if (e1.type === 'neuron' && e2.type === 'neuron') {
            shouldConnect = Math.random() > 0.4;
          }
          
          if (e1.type === 'cloud' && e2.type === 'cloud') {
            shouldConnect = Math.random() > 0.3;
          }
          
          if (shouldConnect) {
            const connection = new Connection(e1, e2);
            connections.push(connection);
            
            let flowProbability = 0.5;
            
            if ((e1.type === 'heartbeat' && (e2.type === 'dna' || e2.type === 'molecule')) ||
                ((e1.type === 'dna' || e1.type === 'molecule') && e2.type === 'neuron') ||
                (e1.type === 'neuron' && e2.type === 'cloud')) {
              flowProbability = 0.8;
            }
            
            if (Math.random() < flowProbability) {
              dataFlows.push(new DataFlow(connection));
            }
          }
        }
      });
    });

    let mouse = { x: null, y: null };
    
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    function animate() {
      const theme = document.documentElement.getAttribute('data-theme');
      const bgColor = theme === 'dark' ? 'rgba(10, 10, 10, 0.15)' : 'rgba(255, 255, 255, 0.15)';
      
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      entities.forEach(entity => {
        entity.update();
        entity.applyClusterForce(entities);
        entity.checkMouseProximity(mouse.x, mouse.y);
      });

      connections.forEach(connection => {
        connection.draw(theme);
      });

      dataFlows.forEach(flow => {
        flow.update();
        flow.draw(theme);
      });

      entities.forEach(entity => {
        entity.draw(theme);
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="home" className="home-section">
      <canvas ref={canvasRef} className="home-canvas"></canvas>
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-title">
            Hi, I'm <span className="highlight">Teja Mandaloju</span>
          </h1>
          <h2 className="home-subtitle">MLOps Engineer | Data Scientist | AI Researcher</h2>
          <p className="home-description">
            Passionate about building intelligent systems that make a difference. 
            Specializing in MLOps, AI agents, multimodal RAG systems, and deep learning applications. 
            Currently leading AI/ML initiatives at Vosyn Inc. and conducting cutting-edge research at University of North Texas.
          </p>
          <div className="home-buttons">
            <a href="#experience" className="btn btn-primary">
              View Experience
            </a>
            <a href="/projects" className="btn btn-secondary">
              Projects
            </a>
          </div>
          <div className="home-social">
            <a href="https://www.linkedin.com/in/teja-mandaloju/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://github.com/TechWhizGenius/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="mailto:teja.mandaloju1512@gmail.com" className="social-icon" aria-label="Email">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </a>
          </div>
        </div>
        <div className="home-image">
          <div className="image-placeholder">
            <div className="image-circle">
              <img
                src="/images/passpic01.jpg"
                alt="Teja Mandaloju"
                className="profile-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;