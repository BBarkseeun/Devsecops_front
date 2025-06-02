import React, { useState, useEffect } from 'react'
import { Zap } from 'lucide-react'
import './Header.css'

const ShieldCheckLogo = ({ checked }) => (
  <svg
    className={`header__logo-icon${checked ? ' checked' : ''}`}
    width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ display: 'block' }}
  >
    {/* Shield outline */}
    <path d="M12 3l7 4v5c0 5.25-3.5 9.74-7 10-3.5-0.26-7-4.75-7-10V7l7-4z" stroke="#a855f7" fill="none"/>
    {/* Check mark */}
    <path d="M9 12l2 2 4-4" stroke={checked ? '#00ff88' : '#a855f7'} strokeWidth="2.2" fill="none"/>
  </svg>
)

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogoClick = () => setChecked((prev) => !prev)

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="container">
        <div className="header__content">
          <div className="header__logo" onClick={handleLogoClick} style={{cursor:'pointer'}}>
            {/* <span className="header__logo-bg"></span> */}
            <ShieldCheckLogo checked={checked} />
            <span className="header__logo-text">
              <span className="text-gradient">Secure</span>Ops
            </span>
          </div>
{/* 
          <div className="header__actions">
            <button className="btn btn-secondary header__demo-btn">
              <Zap size={16} />
              무료 체험
            </button>
          </div> */}
        </div>
      </div>
    </header>
  )
}

export default Header 