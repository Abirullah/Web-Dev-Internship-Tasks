import React, { useState } from 'react';

function SubjectForm({ onAddSubject }) {
  const [subjectName, setSubjectName] = useState('');
  const [hours, setHours] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (subjectName.trim() && hours) {
      onAddSubject(subjectName.trim(), hours);
      setSubjectName('');
      setHours('');
    }
  };

  return (
    <div className="form-section">
      <h2 className="section-title">Add New Subject</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Subject name"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Study hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            min="0"
            required
          />
          <button type="submit" className="add-btn">
            + Add Subject
          </button>
        </div>
      </form>
    </div>
  );
}

export default SubjectForm;