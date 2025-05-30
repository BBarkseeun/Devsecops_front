import React, { useState, useEffect } from 'react'
import { Shield, Zap } from 'lucide-react'
import './Header.css'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="container">
        <div className="header__content">
          <div className="header__logo">
            <Shield className="header__logo-icon" />
            <span className="header__logo-text">
              <span className="text-gradient">Secure</span>Ops
            </span>
          </div>

          <div className="header__actions">
            <button className="btn btn-secondary header__demo-btn">
              <Zap size={16} />
              무료 체험
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 