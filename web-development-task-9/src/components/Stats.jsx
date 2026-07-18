import React from 'react';

function Stats({ subjects }) {
  const totalHours = subjects.reduce((sum, subject) => sum + subject.hours, 0);

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-header">
          <span className="stat-label">Total Subjects</span>
          <span className="stat-icon">📚</span>
        </div>
        <div className="stat-value">{subjects.length}</div>
        <div className="stat-description">
          Active subjects in your study planner
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-header">
          <span className="stat-label">Study Hours</span>
          <span className="stat-icon">⏱️</span>
        </div>
        <div className="stat-value">{totalHours}h</div>
        <div className="stat-description">
          Total hours across all subjects
        </div>
      </div>
    </div>
  );
}

export default Stats;