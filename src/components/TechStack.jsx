import React from 'react'
import { Code, Cloud, Database, Cpu } from 'lucide-react'

const TechStack = () => {
  const techs = [
    { name: "React", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "Python", category: "AI/ML" },
    { name: "Docker", category: "DevOps" },
    { name: "Kubernetes", category: "Orchestration" },
    { name: "AWS", category: "Cloud" },
    { name: "TensorFlow", category: "AI" },
    { name: "MongoDB", category: "Database" }
  ]

  return (
    <section id="tech-stack" className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', marginBottom: '24px' }}>
            <span className="text-gradient">Modern Tech Stack</span>
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Providing stable and scalable security solutions with proven cutting-edge technologies
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
          gap: '24px',
          marginBottom: '60px'
        }}>
          {techs.map((tech, index) => (
            <div key={index} className="glass" style={{ 
              padding: '32px 24px', 
              textAlign: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)'
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            >
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}>
                {tech.name}
              </div>
              <div style={{ 
                color: 'var(--primary-color)',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}>
                {tech.category}
              </div>
            </div>
          ))}
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '32px' 
        }}>
          {[
            { icon: <Code size={40} />, title: "Modern Development", desc: "Utilizing latest frameworks and tools" },
            { icon: <Cloud size={40} />, title: "Cloud Native", desc: "Scalable cloud architecture" },
            { icon: <Database size={40} />, title: "Big Data", desc: "Large-scale data processing & analysis" },
            { icon: <Cpu size={40} />, title: "AI/ML", desc: "Machine learning-based intelligent analysis" }
          ].map((item, index) => (
            <div key={index} className="glass" style={{ 
              padding: '40px 32px', 
              textAlign: 'center' 
            }}>
              <div style={{ 
                color: 'var(--primary-color)', 
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'center'
              }}>
                {item.icon}
              </div>
              <h3 style={{ 
                fontSize: '1.3rem', 
                marginBottom: '12px',
                color: 'var(--text-primary)'
              }}>
                {item.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStack 