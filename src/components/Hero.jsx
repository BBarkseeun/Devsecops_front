import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Play, ArrowRight, Shield, Zap, Brain } from 'lucide-react'
import MovingCircle3D from './MovingCircle3D'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

const Hero = ({ onStartAnalysis }) => {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const featuresRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Hero entrance animation
    tl.fromTo(titleRef.current, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(ctaRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.3"
    )
    .fromTo(featuresRef.current.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
      "-=0.3"
    )

    // Parallax scroll effect
    gsap.to(heroRef.current, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const features = [
    {
      icon: <Brain className="feature-icon" />,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning for real-time security threat detection"
    },
    {
      icon: <Shield className="feature-icon" />,
      title: "Integrated Security",
      description: "Comprehensive security coverage across all DevSecOps stages"
    },
    {
      icon: <Zap className="feature-icon" />,
      title: "Real-time Monitoring",
      description: "24/7 automated security monitoring and alerting"
    }
  ]

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="container">
        <div className="hero__content">
          <div className="hero__text">
            <div className="hero__title-container">
              <MovingCircle3D />
              <h1 ref={titleRef} className="hero__title">
                <span className="hero__title-gradient">Your DevSecOps & Infra</span><br />
                <span className="hero__title-neon">Security Companion</span>
              </h1>
            </div>
            
            <p ref={subtitleRef} className="hero__subtitle hero__subtitle-white">
              Diagnose vulnerabilities before attackers do.
            </p>
            
            <div ref={ctaRef} className="hero__cta">
              <button 
                className="btn btn-primary hero__primary-btn"
                onClick={onStartAnalysis}
              >
                <Play size={20} />
                Start Free Diagnosis
                <ArrowRight size={16} />
              </button>
              <button className="btn btn-secondary hero__secondary-btn">
                <Shield size={16} />
                View Demo
              </button>
            </div>
          </div>

          <div className="hero__features" ref={featuresRef}>
            {features.map((feature, index) => (
              <div key={index} className="hero__feature glass">
                <div className="hero__feature-icon">
                  {feature.icon}
                </div>
                <h3 className="hero__feature-title">{feature.title}</h3>
                <p className="hero__feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="hero__floating-elements">
        <div className="floating-element floating-element--1">
          <Shield size={32} />
        </div>
        <div className="floating-element floating-element--2">
          <Brain size={28} />
        </div>
        <div className="floating-element floating-element--3">
          <Zap size={24} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-indicator">
        <div className="scroll-line"></div>
        <span>Scroll</span>
      </div>
    </section>
  )
}

export default Hero 