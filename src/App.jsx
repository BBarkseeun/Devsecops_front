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

function App() {
  const scrollRef = useRef(null)
  const locomotiveScrollRef = useRef(null)
  
  // URL 파라미터에서 페이지 상태 읽기
  const getInitialPage = () => {
    const params = new URLSearchParams(window.location.search)
    const page = params.get('page')
    return page || 'home' // 'home', 'selection', 'infra', 'devsecops', 'gitlab-repos'
  }
  
  const [currentPage, setCurrentPage] = useState(getInitialPage())
  const [projects, setProjects] = useState([])

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
    console.log('Received projects data:', projectsData); // 디버깅을 위한 로그
    setProjects(projectsData);
    setCurrentPage('gitlab-repos');
    updateURL('gitlab-repos');
  }

  const handleBackToDevSecOpsInput = () => {
    setCurrentPage('devsecops')
    updateURL('devsecops')
  }

  // GitLab 레포지토리 목록 페이지
  if (currentPage === 'gitlab-repos') {
    return (
      <GitLabRepositoryPage 
        onBackToInput={handleBackToDevSecOpsInput}
        projects={projects}
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