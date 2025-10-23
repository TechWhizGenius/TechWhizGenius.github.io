import './Experience.css';

function Experience() {
  const experiences = [
    {
      role: "MLOps Engineer",
      company: "Vosyn Inc.",
      location: "Chicago, USA",
      period: "Jun 2025 - Present",
      responsibilities: [
        "Led development of AI Agents with a multimodal Retrieval-Augmented Generation (RAG) system, integrating text, video, and image embeddings using Gemini 2.5 MLLM, Vertex AI vector search (Tree-AH algorithm, dot product distance), and GCP infrastructure.",
        "Designed and deployed scalable RAG pipelines leveraging Cloud Run, Docker, GCP storage buckets, and GitHub CI/CD for seamless production deployment and version control.",
        "Built multimodal embedding pipelines converting unstructured data (text, video, image) into vector representations to enable advanced semantic search and knowledge retrieval.",
        "Directed team efforts in automated web scraping solutions using Apify and GCP services, improving data ingestion and pipeline automation for downstream AI applications.",
        "Acted as MLOps team lead, ensuring best practices in ML model deployment, infrastructure automation, monitoring, and collaborative development workflows."
      ]
    },
    {
      role: "Research Assistant",
      company: "University of North Texas",
      location: "Denton, Texas",
      period: "Jan 2024 - Present",
      responsibilities: [
        "Conducting advanced research in NLP and LLMs with applications in disaster response, education, and healthcare",
        "Fine-tuning transformer-based models (BERT, RoBERTa, GPT) using PyTorch and Hugging Face for classification and text generation tasks",
        "Designed a deep learning framework for emotion and topic detection from social media text",
        "Supporting academic publications and research proposals under the supervision of faculty and PhD collaborators"
      ]
    },
    {
      role: "Data Scientist",
      company: "Tata Consultancy Services",
      location: "Hyderabad, Telangana",
      period: "Nov 2021 - Dec 2023",
      responsibilities: [
        "Designed ML models for churn prediction, demand forecasting, and risk scoring using scikit-learn and XGBoost",
        "Implemented deep learning models (CNN, LSTM) for image and sequence-based data classification tasks",
        "Developed and deployed complete machine learning pipelines using Azure ML Studio, including model tracking and deployment",
        "Delivered actionable insights through Python-based dashboards and contributed to model explainability with SHAP & LIME",
        "Worked in Agile teams to solve real-world business problems across finance and retail domains"
      ]
    },
    {
      role: "Data Engineer",
      company: "Larsen & Toubro Infotech",
      location: "Hyderabad, India",
      period: "Aug 2020 - Nov 2021",
      responsibilities: [
        "Developed and maintained ETL pipelines using Python, SQL, and Apache Airflow to automate data ingestion from multiple sources",
        "Optimized large-scale data workflows on Azure Data Factory and managed data storage in Azure Blob and SQL databases",
        "Implemented data quality checks and logging mechanisms to ensure integrity and traceability",
        "Collaborated with analytics teams to build reusable data models and infrastructure for downstream machine learning applications"
      ]
    },
    {
      role: "Data Analyst",
      company: "Infobridge",
      location: "Hyderabad, India",
      period: "Jan 2020 - Jul 2020",
      responsibilities: [
        "Cleaned, pre-processed, and analyzed transactional and operational datasets using Python and Excel",
        "Created interactive dashboards and reports in Tableau to monitor weekly business metrics",
        "Conducted exploratory data analysis (EDA) to identify customer behavior patterns",
        "Supported data migration and reporting automation efforts alongside senior analysts"
      ]
    }
  ];

  return (
    <section id="experience" className="experience-section">
      <div className="experience-container">
        <h2 className="section-title">Professional Experience</h2>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="exp-header">
                  <div className="exp-title-section">
                    <h3 className="exp-role">{exp.role}</h3>
                    <h4 className="exp-company">{exp.company}</h4>
                  </div>
                  <div className="exp-meta">
                    <span className="exp-location">{exp.location}</span>
                    <span className="exp-period">{exp.period}</span>
                  </div>
                </div>
                <ul className="exp-responsibilities">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;