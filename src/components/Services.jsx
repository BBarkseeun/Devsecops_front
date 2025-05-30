import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Shield, 
  Code, 
  Server, 
  Database, 
  Lock, 
  Activity,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import './Services.css'

const Services = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const servicesRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(servicesRef.current.children,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" },
      "-=0.4"
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const services = [
    {
      icon: <Code className="service-icon" />,
      title: "Code Security Analysis",
      description: "Real-time detection of security vulnerabilities in source code through static analysis",
      features: ["SAST Scanning", "Dependency Check", "License Verification"],
      color: "#8b5cf6"
    },
    {
      icon: <Server className="service-icon" />,
      title: "Infrastructure Security",
      description: "Configuration errors and vulnerability checks for cloud and on-premise infrastructure",
      features: ["Container Scanning", "IaC Validation", "Config Audit"],
      color: "#a855f7"
    },
    {
      icon: <Database className="service-icon" />,
      title: "Data Protection",
      description: "Monitoring encryption status and access permissions for sensitive data",
      features: ["Data Classification", "Encryption Verification", "Access Logs"],
      color: "#c084fc"
    },
    {
      icon: <Activity className="service-icon" />,
      title: "Real-time Monitoring",
      description: "24/7 continuous security status monitoring and alert services",
      features: ["Anomaly Detection", "Real-time Alerts", "Auto Response"],
      color: "#9333ea"
    },
    {
      icon: <Lock className="service-icon" />,
      title: "Compliance Management",
      description: "Automated verification of compliance with security regulations and standards",
      features: ["GDPR Compliance", "ISO 27001", "SOC 2 Type II"],
      color: "#7c3aed"
    },
    {
      icon: <AlertTriangle className="service-icon" />,
      title: "Risk Assessment",
      description: "Priority-based security response through AI-powered risk analysis",
      features: ["Risk Scoring", "Priority Guidance", "Response Guide"],
      color: "#6d28d9"
    }
  ]

  return (
    <section id="services" className="services section" ref={sectionRef}>
      <div className="container">
        <div className="services__header" ref={titleRef}>
          <h2 className="services__title">
            <span className="text-gradient">Comprehensive Security Services</span>
          </h2>
          <p className="services__subtitle">
            From development to operations, providing integrated<br />
            security solutions across the entire DevSecOps lifecycle
          </p>
        </div>

        <div className="services__grid" ref={servicesRef}>
          {services.map((service, index) => (
            <div key={index} className="service-card glass">
              <div 
                className="service-card__icon"
                style={{ '--icon-color': service.color }}
              >
                {service.icon}
              </div>
              
              <div className="service-card__content">
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__description">{service.description}</p>
                
                <ul className="service-card__features">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="service-card__feature">
                      <CheckCircle size={16} className="feature-check" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="service-card__overlay"></div>
            </div>
          ))}
        </div>

        <div className="services__cta">
          <button className="btn btn-primary">
            <Shield size={20} />
            View All Services
          </button>
        </div>
      </div>
    </section>
  )
}

export default Services 