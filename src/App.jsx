import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from './ThemeContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import './App.css';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;