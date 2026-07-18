import React, { useState, useEffect } from 'react';
import SubjectForm from './components/SubjectForm';
import SubjectList from './components/SubjectList';
import Stats from './components/Stats';
import './App.css';

function App() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const savedSubjects = localStorage.getItem('educationPlannerSubjects');
    if (savedSubjects) {
      try {
        setSubjects(JSON.parse(savedSubjects));
      } catch (error) {
        console.error('Error loading data:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('educationPlannerSubjects', JSON.stringify(subjects));
  }, [subjects]);

  const addSubject = (subjectName, hours) => {
    const newSubject = {
      id: Date.now(),
      name: subjectName,
      hours: parseInt(hours) || 0,
    };
    setSubjects([...subjects, newSubject]);
  };

  const deleteSubject = (id) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
  };

  const updateHours = (id, newHours) => {
    setSubjects(
      subjects.map(subject =>
        subject.id === id
          ? { ...subject, hours: Math.max(0, newHours) }
          : subject
      )
    );
  };

  return (
    <div className="planner-shell">
      <div className="planner-shell__inner">
        <header className="app-header">
          <h1 className="app-title">Education Planner</h1>

        </header>

        <main className="app-card">
          <SubjectForm onAddSubject={addSubject} />
          <Stats subjects={subjects} />
          <SubjectList
            subjects={subjects}
            onDeleteSubject={deleteSubject}
            onUpdateHours={updateHours}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
