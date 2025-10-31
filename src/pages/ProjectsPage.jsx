import { useEffect } from 'react';
import './ProjectsPage.css';

function ProjectsPage() {
  // Scroll to top when component mounts to ensure proper alignment
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projects = [
    {
      title: "AI-Powered Chatbot",
      description: "A sophisticated conversational AI chatbot built using GPT-4 API, featuring natural language understanding, context awareness, and multi-turn dialogue capabilities. Implemented with React frontend and Flask backend, deployed on AWS with auto-scaling infrastructure.",
      technologies: ["Python", "React", "GPT-4", "Flask", "AWS", "Docker"],
      github: "https://github.com/TechWhizGenius/ai-chatbot",
      demo: null,
      image: null
    },
    {
      title: "Real-Time Stock Price Predictor",
      description: "Machine learning model that predicts stock prices using LSTM neural networks and technical indicators. Features real-time data ingestion from Yahoo Finance API, interactive visualization dashboard, and backtesting framework with 85% accuracy on historical data.",
      technologies: ["Python", "TensorFlow", "Pandas", "Plotly", "Flask", "Redis"],
      github: "https://github.com/TechWhizGenius/stock-predictor",
      demo: null,
      image: null
    },
    {
      title: "Multimodal RAG System",
      description: "Retrieval-Augmented Generation system that processes text, images, and videos. Uses Vertex AI for vector embeddings, implements semantic search with Tree-AH algorithm, and provides intelligent question-answering across multiple data modalities with citation tracking.",
      technologies: ["Python", "Vertex AI", "GCP", "Docker", "React", "Gemini"],
      github: "https://github.com/TechWhizGenius/multimodal-rag",
      demo: null,
      image: null
    }
  ];

  return (
    <section className="projects-section">
      <div className="projects-container">
        <h1 className="projects-title">My Projects</h1>
        <p className="projects-subtitle">
          A collection of my recent work in AI, Machine Learning, and Data Science
        </p>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-header">
                <h2 className="project-title">{project.title}</h2>
              </div>
              
              <div className="project-body">
                <p className="project-description">{project.description}</p>
                
                <div className="project-technologies">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
              
              <div className="project-footer">
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-link github-link"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View Code
                  </a>
                )}
                {project.demo && (
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-link demo-link"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsPage;