import React from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

const Contact = () => {
  return (
    <section id="contact" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', marginBottom: '24px' }}>
            <span className="text-gradient">Get Started Today</span>
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Consult with our experts and experience customized security solutions
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '60px',
          alignItems: 'start'
        }}>
          <div>
            <h3 style={{ 
              fontSize: '1.8rem', 
              marginBottom: '32px',
              color: 'var(--text-primary)'
            }}>
              Contact Information
            </h3>
            
            <div style={{ marginBottom: '80px' }}>
              {[
                { icon: <Mail size={24} />, title: "Email", info: "contact@secureops.com" },
                { icon: <Phone size={24} />, title: "Phone", info: "+1-555-123-4567" },
                { icon: <MapPin size={24} />, title: "Address", info: "123 Tech Street, Silicon Valley, CA" }
              ].map((item, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: '20px',
                  marginBottom: '32px'
                }}>
                  <div style={{ 
                    color: 'var(--primary-color)',
                    background: 'rgba(139, 92, 246, 0.1)',
                    padding: '16px',
                    borderRadius: '12px'
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ 
                      color: 'var(--text-primary)',
                      fontWeight: '600',
                      marginBottom: '4px'
                    }}>
                      {item.title}
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                      {item.info}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <button className="btn btn-primary" style={{ 
                padding: '16px 32px',
                fontSize: '1.1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                justifyContent: 'center'
              }}>
                <Send size={20} />
                Request Free Consultation
              </button>
            </div>
          </div>

          <div className="glass" style={{ 
            padding: '40px 32px',
            borderRadius: '24px'
          }}>
            <h3 style={{ 
              fontSize: '1.5rem', 
              marginBottom: '32px',
              color: 'var(--text-primary)',
              textAlign: 'center'
            }}>
              Quick Inquiry
            </h3>
            
            <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <input 
                type="text" 
                placeholder="Name" 
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '16px',
                  color: 'var(--text-primary)',
                  fontSize: '1rem'
                }}
              />
              <input 
                type="email" 
                placeholder="Email" 
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '16px',
                  color: 'var(--text-primary)',
                  fontSize: '1rem'
                }}
              />
              <textarea 
                placeholder="Please enter your inquiry" 
                rows="5"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '16px',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
              <button type="submit" className="btn btn-primary" style={{
                padding: '16px 32px',
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px'
              }}>
                <Send size={20} />
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact 