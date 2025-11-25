import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import ThemeToggle from './components/ThemeToggle';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Resume from './pages/Resume';
import Links from './pages/Links';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ThemeToggle />
        <Layout>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/links" element={<Links />} />
            </Routes>
          </AnimatePresence>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
