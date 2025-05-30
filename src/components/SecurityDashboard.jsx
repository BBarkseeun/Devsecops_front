import React from 'react'
import { Activity, AlertTriangle, Shield, CheckCircle } from 'lucide-react'

const SecurityDashboard = () => {
  const metrics = [
    { label: "Security Score", value: "98.5%", color: "#8b5cf6", icon: <Shield size={24} /> },
    { label: "Threats Detected", value: "0", color: "#a855f7", icon: <AlertTriangle size={24} /> },
    { label: "Issues Resolved", value: "247", color: "#c084fc", icon: <CheckCircle size={24} /> },
    { label: "System Status", value: "Normal", color: "#8b5cf6", icon: <Activity size={24} /> }
  ]

  return (
    <section id="dashboard" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', marginBottom: '24px' }}>
            <span className="text-gradient">Real-time Security Dashboard</span>
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Monitor and manage your security status at a glance with our intuitive dashboard
          </p>
        </div>

        <div className="glass" style={{ 
          padding: '60px 40px',
          borderRadius: '24px',
          background: 'rgba(255, 255, 255, 0.02)',
          marginBottom: '60px'
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '40px',
            marginBottom: '40px'
          }}>
            {metrics.map((metric, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{ 
                  color: metric.color, 
                  marginBottom: '16px',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  {metric.icon}
                </div>
                <div style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: '700',
                  color: metric.color,
                  marginBottom: '8px'
                }}>
                  {metric.value}
                </div>
                <div style={{ 
                  color: 'var(--text-secondary)',
                  fontSize: '1rem'
                }}>
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          <div style={{ 
            height: '200px',
            background: 'rgba(139, 92, 246, 0.1)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(139, 92, 246, 0.2)'
          }}>
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
              <Activity size={48} style={{ color: 'var(--primary-color)', marginBottom: '16px' }} />
              <p>Real-time Security Monitoring Chart</p>
              <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Actual chart will be displayed here</p>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button className="btn btn-primary" style={{ 
            padding: '16px 32px',
            fontSize: '1.1rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Shield size={20} />
            Try Dashboard Demo
          </button>
        </div>
      </div>
    </section>
  )
}

export default SecurityDashboard 