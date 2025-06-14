import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, GitBranch, Star, Eye, Calendar, Search, Filter, Code, Lock, Globe, Users, AlertCircle } from 'lucide-react';
import axios from 'axios';
import './GitLabRepositoryPage.css';

const GitLabRepositoryPage = ({ onBackToInput, onSelectRepository, projects }) => {
  const [repositories, setRepositories] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortBy, setSortBy] = useState('updated');
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState(null);
  
  const containerRef = useRef(null);
  const floatingElementsRef = useRef([]);

  // 프로젝트 데이터 변환 함수
  const transformProjectData = (projects) => {
    return projects.map(project => ({
      id: project.id,
      name: project.name,
      description: project.description || 'No description available',
      language: project.language || 'Unknown',
      stars: project.star_count || 0,
      visibility: project.visibility || 'private',
      updated_at: project.last_activity_at || new Date().toISOString(),
      url: project.web_url || '',
      default_branch: project.default_branch || 'main'
    }));
  };

  // 프로젝트 데이터 로드
  useEffect(() => {
    const loadProjects = async () => {
      if (projects && projects.length > 0) {
        try {
          const transformedProjects = transformProjectData(projects);
          setRepositories(transformedProjects);
          setFilteredRepos(transformedProjects);
          setLoading(false);
        } catch (error) {
          console.error('Error transforming projects:', error);
          setError('프로젝트 데이터 변환 중 오류가 발생했습니다.');
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadProjects();
  }, [projects]);

  // 필터링 및 정렬
  useEffect(() => {
    if (repositories.length === 0) return;

    let filtered = repositories.filter(repo => {
      const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           repo.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLanguage = selectedLanguage === 'all' || repo.language === selectedLanguage;
      return matchesSearch && matchesLanguage;
    });

    filtered = filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'stars':
          return b.stars - a.stars;
        case 'updated':
          return new Date(b.updated_at) - new Date(a.updated_at);
        default:
          return 0;
      }
    });

    setFilteredRepos(filtered);
  }, [repositories, searchQuery, selectedLanguage, sortBy]);

  // 마우스 추적 인터랙션
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      floatingElementsRef.current.forEach((element, index) => {
        if (element) {
          const intensity = 0.2 + (index * 0.05);
          const offsetX = (x - 50) * intensity * 0.2;
          const offsetY = (y - 50) * intensity * 0.2;
          element.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${offsetX * 0.05}deg)`;
        }
      });
      
      containerRef.current.style.setProperty('--mouse-x', `${x}%`);
      containerRef.current.style.setProperty('--mouse-y', `${y}%`);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: '#f1c40f',
      TypeScript: '#3498db',
      Python: '#e74c3c',
      Go: '#1abc9c',
      Shell: '#95a5a6',
      Dart: '#9b59b6',
      HCL: '#e67e22'
    };
    return colors[language] || '#7f8c8d';
  };

  const getVisibilityIcon = (visibility) => {
    switch (visibility) {
      case 'public': return <Globe size={14} />;
      case 'internal': return <Users size={14} />;
      case 'private': return <Lock size={14} />;
      default: return <Lock size={14} />;
    }
  };

  const languages = [...new Set(repositories.map(repo => repo.language))];

  const handleProjectSelect = async (repo) => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    setError(null);
    
    try {
      const access_key = localStorage.getItem('access_key');
      if (!access_key) {
        throw new Error('Access key not found');
      }

      const response = await axios.post("http://localhost:5001/projects/download-ci", {
        access_key: access_key,
        project_id: repo.id
      });

      if (response.status === 200) {
        setSelectedProject(repo);
      } else {
        throw new Error('Failed to download CI file');
      }
    } catch (err) {
      console.error('Download error:', err);
      setError("CI 파일 다운로드 실패: " + (err.response?.data?.error || err.message));
      setSelectedProject(repo);
    } finally {
      console.log('Download process completed');
      setIsDownloading(false);
    }
  };

  const handleScan = async () => {
    if (!selectedProject) return;
    
    setIsScanning(true);
    setError(null);
    try {
      const access_key = localStorage.getItem('access_key');
      const res = await axios.post("http://localhost:5001/projects/download-ci/scan", {
        access_key: access_key,
        project_id: selectedProject.id
      });
      setScanResult(res.data);
      // onSelectRepository(selectedProject);
    } catch (err) {
      setError("스캔 실패: " + (err.response?.data?.error || err.message));
    } finally {
      setIsScanning(false);
    }
  };

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

      {/* Error Banner */}
      {error && (
        <div className="error-banner">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

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
            <>
              {isDownloading && (
                <div className="loading-overlay">
                  <div className="loading-spinner"></div>
                  <p>CI 파일 다운로드 중...</p>
                </div>
              )}
              {filteredRepos.map((repo, index) => (
                <React.Fragment key={repo.id}>
                  <div
                    className={`repository-item ${selectedProject?.id === repo.id ? 'selected' : ''}`}
                    onClick={() => !isDownloading && handleProjectSelect(repo)}
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      opacity: isDownloading ? 0.7 : 1,
                      pointerEvents: isDownloading ? 'none' : 'auto'
                    }}
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
                  
                  {/* Selected Project Actions */}
                  {selectedProject?.id === repo.id && !isDownloading && (
                    <div className="project-actions">
                      <div className="action-header">
                        <h3>선택된 프로젝트: {selectedProject.name}</h3>
                        <p>CI 파일이 성공적으로 다운로드되었습니다. 보안 스캔을 시작하시겠습니까?</p>
                      </div>
                      <div className="action-buttons">
                        <button
                          className="scan-btn"
                          onClick={handleScan}
                          disabled={isScanning}
                        >
                          {isScanning ? '스캔 중...' : '보안 스캔 시작'}
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={() => {
                            setSelectedProject(null);
                            setScanResult(null);
                          }}
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </>
          )}
        </div>

        {/* Scan Results */}
        {scanResult && (
          <div className="scan-results">
            <h2>스캔 결과</h2>
            <pre>{JSON.stringify(scanResult, null, 2)}</pre>
          </div>
        )}
      </main>
    </div>
  );
};

export default GitLabRepositoryPage;