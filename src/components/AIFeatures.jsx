import React from 'react'
import { Brain, Zap, Target, TrendingUp } from 'lucide-react'

const AIFeatures = () => {
  const features = [
    {
      icon: <Brain size={48} />,
      title: "Intelligent Analysis",
      description: "Deep learning-based pattern recognition for new threat detection",
      stats: "99.8% Accuracy"
    },
    {
      icon: <Zap size={48} />,
      title: "Real-time Processing",
      description: "Ultra-fast threat detection and response in milliseconds",
      stats: "< 100ms Response"
    },
    {
      icon: <Target size={48} />,
      title: "Precision Diagnostics",
      description: "Accurate security issue identification with minimized false positives",
      stats: "0.02% False Positive"
    },
    {
      icon: <TrendingUp size={48} />,
      title: "Predictive Analytics",
      description: "Proactive response by predicting future threats in advance",
      stats: "30-Day Forecast"
    }
  ]

  return (
    <section id="ai-features" className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', marginBottom: '24px' }}>
            <span className="text-gradient">AI-Powered Security Diagnostics</span>
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Providing smarter and more accurate security solutions with cutting-edge AI technology
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '32px' 
        }}>
          {features.map((feature, index) => (
            <div key={index} className="glass" style={{ 
              padding: '40px 32px', 
              textAlign: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ 
                color: 'var(--primary-color)', 
                marginBottom: '24px',
                display: 'flex',
                justifyContent: 'center'
              }}>
                {feature.icon}
              </div>
              <h3 style={{ 
                fontSize: '1.5rem', 
                marginBottom: '16px',
                color: 'var(--text-primary)'
              }}>
                {feature.title}
              </h3>
              <p style={{ 
                color: 'var(--text-secondary)', 
                lineHeight: '1.6',
                marginBottom: '20px'
              }}>
                {feature.description}
              </p>
              <div style={{ 
                color: 'var(--primary-color)', 
                fontWeight: '600',
                fontSize: '1.1rem'
              }}>
                {feature.stats}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AIFeatures 