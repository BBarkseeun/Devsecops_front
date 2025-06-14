import React, { useState, useEffect } from 'react';
import { ArrowLeft, GitBranch, Download, Search, AlertCircle } from 'lucide-react';
import axios from 'axios';
import './GitLabRepositoryPage.css';

const GitLabRepositoryPage = ({ onBackToInput, projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState(null);

  const handleProjectSelect = async (project) => {
    try {
      setIsDownloading(true);
      setError(null);
      const access_key = localStorage.getItem('access_key');
      await axios.post("http://localhost:5001/projects/download-ci", {
        access_key: access_key,
        project_id: project.id
      });
      setSelectedProject(project);
    } catch (err) {
      setError("CI 파일 다운로드 실패: " + (err.response?.data?.error || err.message));
    } finally {
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
    } catch (err) {
      setError("스캔 실패: " + (err.response?.data?.error || err.message));
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="gitlab-repo-page">
      <header className="repo-header">
        <button className="back-btn" onClick={onBackToInput}>
          <ArrowLeft size={20} />
          Back to Input
        </button>
        <h1>GitLab Repositories</h1>
      </header>

      {error && (
        <div className="error-banner">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <div className="repo-content">
        <div className="repo-list">
          <h2>Available Projects</h2>
          <div className="projects-grid">
            {projects && projects.length > 0 ? (
              projects.map((project) => (
                <div
                  key={project.id}
                  className={`project-card ${selectedProject?.id === project.id ? 'selected' : ''}`}
                  onClick={() => handleProjectSelect(project)}
                >
                  <GitBranch size={24} />
                  <h3>{project.name}</h3>
                  <p>{project.description || 'No description available'}</p>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <GitBranch size={48} />
                <h3>No projects found</h3>
                <p>Please check your credentials and try again</p>
              </div>
            )}
          </div>
        </div>

        {selectedProject && (
          <div className="project-actions">
            <h2>Selected Project: {selectedProject.name}</h2>
            <div className="action-buttons">
              <button
                className="scan-btn"
                onClick={handleScan}
                disabled={isScanning}
              >
                {isScanning ? 'Scanning...' : 'Start Security Scan'}
              </button>
            </div>
          </div>
        )}

        {scanResult && (
          <div className="scan-results">
            <h2>Scan Results</h2>
            <pre>{JSON.stringify(scanResult, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitLabRepositoryPage;