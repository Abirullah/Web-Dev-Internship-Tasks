import React from 'react';

function SubjectList({ subjects, onDeleteSubject, onUpdateHours }) {
  if (subjects.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📖</div>
        <h3>No subjects yet</h3>
        <p>Add your first subject above to start building your study plan</p>
      </div>
    );
  }

  return (
    <div>
      <div className="list-header">
        <div>
          <div className="section-label">Overview</div>
          <h2 className="section-title">Your Subjects</h2>
        </div>
        <span className="subject-count">
          {subjects.length} subject{subjects.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div>
        {subjects.map((subject) => (
          <div key={subject.id} className="subject-card">
            <div className="subject-content">
              <div className="subject-info">
                <div className="subject-avatar">
                  {subject.name.charAt(0).toUpperCase()}
                </div>
                <div className="subject-details">
                  <h3>{subject.name}</h3>
                  <p>Adjust study hours</p>
                </div>
              </div>

              <div className="hours-control">
                <button
                  className="hours-btn"
                  onClick={() => onUpdateHours(subject.id, subject.hours - 1)}
                  disabled={subject.hours === 0}
                >
                  −
                </button>
                <div className="hours-display">{subject.hours}h</div>
                <button
                  className="hours-btn"
                  onClick={() => onUpdateHours(subject.id, subject.hours + 1)}
                >
                  +
                </button>
                <button
                  className="delete-btn"
                  onClick={() => onDeleteSubject(subject.id)}
                  title="Delete subject"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubjectList;