import React, { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Shield, Server, GitBranch, Key, Eye, EyeOff, CheckCircle2, AlertCircle, Zap } from 'lucide-react'
import axios from 'axios'
import './DevSecOpsInputPage.css'

const DevSecOpsInputPage = ({ onBackToSelection, onStartAnalysis }) => {
  const [formData, setFormData] = useState({
    access_key: '',
    secret_key: '',
    instance_id: '',
    gitlab_token: ''
  })
  
  const [showSecrets, setShowSecrets] = useState({
    secret_key: false,
    gitlab_token: false
  })
  
  const [validationErrors, setValidationErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  
  const containerRef = useRef(null)
  const floatingElementsRef = useRef([])

  // Form validation
  useEffect(() => {
    const errors = {}
    
    if (formData.access_key && formData.access_key.trim() !== '' && !formData.access_key.match(/^AKIA[0-9A-Z]{16}$/)) {
      errors.access_key = 'Invalid AWS Access Key format (should start with AKIA)'
    }
    
    if (formData.secret_key && formData.secret_key.trim() !== '' && formData.secret_key.length < 10) {
      errors.secret_key = 'Secret key should be at least 10 characters'
    }
    
    if (formData.instance_id && formData.instance_id.trim() !== '' && !formData.instance_id.match(/^i-[0-9a-f]{8,17}$/)) {
      errors.instance_id = 'Invalid EC2 Instance ID format (should start with i-)'
    }
    
    if (formData.gitlab_token && formData.gitlab_token.trim() !== '' && formData.gitlab_token.length < 5) {
      errors.gitlab_token = 'Token should be at least 5 characters'
    }
    
    setValidationErrors(errors)
    
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isFormValid) return

    setIsSubmitting(true)
    setError(null)

    try {
      // Initialize session
      await axios.post("http://localhost:5001/session", formData)
      
      // Get projects list
      const res = await axios.post("http://localhost:5001/projects", {
        access_key: formData.access_key
      })
      
      console.log('Projects response:', res.data); // 디버깅을 위한 로그
      
      // Store access key in localStorage for future use
      localStorage.setItem('access_key', formData.access_key)
      
      // Call the parent component's callback with the projects data
      onStartAnalysis(res.data)
    } catch (err) {
      console.error('Error:', err); // 디버깅을 위한 로그
      setError("세션 초기화 실패: " + (err.response?.data?.error || err.message))
    } finally {
      setIsSubmitting(false)
    }
  }

  const formFields = [
    {
      key: 'access_key',
      label: 'IAM Access Key',
      placeholder: 'AKIA...', 
      icon: Key,
      type: 'text',
      description: 'Your AWS IAM Access Key ID'
    },
    {
      key: 'secret_key',
      label: 'IAM Secret Key',
      placeholder: 'Enter your secret key...',
      icon: Shield,
      type: 'password',
      description: 'Your AWS IAM Secret Access Key'
    },
    {
      key: 'instance_id',
      label: 'EC2 Instance ID',
      placeholder: 'i-1234567890abcdef0',
      icon: Server,
      type: 'text',
      description: 'Target EC2 instance for security analysis'
    },
    {
      key: 'gitlab_token',
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

      {error && (
        <div className="error-banner">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

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
                        {validationErrors[field.key]}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="submit-btn"
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? 'Initializing...' : 'Start Analysis'}
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