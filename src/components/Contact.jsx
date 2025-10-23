import './Contact.css';

function Contact() {
  const contactInfo = [
    {
      icon: "📧",
      label: "Email",
      value: "teja.mandaloju1512@gmail.com",
      link: "mailto:teja.mandaloju1512@gmail.com"
    },
    {
      icon: "📱",
      label: "Phone",
      value: "+1 940-758-3312",
      link: "tel:+19407583312"
    },
    {
      icon: "📍",
      label: "Location",
      value: "Dallas, TX 76207",
      link: null
    },
    {
      icon: "💼",
      label: "LinkedIn",
      value: "linkedin.com/in/teja-mandaloju",
      link: "https://www.linkedin.com/in/teja-mandaloju/"
    },
    {
      icon: "💻",
      label: "GitHub",
      value: "github.com/TechWhizGenius",
      link: "https://github.com/TechWhizGenius/"
    }
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="contact-intro">
          I'm always open to discussing new opportunities, collaborations, or just having a chat about AI and data science. 
          Feel free to reach out through any of the channels below!
        </p>
        
        <div className="contact-grid">
          {contactInfo.map((contact, index) => (
            <div key={index} className="contact-card">
              {contact.link ? (
                <a href={contact.link} target="_blank" rel="noopener noreferrer" className="contact-link">
                  <div className="contact-icon">{contact.icon}</div>
                  <div className="contact-details">
                    <h3 className="contact-label">{contact.label}</h3>
                    <p className="contact-value">{contact.value}</p>
                  </div>
                </a>
              ) : (
                <div className="contact-link">
                  <div className="contact-icon">{contact.icon}</div>
                  <div className="contact-details">
                    <h3 className="contact-label">{contact.label}</h3>
                    <p className="contact-value">{contact.value}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="contact-cta">
          <a href="mailto:teja.mandaloju1512@gmail.com" className="cta-button">
            Send Me an Email
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;