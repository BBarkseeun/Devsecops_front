import React, { useEffect, useRef, useState } from 'react'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/dist/locomotive-scroll.css'
import Header from './components/Header'
import Hero from './components/Hero'
import CompanyLogos from './components/CompanyLogos'
import Services from './components/Services'
import AIFeatures from './components/AIFeatures'
import SecurityDashboard from './components/SecurityDashboard'
import TechStack from './components/TechStack'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ThreeBackground from './components/ThreeBackground'
import SelectionPage from './components/SelectionPage'
import DevSecOpsInputPage from './components/DevSecOpsInputPage'
import GitLabRepositoryPage from './components/GitLabRepositoryPage'
import ScanLoadingPage from './ScanLoadingPage'

function App() {
  const scrollRef = useRef(null)
  const locomotiveScrollRef = useRef(null)
  const scanStartedRef = useRef(false)
  
  // URL 파라미터에서 페이지 상태 읽기
  const getInitialPage = () => {
    const params = new URLSearchParams(window.location.search)
    const page = params.get('page')
    return page || 'home' // 'home', 'selection', 'infra', 'devsecops', 'gitlab-repos'
  }
  
  const [currentPage, setCurrentPage] = useState(getInitialPage())
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const [scanResult, setScanResult] = useState(null)

  // URL 업데이트 함수
  const updateURL = (page) => {
    const url = new URL(window.location)
    if (page === 'home') {
      url.searchParams.delete('page')
    } else {
      url.searchParams.set('page', page)
    }
    window.history.pushState({}, '', url)
  }

  useEffect(() => {
    if (currentPage === 'home' && scrollRef.current) {
      locomotiveScrollRef.current = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        multiplier: 1,
        class: 'is-revealed',
        smartphone: {
          smooth: true
        },
        tablet: {
          smooth: true
        }
      })

      locomotiveScrollRef.current.update()
    }

    return () => {
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy()
      }
    }
  }, [currentPage])

  const handleStartAnalysis = () => {
    setCurrentPage('selection')
    updateURL('selection')
  }

  const handleBackToHome = () => {
    setCurrentPage('home')
    updateURL('home')
  }

  const handleBackToSelection = () => {
    setCurrentPage('selection')
    updateURL('selection')
  }

  const handleSelectInfra = () => {
    setCurrentPage('infra')
    updateURL('infra')
    // TODO: 인프라 진단 페이지로 이동
    console.log('인프라 진단 페이지로 이동')
  }

  const handleSelectDevSecOps = () => {
    setCurrentPage('devsecops')
    updateURL('devsecops')
  }

  const handleStartDevSecOpsAnalysis = (projectsData) => {
    console.log('Loading GitLab projects:', projectsData);
    setProjects(projectsData);
    setCurrentPage('gitlab-repos');
    updateURL('gitlab-repos');
  };

  const handleBackToDevSecOpsInput = () => {
    setCurrentPage('devsecops')
    updateURL('devsecops')
  }

  const handleStartScan = (project) => {
    // 이미 스캔이 시작되었다면 중복 호출 방지
    if (scanStartedRef.current) return;
    scanStartedRef.current = true;

    console.log('Starting security scan for project:', project);
    setSelectedProject(project);
    setCurrentPage('scan-loading');
    updateURL('scan-loading');

    // 스캔 페이지로 이동 후 ref 초기화 (다음 스캔을 위해)
    setTimeout(() => {
      scanStartedRef.current = false;
    }, 1000);
  };

  // GitLab 레포지토리 목록 페이지
  if (currentPage === 'gitlab-repos') {
    return (
      <GitLabRepositoryPage 
        onBackToInput={handleBackToDevSecOpsInput}
        projects={projects}
        onStartScan={handleStartScan}
      />
    )
  }

  // DevSecOps 입력 페이지
  if (currentPage === 'devsecops') {
    return (
      <DevSecOpsInputPage 
        onBackToSelection={handleBackToSelection}
        onStartAnalysis={handleStartDevSecOpsAnalysis}
      />
    )
  }

  // 선택 페이지
  if (currentPage === 'selection') {
    return (
      <SelectionPage 
        onBackToHome={handleBackToHome}
        onSelectInfra={handleSelectInfra}
        onSelectDevSecOps={handleSelectDevSecOps}
      />
    )
  }

  // 스캔 로딩 페이지
  if (currentPage === 'scan-loading') {
    return (
      <ScanLoadingPage
        project={selectedProject}
        onComplete={(result) => {
          if (result.status === 'success') {
            setScanResult(result.data);
            setCurrentPage('scan-result');
          } else {
            // 에러가 발생한 경우 에러 메시지를 스캔 결과에 저장
            setScanResult({
              error: true,
              message: result.error || '스캔 중 오류가 발생했습니다.'
            });
            setCurrentPage('scan-result');
          }
        }}
      />
    )
  }

  // 스캔 결과 페이지
  if (currentPage === 'scan-result') {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#18122B',
        color: '#fff',
        padding: '40px'
      }}>
        <div style={{
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px'
          }}>
            <h2 style={{
              fontSize: '2rem',
              background: 'linear-gradient(90deg,#7F55B1,#7E60BF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}>
              {scanResult?.error ? '스캔 오류' : '스캔 결과'}
            </h2>
            <button
              onClick={() => {
                setCurrentPage('gitlab-repos');
                setScanResult(null);
                setSelectedProject(null);
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '8px 16px',
                borderRadius: '8px',
                color: '#fff',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              돌아가기
            </button>
          </div>

          {scanResult?.error ? (
            <div style={{
              background: 'rgba(255, 87, 87, 0.1)',
              border: '1px solid rgba(255, 87, 87, 0.3)',
              padding: '24px',
              borderRadius: '16px',
              color: '#ff5757'
            }}>
              <p>{scanResult.message}</p>
            </div>
          ) : (
            <div style={{
              background: '#232946',
              color: '#bdbddd',
              padding: '24px',
              borderRadius: '16px',
              maxWidth: '900px',
              width: '100%',
              overflowX: 'auto',
              fontSize: '1rem',
              lineHeight: '1.6'
            }}>
              <pre style={{whiteSpace: 'pre-wrap'}}>{JSON.stringify(scanResult, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    )
  }

  // 메인 홈페이지
  return (
    <div className="App">
      <ThreeBackground />
      <div data-scroll-container ref={scrollRef}>
        <Header />
        <main>
          <Hero onStartAnalysis={handleStartAnalysis} />
          <CompanyLogos />
          <Services />
          <AIFeatures />
          <SecurityDashboard />
          <TechStack />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App 