import './Projects.css';

function Projects() {
  const projectsData = [
    {
      title: "AI-Powered Multimodal RAG System",
      description: "Developed an intelligent retrieval-augmented generation system integrating text, video, and image embeddings using Gemini 2.5 MLLM and Vertex AI vector search. Deployed scalable pipelines on GCP with Docker and Cloud Run for seamless production deployment.",
      technologies: ["Python", "Gemini 2.5", "Vertex AI", "GCP", "Docker"],
      github: "https://github.com/TechWhizGenius"
    },
    {
      title: "Healthcare NLP Framework",
      description: "Built a deep learning framework for emotion and topic detection from social media text with applications in disaster response and healthcare. Fine-tuned transformer models (BERT, RoBERTa, GPT) using PyTorch and Hugging Face.",
      technologies: ["Python", "PyTorch", "BERT", "Hugging Face", "NLP"],
      github: null
    },
    {
      title: "MLOps Pipeline Automation",
      description: "Designed and deployed automated ML pipelines using Azure ML Studio, including model tracking, deployment, and monitoring. Implemented CI/CD workflows for seamless production deployment and version control.",
      technologies: ["Azure ML", "Python", "CI/CD", "Docker", "Kubernetes"],
      github: "https://github.com/TechWhizGenius"
    },
    {
      title: "Churn Prediction Model",
      description: "Developed machine learning models for customer churn prediction using scikit-learn and XGBoost. Delivered actionable insights through Python-based dashboards and contributed to model explainability with SHAP and LIME.",
      technologies: ["Python", "scikit-learn", "XGBoost", "SHAP", "LIME"],
      github: null
    }
  ];

  return (
    <section className="projects-section">
      <div className="projects-container">
        <h1 className="projects-title">Projects</h1>
        <p className="projects-intro">
          A showcase of my work in AI, machine learning, and data science - from research prototypes to production systems.
        </p>
        
        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-header">
                <h2 className="project-title">{project.title}</h2>
              </div>
              
              <p className="project-description">{project.description}</p>
              
              <div className="project-technologies">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="tech-tag">{tech}</span>
                ))}
              </div>
              
              {project.github && (
                <div className="project-footer">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="github-link"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View on GitHub
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;