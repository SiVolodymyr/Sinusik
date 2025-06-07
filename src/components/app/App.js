import { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Spinner } from "react-bootstrap";

import { Home, Biography, Periods, Exhibitions, Contacts, Page404 } from "../pages";

import AppHeader from "../appHeader/AppHeader";

import './app.scss';

const Works = lazy(() => import('../pages/works/Works'));

const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <HelmetProvider>
        <Router>
          <MainContent />
        </Router>
      </HelmetProvider>
    </Suspense>
  );
};

const MainContent = () => {
  const location = useLocation();

  const getInitialColor = () => localStorage.getItem('bgColor') || '#ffffff';
  const [bgColor, setBgColor] = useState(getInitialColor());

  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
    localStorage.setItem('bgColor', bgColor);
  }, [bgColor]);

  return (
    <div className="app">
      <div className="container">
        <AppHeader bgColor={bgColor} setBgColor={setBgColor} />
        <main>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/biography" element={<Biography />} />
            <Route path="/periods/:periodSlug" element={<Periods bgColor={bgColor} />} />
            <Route path="/periods" element={<Navigate to="/periods/early-years" replace />} />
            <Route path="/exhibitions" element={<Navigate to="/exhibitions/student-group-exhibition" replace />} />
            <Route path="/exhibitions/:exhibitionSlug" element={<Exhibitions bgColor={bgColor} />} />
            <Route path="/works" element={<Works bgColor={bgColor} />} />
            <Route path="/contacts" element={<Contacts bgColor={bgColor} />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;