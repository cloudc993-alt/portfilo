import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { LanguageProvider } from './hooks/useLanguage';
import { PageLoader } from './components/Loader/PageLoader';
import { CustomCursor } from './components/Cursor/CustomCursor';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import HomePage from './pages/HomePage';

const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center bg-[#080808]">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-[#FF2B1C]" />
            </div>
          }
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#080808] text-white">
          <PageLoader />
          <CustomCursor />
          <Navbar />
          <AnimatedRoutes />
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}
