import "../css/portfolio.css";
import githubIcon from '../assets/github.png';
import linkedIcon from '../assets/linked.png';
import { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com'; // or 'emailjs-com'
import sidelineImage from '../assets/sideline.png';
import cebuBlog from '../assets/cebu.png';
import calamityImage from '../assets/calamity.png';
import kurtImage from '../assets/kurt.jpg';
import resumePDF from '../assets/Kurt_Paul_Perocillo_Resume2025.pdf';


const Portfolio = () => {
  const [currentStyle, setCurrentStyle] = useState(0);
  const formRef = useRef(); // Move formRef to the top level
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
   const [isDarkMode, setIsDarkMode] = useState(false);
   
   const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  // Apply dark mode class to body when state changes
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  // Check for saved preference on component mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
  }, []);


  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    emailjs.sendForm(
      'service_z08e5dn', // Replace with your EmailJS service ID
      'template_nc6q9vb', // Replace with your EmailJS template ID
      formRef.current,
      'zcrVLqTwIKDds8jE4' // Replace with your EmailJS public key
    )
    .then((result) => {
      console.log(result.text);
      setSubmitStatus('success');
      formRef.current.reset();
    })
    .catch((error) => {
      console.log(error.text);
      setSubmitStatus('error');
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  const styles = [
    { nature: "nature", choice: "choice" },
    { nature: "passion", choice: "craft" },
    { nature: "curiosity", choice: "dedication" },
    { nature: "innovation", choice: "precision" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStyle((prev) => (prev + 1) % styles.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [styles.length]);

  // Sample data for sections
  const projects = [
    { 
      id: 1, 
      title: "SidelineAU", 
      description: "Full-stack job-matching platform with modern UI and real-time features", 
      tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind", "Vite"],
      image: sidelineImage,
      link: "https://sidejob.onrender.com/"
    },
    { 
      id: 2, 
      title: "Calamity Blog", 
      description: "Blog platform to share news and updates about calamities and emergencies", 
      tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind", "Vite"],
      image: cebuBlog,
      link: "https://cebu-update.vercel.app/"
    },
    { 
      id: 3, 
      title: "GhostMap", 
      description: "Interactive map platform for tracking and visualizing events in real-time", 
      tech: ["React", "Node.js", "Express", "MongoDB", "Leaflet.js", "Tailwind"],
      image: calamityImage,
      link: "https://anti-corrupt.vercel.app/"
    }
  ];

  const experiences = [
    {
      id: 1,
      role: "Freelance Full-Stack Developer",
      company: "Skillsync",
      period: "2023-2024",
      description: "Developed a full-stack platform where users input their skills and receive personalized job suggestions. Built using React, Node.js, Express, and MongoDB with responsive design and real-time features."
    },
    {
      id: 2,
      role: "Freelance Full-Stack Developer",
      company: "SidelineAU",
      period: "2024-2025",
      description: "Built a full-stack job-matching platform enabling clients to post jobs and job seekers to apply seamlessly. Implemented dashboards, filtering, and notifications using React, Node.js, Express, MongoDB, Tailwind, and Vite."
    }
  ];

  return (
    <>
      <section className="portfolio-hero" id="home">
        <nav className="portfolio-nav">
          <span className="portfolio-logo">@perocillo.</span>
          <ul className="portfolio-menu">
            <li><a href="#home">home</a></li>
            <li><a href="#projects">projects</a></li>
            <li><a href="#experiences">experiences</a></li>
            <li><a href="#about">about</a></li>
            <li><a href="#contact">contact</a></li>
            <li 
        className="theme-toggle" 
        role="button" 
        aria-label="Toggle dark mode"
        onClick={toggleDarkMode}
      >
        {isDarkMode ? '🌙' : '☀️'}
      </li>
          </ul>
        </nav>

        <div className="portfolio-content">
  <div className="avatar-container">
    <img src={kurtImage} alt="Kurt" className="avatar-image" />
    <div className="floating-triangle"></div>
  </div>

  <div className="text-container">
    <p className="intro-text">Hey, I'm Kurt</p>
    <h1 className="main-heading animated-text">
      Creative by <span className="highlight">{styles[currentStyle].nature}</span>,<br />
      coder by <span className="highlight">{styles[currentStyle].choice}</span>.
    </h1>

    <div className="cta-container">
      <button className="cta-btn" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
        projects
      </button>
      <div className="social-icons">
        <a href="https://github.com/anonimouse123online" aria-label="GitHub" className="social-icon">
          <img src={githubIcon} alt="GitHub" width="20" height="20" />
        </a>
        <a href="https://www.linkedin.com/in/kurt-paul-perocillo-58743723a/" aria-label="LinkedIn" className="social-icon">
          <img src={linkedIcon} alt="LinkedIn" width="20" height="20" />
        </a>
      </div>
    </div>
  </div>
</div>

      </section>

      {/* Projects Section */}
      <section id="projects" className="section-scrollable">
        <div className="section-container">
          <h2 className="section-title">Notable Projects</h2>
          <div className="projects-grid">
            {projects.map(project => (
              <a 
                key={project.id} 
                href={project.link} 
                className="project-card-link"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <div className="project-card">
                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tech-tags">
                    {project.tech.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section id="experiences" className="section-scrollable">
        <div className="section-container">
          <h2 className="section-title">Experience</h2>
          <div className="experiences-list">
            {experiences.map(exp => (
              <div key={exp.id} className="experience-item">
                <div className="experience-header">
                  <h3>{exp.role}</h3>
                  <span className="company">{exp.company}</span>
                </div>
                <span className="period">{exp.period}</span>
                <p>{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-header">
            <h2>Meet the Dev</h2>
            <p>My path, my passion, my purpose.</p>
          </div>
          
          <div className="about-content-grid">
            <div className="about-text-content">
              <div className="about-bio">
                <p>
                 Kurt is a freelance full-stack developer who loves building meaningful and user-focused digital solutions.
                  He enjoys turning ideas into functional applications, exploring modern web technologies, and improving his craft through constant learning.
                </p>
                <p>
                 Beyond coding, Kurt is committed to continuous growth practicing every day, exploring new technologies, and sharpening his skills to become a better developer.
                He believes that curiosity, discipline, and lifelong learning are essential to staying ahead and delivering meaningful, high-quality work.
                </p>
              </div>
              
              <div className="passion-tags">
                <span className="passion-tag">#problem-solver</span>
                <span className="passion-tag">#coding</span>
                <span className="passion-tag">#goals</span>
              </div>
            </div>
            
            <div className="about-sidebar">
              <div className="skills-category">
                <h3>Tech Stack</h3>
                <div className="skills-list">
                  <span className="skill-item">JavaScript</span>
                  <span className="skill-item">React</span>
                  <span className="skill-item">Node.js</span>
                  <span className="skill-item">TypeScript</span>
                  <span className="skill-item">CSS3</span>
                  <span className="skill-item">Git</span>
                  <span className="skill-item">MongoDB</span>
                  <span className="skill-item">Express</span>
                </div>
              </div>
              
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-number">25</span>
                  <span className="stat-label">Projects</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">3+</span>
                  <span className="stat-label">Years Exp</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Passionate</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">∞</span>
                  <span className="stat-label">Curiosity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-scrollable">
        <div className="section-container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-content">
            <p>I'm always open to discussing new opportunities and interesting projects.</p>
            
            <div className="contact-grid">
              {/* Contact Form */}
              <div className="contact-form-container">
                <form ref={formRef} onSubmit={sendEmail} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="from_name"
                      required
                      placeholder="Your Name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="from_email"
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      required
                      placeholder="Tell me about your project or just say hello!"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="contact-btn submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>

                  {submitStatus === 'success' && (
                    <div className="status-message success">
                      ✅ Message sent successfully! I'll get back to you soon.
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="status-message error">
                      ❌ Failed to send message. Please try again or email me directly.
                    </div>
                  )}
                </form>
              </div>

              {/* Contact Info */}
              <div className="contact-info-sidebar">
                <div className="contact-info">
                  <h3>Let's Connect</h3>
                  <div className="contact-item">
                    <strong>Email:</strong>
                    <a href="mailto:kurt@example.com">paulkurtperocillo@gmail.com</a>
                  </div>
                  <div className="contact-item">
                    <strong>Location:</strong>
                    <span>Cebu</span>
                  </div>
                  <div className="contact-item">
                    <strong>LinkedIn:</strong>
                    <a href="www.linkedin.com/in/kurt-paul-perocillo-58743723a" target="_blank" rel="noopener noreferrer">linkedin.com/in/kurtpaulperocillo</a>
                  </div>
                  <div className="contact-item">
                    <strong> GitHub:</strong>
                    <a href="https://github.com/anonimouse123online" target="_blank" rel="noopener noreferrer">github.com/anonimouse123</a>
                  </div>
                </div>

                <div className="quick-links">
                  <h3>Quick Actions</h3>
                  <a href="mailto: paulkurtperocillo@gmail.com" className="contact-btn outline">
                    📧 Email Directly
                  </a>
                  <a href={resumePDF} className="contact-btn outline" download="Kurt_Paul_Perocillo_Resume.pdf">
                     📄 Download Resume
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Portfolio;