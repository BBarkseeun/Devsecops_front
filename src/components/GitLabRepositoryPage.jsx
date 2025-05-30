import React, { useState, useEffect, useRef } from 'react'
import { ArrowLeft, GitBranch, Star, Eye, Calendar, Search, Filter, Code, Lock, Globe, Users } from 'lucide-react'
import './GitLabRepositoryPage.css'

const GitLabRepositoryPage = ({ onBackToInput, onSelectRepository }) => {
  const [repositories, setRepositories] = useState([])
  const [filteredRepos, setFilteredRepos] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('all')
  const [sortBy, setSortBy] = useState('updated')
  const [loading, setLoading] = useState(true)
  
  const containerRef = useRef(null)
  const floatingElementsRef = useRef([])

  // Mock GitLab 레포지토리 데이터
  const mockRepositories = [
    {
      id: 1,
      name: 'webapp-frontend',
      description: 'React-based web application frontend with modern UI components',
      language: 'JavaScript',
      stars: 45,
      visibility: 'private',
      updated_at: '2024-01-15T10:30:00Z',
      url: 'http://10.50.2.172/root/webapp-frontend',
      default_branch: 'main'
    },
    {
      id: 2,
      name: 'api-backend',
      description: 'Node.js REST API backend with microservices architecture',
      language: 'TypeScript',
      stars: 32,
      visibility: 'private',
      updated_at: '2024-01-14T16:45:00Z',
      url: 'http://10.50.2.172/root/api-backend',
      default_branch: 'develop'
    },
    {
      id: 3,
      name: 'docker-compose-setup',
      description: 'Docker containerization setup for development environment',
      language: 'Shell',
      stars: 18,
      visibility: 'internal',
      updated_at: '2024-01-13T09:15:00Z',
      url: 'http://10.50.2.172/root/docker-compose-setup',
      default_branch: 'main'
    },
    {
      id: 4,
      name: 'ml-training-pipeline',
      description: 'Machine learning model training pipeline with automated deployment',
      language: 'Python',
      stars: 67,
      visibility: 'private',
      updated_at: '2024-01-12T14:20:00Z',
      url: 'http://10.50.2.172/root/ml-training-pipeline',
      default_branch: 'main'
    },
    {
      id: 5,
      name: 'mobile-app-flutter',
      description: 'Cross-platform mobile application built with Flutter',
      language: 'Dart',
      stars: 23,
      visibility: 'public',
      updated_at: '2024-01-11T11:30:00Z',
      url: 'http://10.50.2.172/root/mobile-app-flutter',
      default_branch: 'master'
    },
    {
      id: 6,
      name: 'infrastructure-terraform',
      description: 'Terraform configurations for AWS infrastructure as code',
      language: 'HCL',
      stars: 41,
      visibility: 'private',
      updated_at: '2024-01-10T08:45:00Z',
      url: 'http://10.50.2.172/root/infrastructure-terraform',
      default_branch: 'main'
    },
    {
      id: 7,
      name: 'monitoring-dashboard',
      description: 'Grafana-based monitoring dashboard with custom metrics',
      language: 'Go',
      stars: 29,
      visibility: 'internal',
      updated_at: '2024-01-09T15:10:00Z',
      url: 'http://10.50.2.172/root/monitoring-dashboard',
      default_branch: 'main'
    },
    {
      id: 8,
      name: 'security-scanner',
      description: 'Automated security vulnerability scanner for CI/CD pipeline',
      language: 'Python',
      stars: 56,
      visibility: 'private',
      updated_at: '2024-01-08T12:25:00Z',
      url: 'http://10.50.2.172/root/security-scanner',
      default_branch: 'develop'
    }
  ]

  // 레포지토리 데이터 로드 시뮬레이션
  useEffect(() => {
    const loadRepositories = () => {
      setTimeout(() => {
        setRepositories(mockRepositories)
        setFilteredRepos(mockRepositories)
        setLoading(false)
      }, 1500) // 로딩 시뮬레이션
    }
    
    loadRepositories()
  }, [])

  // 필터링 및 정렬
  useEffect(() => {
    let filtered = repositories.filter(repo => {
      const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           repo.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesLanguage = selectedLanguage === 'all' || repo.language === selectedLanguage
      return matchesSearch && matchesLanguage
    })

    // 정렬
    filtered = filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'stars':
          return b.stars - a.stars
        case 'updated':
          return new Date(b.updated_at) - new Date(a.updated_at)
        default:
          return 0
      }
    })

    setFilteredRepos(filtered)
  }, [repositories, searchQuery, selectedLanguage, sortBy])

  // 마우스 추적 인터랙션
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      
      floatingElementsRef.current.forEach((element, index) => {
        if (element) {
          const intensity = 0.2 + (index * 0.05)
          const offsetX = (x - 50) * intensity * 0.2
          const offsetY = (y - 50) * intensity * 0.2
          element.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${offsetX * 0.05}deg)`
        }
      })
      
      containerRef.current.style.setProperty('--mouse-x', `${x}%`)
      containerRef.current.style.setProperty('--mouse-y', `${y}%`)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return `${Math.ceil(diffDays / 30)} months ago`
  }

  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: '#f1c40f',
      TypeScript: '#3498db',
      Python: '#e74c3c',
      Go: '#1abc9c',
      Shell: '#95a5a6',
      Dart: '#9b59b6',
      HCL: '#e67e22'
    }
    return colors[language] || '#7f8c8d'
  }

  const getVisibilityIcon = (visibility) => {
    switch (visibility) {
      case 'public': return <Globe size={14} />
      case 'internal': return <Users size={14} />
      case 'private': return <Lock size={14} />
      default: return <Lock size={14} />
    }
  }

  const languages = [...new Set(repositories.map(repo => repo.language))]

  return (
    <div className="gitlab-repository-page" ref={containerRef}>
      {/* Animated Background */}
      <div className="repo-page-bg">
        <div className="bg-gradient"></div>
        <div className="grid-pattern"></div>
        <div className="floating-particles">
          {Array.from({ length: 40 }, (_, i) => (
            <div key={i} className={`particle particle-${i % 3}`}></div>
          ))}
        </div>
      </div>

      {/* Floating Interactive Elements */}
      <div className="floating-shapes">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            ref={el => floatingElementsRef.current[i] = el}
            className={`floating-shape shape-${i + 1}`}
          >
            {i % 3 === 0 && <GitBranch size={18} />}
            {i % 3 === 1 && <Code size={16} />}
            {i % 3 === 2 && <Star size={20} />}
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="repo-page-header">
        <button className="back-btn" onClick={onBackToInput}>
          <ArrowLeft size={20} />
          Back to Configuration
        </button>
        
        <div className="header-title">
          <div className="title-icon">
            <GitBranch size={28} />
          </div>
          <div>
            <h1>GitLab Repositories</h1>
            <p>Select a repository for security analysis</p>
          </div>
        </div>

        <div className="repo-stats">
          <span>{filteredRepos.length} repositories found</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="repo-page-content">
        {/* Controls */}
        <div className="repo-controls">
          <div className="search-container">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-controls">
            <div className="filter-group">
              <Filter size={16} />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Languages</option>
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
            
            <div className="sort-group">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="updated">Recently Updated</option>
                <option value="name">Name</option>
                <option value="stars">Stars</option>
              </select>
            </div>
          </div>
        </div>

        {/* Repository List */}
        <div className="repository-list">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading repositories...</p>
            </div>
          ) : filteredRepos.length === 0 ? (
            <div className="empty-state">
              <GitBranch size={48} />
              <h3>No repositories found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredRepos.map((repo, index) => (
              <div
                key={repo.id}
                className="repository-item"
                onClick={() => onSelectRepository(repo)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="repo-header">
                  <div className="repo-name">
                    <GitBranch size={18} className="repo-icon" />
                    <span>{repo.name}</span>
                    <div className="visibility-badge">
                      {getVisibilityIcon(repo.visibility)}
                      <span>{repo.visibility}</span>
                    </div>
                  </div>
                  <div className="repo-stats">
                    <div className="stat">
                      <Star size={14} />
                      <span>{repo.stars}</span>
                    </div>
                  </div>
                </div>
                
                <p className="repo-description">{repo.description}</p>
                
                <div className="repo-footer">
                  <div className="repo-meta">
                    <div className="language">
                      <div 
                        className="language-dot" 
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                      ></div>
                      <span>{repo.language}</span>
                    </div>
                    <div className="updated">
                      <Calendar size={14} />
                      <span>{formatDate(repo.updated_at)}</span>
                    </div>
                  </div>
                  <div className="repo-branch">
                    <span>Default: {repo.default_branch}</span>
                  </div>
                </div>
                
                <div className="repo-overlay"></div>
                <div className="repo-glow"></div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}

export default GitLabRepositoryPage 