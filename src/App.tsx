import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { UserProvider } from './contexts/UserContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const blobContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!blobContainerRef.current) return;
      const scrollY = window.scrollY;
      const blobs = blobContainerRef.current.children;
      
      Array.from(blobs).forEach((blob, index) => {
        const speed = (index + 1) * 0.05;
        const yOffset = scrollY * speed;
        const rotation = scrollY * (index + 1) * 0.02;
        (blob as HTMLElement).style.transform = `translate(-50%, calc(-50% + ${yOffset}px)) rotate(${rotation}deg)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <UserProvider>
        <div className="blob-container" ref={blobContainerRef}>
          <div className="blob"></div>
          <div className="blob"></div>
          <div className="blob"></div>
          <div className="blob"></div>
        </div>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
