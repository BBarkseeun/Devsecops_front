import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './ScanLoadingPage.css';

const DURATION = 180; // 3분(초)

const SecurityCube = () => (
  <div className="security-cube-container">
    <div className="security-cube">
      <div className="cube-face front"></div>
      <div className="cube-face back"></div>
      <div className="cube-face right"></div>
      <div className="cube-face left"></div>
      <div className="cube-face top"></div>
      <div className="cube-face bottom"></div>
    </div>
    <div className="cube-shadow"></div>
  </div>
);

const ScanningBeam = () => (
  <div className="scanning-beam-container">
    <div className="scanning-beam"></div>
    <div className="scanning-reflection"></div>
  </div>
);

const SecurityShield = () => (
  <div className="security-shield">
    <svg viewBox="0 0 24 24" className="shield-icon">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4a3 3 0 110 6 3 3 0 010-6z" />
    </svg>
    <div className="shield-ripple"></div>
  </div>
);

const FloatingParticles = () => (
  <div className="floating-particles">
    {Array.from({ length: 20 }).map((_, i) => (
      <div key={i} className="particle" style={{
        '--delay': `${Math.random() * 5}s`,
        '--size': `${Math.random() * 10 + 5}px`
      }}></div>
    ))}
  </div>
);

const ScanLoadingPage = ({ onComplete, project }) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [scanPhase, setScanPhase] = useState(0);
  const intervalRef = useRef();
  const containerRef = useRef(null);
  const scanExecutedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  // onComplete 함수를 ref에 저장하여 의존성 배열에서 제외
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let start = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      const newProgress = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(newProgress);
      
      // Update scan phase
      setScanPhase(Math.floor((newProgress / 100) * 4));
    }, 100);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      containerRef.current.style.setProperty('--mouse-x', `${x}%`);
      containerRef.current.style.setProperty('--mouse-y', `${y}%`);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // 이미 실행되었다면 중복 실행 방지
    if (scanExecutedRef.current) return;
    scanExecutedRef.current = true;

    const startScan = async () => {
      try {
        console.log('Starting scan for project:', project.id);
        const access_key = localStorage.getItem('access_key');
        if (!access_key) {
          throw new Error('Access key not found');
        }

        const response = await axios.post("http://localhost:5001/projects/download-ci/scan", {
          access_key,
          project_id: project.id
        });

        if (response.status === 200) {
          console.log('Scan completed successfully');
          if (onCompleteRef.current) {
            onCompleteRef.current({
              status: 'success',
              data: response.data
            });
          }
        } else {
          throw new Error('Scan failed with status: ' + response.status);
        }
      } catch (err) {
        console.error('Scan error:', err);
        setError(err.message);
        if (onCompleteRef.current) {
          onCompleteRef.current({
            status: 'error',
            error: err.message
          });
        }
      }
    };

    startScan();
  }, [project.id]); // onComplete 제거, project.id만 의존성으로 유지

  const scanPhases = [
    '초기화 중...',
    'CI/CD 파이프라인 분석 중...',
    '보안 취약점 스캔 중...',
    '결과 생성 중...'
  ];

  return (
    <div className="scan-loading-page" ref={containerRef}>
      <div className="scan-loading-content">
        <div className="visual-container">
          <SecurityCube />
          <ScanningBeam />
          <SecurityShield />
          <FloatingParticles />
        </div>

        <h2 className="scan-title">DevSecOps Security Scan in Progress…</h2>
        <p className="scan-phase">{scanPhases[scanPhase]}</p>
        
        <div className="progress-container">
          <div className="progress-track">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
            <div 
              className="progress-glow"
              style={{ left: `${progress}%` }}
            ></div>
          </div>
          <div className="progress-percentage">{Math.round(progress)}%</div>
        </div>

        {error && (
          <div className="error-message">
            <span className="error-text">Error: {error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanLoadingPage; 