import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/DashboardPage';
import StudentsPage from './pages/students/StudentsPage';
import StudentRegistrationPage from './pages/students/StudentRegistrationPage';
import StudentDetailPage from './pages/students/StudentDetailPage';
import { AppToaster } from './components/feedback';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/students/new" element={<StudentRegistrationPage />} />
        <Route path="/students/:id" element={<StudentDetailPage />} />
      </Routes>
      <AppToaster position="top-right" richColors />
    </Router>
  );
}

export default App;
