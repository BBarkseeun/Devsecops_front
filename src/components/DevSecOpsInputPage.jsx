import React, { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Shield, Server, GitBranch, Key, Eye, EyeOff, CheckCircle2, AlertCircle, Zap } from 'lucide-react'
import './DevSecOpsInputPage.css'

const DevSecOpsInputPage = ({ onBackToSelection, onStartAnalysis }) => {
  const [formData, setFormData] = useState({
    iamAccessKey: '',
    iamSecretKey: '',
    ec2Id: '',
    gitlabToken: ''
  })
  
  const [showSecrets, setShowSecrets] = useState({
    iamSecretKey: false,
    gitlabToken: false
  })
  
  const [validationErrors, setValidationErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  
  const containerRef = useRef(null)
  const floatingElementsRef = useRef([])

  // Form validation
  useEffect(() => {
    const errors = {}
    
    // Only validate if user has entered something and it's invalid
    if (formData.iamAccessKey && formData.iamAccessKey.trim() !== '' && !formData.iamAccessKey.match(/^AKIA[0-9A-Z]{16}$/)) {
      errors.iamAccessKey = 'Invalid AWS Access Key format (should start with AKIA)'
    }
    
    if (formData.iamSecretKey && formData.iamSecretKey.trim() !== '' && formData.iamSecretKey.length < 10) {
      errors.iamSecretKey = 'Secret key should be at least 10 characters'
    }
    
    if (formData.ec2Id && formData.ec2Id.trim() !== '' && !formData.ec2Id.match(/^i-[0-9a-f]{8,17}$/)) {
      errors.ec2Id = 'Invalid EC2 Instance ID format (should start with i-)'
    }
    
    if (formData.gitlabToken && formData.gitlabToken.trim() !== '' && formData.gitlabToken.length < 5) {
      errors.gitlabToken = 'Token should be at least 5 characters'
    }
    
    setValidationErrors(errors)
    
    // Allow form submission even with empty fields for demo purposes
    const hasAnyInput = Object.values(formData).some(value => value.trim() !== '')
    const noErrors = Object.keys(errors).length === 0
    setIsFormValid(hasAnyInput && noErrors)
  }, [formData])

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      
      // Update floating elements
      floatingElementsRef.current.forEach((element, index) => {
        if (element) {
          const intensity = 0.3 + (index * 0.1)
          const offsetX = (x - 50) * intensity * 0.3
          const offsetY = (y - 50) * intensity * 0.3
          element.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${offsetX * 0.1}deg)`
        }
      })
      
      // Update background gradient
      containerRef.current.style.setProperty('--mouse-x', `${x}%`)
      containerRef.current.style.setProperty('--mouse-y', `${y}%`)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const toggleSecretVisibility = (field) => {
    setShowSecrets(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isFormValid) {
      onStartAnalysis(formData)
    }
  }

  const formFields = [
    {
      key: 'iamAccessKey',
      label: 'IAM Access Key',
      placeholder: 'AKIA...', 
      icon: Key,
      type: 'text',
      description: 'Your AWS IAM Access Key ID'
    },
    {
      key: 'iamSecretKey',
      label: 'IAM Secret Key',
      placeholder: 'Enter your secret key...',
      icon: Shield,
      type: 'password',
      description: 'Your AWS IAM Secret Access Key'
    },
    {
      key: 'ec2Id',
      label: 'EC2 Instance ID',
      placeholder: 'i-1234567890abcdef0',
      icon: Server,
      type: 'text',
      description: 'Target EC2 instance for security analysis'
    },
    {
      key: 'gitlabToken',
      label: 'GitLab Token',
      placeholder: 'Enter your GitLab token...',
      icon: GitBranch,
      type: 'password',
      description: 'GitLab Personal Access Token for repository analysis'
    }
  ]

  return (
    <div className="devsecops-input-page" ref={containerRef}>
      {/* Animated Background */}
      <div className="input-page-bg">
        <div className="bg-gradient"></div>
        <div className="grid-pattern"></div>
        <div className="floating-particles">
          {Array.from({ length: 50 }, (_, i) => (
            <div key={i} className={`particle particle-${i % 3}`}></div>
          ))}
        </div>
      </div>

      {/* Floating Interactive Elements */}
      <div className="floating-shapes">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            ref={el => floatingElementsRef.current[i] = el}
            className={`floating-shape shape-${i + 1}`}
          >
            {i % 4 === 0 && <Shield size={20} />}
            {i % 4 === 1 && <Server size={18} />}
            {i % 4 === 2 && <GitBranch size={16} />}
            {i % 4 === 3 && <Zap size={22} />}
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="input-page-header">
        <button className="back-btn" onClick={onBackToSelection}>
          <ArrowLeft size={20} />
          Back to Selection
        </button>
        
        <div className="header-title">
          <div className="title-icon">
            <GitBranch size={32} />
          </div>
          <div>
            <h1>DevSecOps Pipeline Analysis</h1>
            <p>Configure your security diagnostic parameters</p>
          </div>
        </div>

        <div className="progress-indicator">
          <div className="progress-steps">
            {formFields.map((_, index) => (
              <div 
                key={index}
                className={`step ${index <= currentStep ? 'active' : ''} ${
                  formData[formFields[index].key] && !validationErrors[formFields[index].key] ? 'completed' : ''
                }`}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="input-page-content">
        <div className="form-container">
          <div className="form-intro">
            <h2>Secure Configuration Setup</h2>
            <p>Enter your credentials and configuration details for comprehensive DevSecOps security analysis</p>
          </div>

          <form onSubmit={handleSubmit} className="input-form">
            <div className="form-grid">
              {formFields.map((field, index) => {
                const Icon = field.icon
                const hasError = validationErrors[field.key]
                const isValid = formData[field.key] && !hasError
                const isSecret = field.type === 'password'

                return (
                  <div key={field.key} className="input-group">
                    <label className="input-label">
                      <div className="label-content">
                        <Icon size={20} className="label-icon" />
                        <span>{field.label}</span>
                        {isValid && <CheckCircle2 size={16} className="valid-icon" />}
                        {hasError && <AlertCircle size={16} className="error-icon" />}
                      </div>
                      <span className="input-description">{field.description}</span>
                    </label>
                    
                    <div className="input-wrapper">
                      <input
                        type={isSecret && !showSecrets[field.key] ? 'password' : 'text'}
                        value={formData[field.key]}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        className={`form-input ${hasError ? 'error' : ''} ${isValid ? 'valid' : ''}`}
                        onFocus={() => setCurrentStep(index)}
                      />
                      
                      {isSecret && (
                        <button
                          type="button"
                          className="visibility-toggle"
                          onClick={() => toggleSecretVisibility(field.key)}
                        >
                          {showSecrets[field.key] ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      )}
                      
                      <div className="input-glow"></div>
                    </div>
                    
                    {hasError && (
                      <div className="error-message">
                        <AlertCircle size={14} />
                        {hasError}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="form-actions">
              <div className="security-notice">
                <Shield size={16} />
                <span>All credentials are encrypted and processed securely</span>
              </div>
              
              <button
                type="submit"
                className={`submit-btn ${isFormValid ? 'ready' : 'disabled'}`}
                disabled={!isFormValid}
              >
                <span>Start Security Analysis</span>
                <Zap size={20} />
              </button>
            </div>
          </form>
        </div>

        {/* Side Info Panel */}
        <div className="info-panel">
          <h3>What We'll Analyze</h3>
          <div className="analysis-items">
            <div className="analysis-item">
              <Shield className="item-icon" />
              <div>
                <h4>IAM Policy Analysis</h4>
                <p>Review permissions and access controls</p>
              </div>
            </div>
            <div className="analysis-item">
              <Server className="item-icon" />
              <div>
                <h4>EC2 Security Assessment</h4>
                <p>Evaluate instance configuration and vulnerabilities</p>
              </div>
            </div>
            <div className="analysis-item">
              <GitBranch className="item-icon" />
              <div>
                <h4>Code Repository Scan</h4>
                <p>Detect security issues in your codebase</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DevSecOpsInputPage 