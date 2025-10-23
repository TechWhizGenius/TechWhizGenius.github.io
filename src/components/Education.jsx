import './Education.css';

function Education() {
  const educationData = [
    {
      degree: "Master of Science in Data Science",
      institution: "University of North Texas",
      location: "Denton, Texas",
      gpa: "4.0",
      period: "Expected Graduation: Dec 2025",
      coursework: ["Data Analytics", "Data Visualization", "Natural Language Processing", "Deep Learning", "LLMs"]
    },
    {
      degree: "Bachelor of Technology",
      institution: "Jawaharlal Nehru Technological University Hyderabad",
      location: "Hyderabad, India",
      gpa: "3.6",
      period: "2017 - 2021",
      coursework: []
    }
  ];

  return (
    <section id="education" className="education-section">
      <div className="education-container">
        <h2 className="section-title">Education</h2>
        <div className="education-grid">
          {educationData.map((edu, index) => (
            <div key={index} className="education-card">
              <div className="card-header">
                <div className="degree-icon">🎓</div>
                <div>
                  <h3 className="degree-title">{edu.degree}</h3>
                  <h4 className="institution-name">{edu.institution}</h4>
                </div>
              </div>
              <div className="card-body">
                <p className="education-location">📍 {edu.location}</p>
                <p className="education-period">📅 {edu.period}</p>
                <p className="education-gpa">
                  <strong>GPA:</strong> <span className="gpa-value">{edu.gpa}</span>/4.0
                </p>
                {edu.coursework.length > 0 && (
                  <div className="coursework">
                    <strong>Relevant Coursework:</strong>
                    <div className="coursework-tags">
                      {edu.coursework.map((course, idx) => (
                        <span key={idx} className="course-tag">{course}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;