import React from 'react'
import { Shield, Github, Twitter, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer style={{ 
      background: 'var(--bg-primary)', 
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '80px 0 40px'
    }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '60px',
          marginBottom: '60px'
        }}>
          <div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              marginBottom: '24px'
            }}>
              <Shield size={32} style={{ color: 'var(--primary-color)' }} />
              <span style={{ 
                fontSize: '24px', 
                fontWeight: '700',
                color: 'var(--text-primary)'
              }}>
                <span className="text-gradient">Secure</span>Ops
              </span>
            </div>
            <p style={{ 
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              marginBottom: '32px'
            }}>
              AI 기반 DevSecOps 보안진단 플랫폼으로<br />
              안전하고 효율적인 개발 환경을 구축하세요.
            </p>
            
            <div style={{ display: 'flex', gap: '16px' }}>
              {[
                { icon: <Github size={20} />, href: "#" },
                { icon: <Twitter size={20} />, href: "#" },
                { icon: <Linkedin size={20} />, href: "#" },
                { icon: <Mail size={20} />, href: "#" }
              ].map((social, index) => (
                <a key={index} href={social.href} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--primary-color)'
                  e.currentTarget.style.color = 'white'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.color = 'var(--text-secondary)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ 
              color: 'var(--text-primary)',
              fontSize: '1.2rem',
              fontWeight: '600',
              marginBottom: '24px'
            }}>
              서비스
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                "코드 보안 분석",
                "인프라 보안 검사", 
                "실시간 모니터링",
                "컴플라이언스 관리"
              ].map((item, index) => (
                <a key={index} href="#" style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ 
              color: 'var(--text-primary)',
              fontSize: '1.2rem',
              fontWeight: '600',
              marginBottom: '24px'
            }}>
              회사 정보
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                "회사 소개",
                "블로그",
                "채용 정보",
                "파트너십"
              ].map((item, index) => (
                <a key={index} href="#" style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ 
              color: 'var(--text-primary)',
              fontSize: '1.2rem',
              fontWeight: '600',
              marginBottom: '24px'
            }}>
              지원
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                "문서",
                "API 가이드",
                "고객 지원",
                "FAQ"
              ].map((item, index) => (
                <a key={index} href="#" style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ 
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{ color: 'var(--text-secondary)' }}>
            © 2024 SecureOps. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '32px' }}>
            {["개인정보처리방침", "이용약관", "쿠키 정책"].map((item, index) => (
              <a key={index} href="#" style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 