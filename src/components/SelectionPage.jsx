import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowLeft, Server, GitBranch, Shield, Zap, ArrowRight } from 'lucide-react'
import './SelectionPage.css'

const SelectionPage = ({ onBackToHome, onSelectInfra, onSelectDevSecOps }) => {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Page entrance animation
    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(cardsRef.current.children,
      { y: 80, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.2, ease: "power3.out" },
      "-=0.4"
    )
  }, [])

  const handleMouseMove = (e, cardElement) => {
    const rect = cardElement.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    cardElement.style.setProperty('--mouse-x', `${x}%`)
    cardElement.style.setProperty('--mouse-y', `${y}%`)
  }

  const handleMouseEnter = (e) => {
    const card = e.currentTarget
    gsap.to(card, {
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out"
    })
  }

  const handleMouseLeave = (e) => {
    const card = e.currentTarget
    gsap.to(card, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    })
  }

  return (
    <div className="selection-page" ref={containerRef}>
      {/* Background gradient */}
      <div className="selection-bg"></div>
      
      {/* Header with back button */}
      <header className="selection-header">
        <button className="back-btn" onClick={onBackToHome}>
          <ArrowLeft size={20} />
          Back to Home
        </button>
        <div className="logo">
          <Shield size={24} />
          <span><span className="text-gradient">Secure</span>Ops</span>
        </div>
      </header>

      {/* Main content */}
      <div className="selection-content">
        <div className="selection-title" ref={titleRef}>
          <h1>Choose Your Security Analysis</h1>
          <p>Select the type of security analysis you need for your environment</p>
        </div>

        <div className="selection-cards" ref={cardsRef}>
          {/* Infrastructure Analysis Card */}
          <div 
            className="selection-card infra-card"
            onClick={onSelectInfra}
            onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="card-background"></div>
            <div className="card-content">
              <div className="card-icon">
                <Server size={48} />
              </div>
              <h2>Infrastructure Security</h2>
              <p>Comprehensive security analysis for your cloud and on-premise infrastructure</p>
              
              <ul className="card-features">
                <li><Zap size={16} /> Container & VM Scanning</li>
                <li><Zap size={16} /> Network Security Assessment</li>
                <li><Zap size={16} /> Configuration Compliance</li>
                <li><Zap size={16} /> Vulnerability Detection</li>
              </ul>

              <div className="card-cta">
                <span>Start Infrastructure Analysis</span>
                <ArrowRight size={20} />
              </div>
            </div>
            <div className="card-overlay"></div>
          </div>

          {/* DevSecOps Pipeline Card */}
          <div 
            className="selection-card devsecops-card"
            onClick={onSelectDevSecOps}
            onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="card-background"></div>
            <div className="card-content">
              <div className="card-icon">
                <GitBranch size={48} />
              </div>
              <h2>DevSecOps Pipeline</h2>
              <p>End-to-end security analysis for your development and deployment pipeline</p>
              
              <ul className="card-features">
                <li><Zap size={16} /> Source Code Analysis (SAST)</li>
                <li><Zap size={16} /> Dependency Scanning</li>
                <li><Zap size={16} /> CI/CD Security Review</li>
                <li><Zap size={16} /> Runtime Protection</li>
              </ul>

              <div className="card-cta">
                <span>Start Pipeline Analysis</span>
                <ArrowRight size={20} />
              </div>
            </div>
            <div className="card-overlay"></div>
          </div>
        </div>

        {/* Bottom info */}
        <div className="selection-info">
          <p>Not sure which one to choose? Both analyses can be run simultaneously for comprehensive security coverage.</p>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>
    </div>
  )
}

export default SelectionPage 