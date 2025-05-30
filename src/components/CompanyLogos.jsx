import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { 
  Container, 
  GitBranch, 
  Cloud, 
  Zap, 
  Search, 
  Github, 
  Settings, 
  Database 
} from 'lucide-react'
import './CompanyLogos.css'

const CompanyLogos = () => {
  const topRowRef = useRef(null)
  const bottomRowRef = useRef(null)
  const containerRef = useRef(null)

  const topRowCompanies = [
    { name: 'Docker', color: '#0db7ed', icon: <Container size={24} /> },
    { name: 'GitLab', color: '#fc6d26', icon: <GitBranch size={24} /> },
    { name: 'Microsoft', color: '#00bcf2', icon: <Cloud size={24} /> },
    { name: 'AWS', color: '#ff9900', icon: <Zap size={24} /> }
  ]

  const bottomRowCompanies = [
    { name: 'Google', color: '#4285f4', icon: <Search size={24} /> },
    { name: 'GitHub', color: '#333', icon: <Github size={24} /> },
    { name: 'Jenkins', color: '#d33833', icon: <Settings size={24} /> },
    { name: 'Terraform', color: '#623ce4', icon: <Database size={24} /> }
  ]

  useEffect(() => {
    if (!topRowRef.current || !bottomRowRef.current) return

    // 페이드인 애니메이션
    gsap.fromTo([topRowRef.current, bottomRowRef.current], 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.3 }
    )

    // 상단 줄 - 왼쪽으로 슬라이딩
    const topRowAnimation = gsap.to(topRowRef.current, {
      x: -50,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })

    // 하단 줄 - 오른쪽으로 슬라이딩
    const bottomRowAnimation = gsap.to(bottomRowRef.current, {
      x: 50,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })

    // 마우스 인터랙션
    let mouseTimeout = null
    const handleMouseMove = (e) => {
      if (mouseTimeout) return
      
      mouseTimeout = setTimeout(() => {
        const rect = containerRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const moveX = (e.clientX - centerX) * 0.01
        
        gsap.to(containerRef.current, {
          x: moveX,
          duration: 2,
          ease: "power2.out"
        })
        
        mouseTimeout = null
      }, 50)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (topRowAnimation) topRowAnimation.kill()
      if (bottomRowAnimation) bottomRowAnimation.kill()
      if (mouseTimeout) clearTimeout(mouseTimeout)
    }
  }, [])

  return (
    <section className="company-logos-section">
      <div className="logos-header">
        <h2>Trusted by Leading Tech Companies</h2>
        <p>Securing the infrastructure of tomorrow's innovators</p>
      </div>
      
      <div className="logos-container" ref={containerRef}>
        {/* 상단 줄 - 완전히 일직선 */}
        <div className="logo-row logo-row-top" ref={topRowRef}>
          {topRowCompanies.map((company, index) => (
            <div
              key={company.name}
              className="logo-item"
              style={{
                '--company-color': company.color
              }}
            >
              <div className="logo-icon" style={{ color: company.color }}>
                {company.icon}
              </div>
              <span className="logo-text">{company.name}</span>
            </div>
          ))}
        </div>

        {/* 하단 줄 - 완전히 일직선 */}
        <div className="logo-row logo-row-bottom" ref={bottomRowRef}>
          {bottomRowCompanies.map((company, index) => (
            <div
              key={company.name}
              className="logo-item"
              style={{
                '--company-color': company.color
              }}
            >
              <div className="logo-icon" style={{ color: company.color }}>
                {company.icon}
              </div>
              <span className="logo-text">{company.name}</span>
            </div>
          ))}
        </div>
        
        {/* 배경 요소 */}
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>
    </section>
  )
}

export default CompanyLogos 