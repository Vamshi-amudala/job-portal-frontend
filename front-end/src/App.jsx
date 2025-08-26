import { useState, useEffect } from 'react';
import './App.css';
import { Home } from './components/Home';
import { About } from './components/About';
import { Navbar } from './components/Navbar';
import { Services } from './components/Services';
import { Features } from './components/Features';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";

// Enhanced page transition variants with multiple animation options
const pageVariants = {
  // Enhanced Slide transitions with scale
  slideLeft: {
    initial: { opacity: 0, x: 60, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -60, scale: 1.05 }
  },
  slideRight: {
    initial: { opacity: 0, x: -60, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: 60, scale: 1.05 }
  },
  // Keep other variants as backup
  slideUp: {
    initial: { opacity: 0, y: 40, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -40, scale: 1.02 }
  },
  fadeScale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 }
  }
};

// Enhanced transition configurations with faster timing
const transitionConfig = {
  type: "tween",
  ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for smooth feel
  duration: 0.3 // Reduced duration to minimize flash
};

// Fast transition for quick navigation
const fastTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3
};

// Route-specific animations based on navigation direction
const getPageVariant = (currentPath, previousPath) => {
  const routes = ['/', '/about', '/services', '/features', '/faq', '/contact', '/login', '/register'];
  const currentIndex = routes.indexOf(currentPath);
  const previousIndex = routes.indexOf(previousPath);
  
  // For auth pages, use special animations
  if (currentPath === '/login' || currentPath === '/register') {
    return pageVariants.fadeScale;
  }
  if (previousPath === '/login' || previousPath === '/register') {
    return pageVariants.fadeScale;
  }
  
  // For sequential navigation, use directional slides
  if (currentIndex > previousIndex) {
    return pageVariants.slideLeft;
  } else if (currentIndex < previousIndex) {
    return pageVariants.slideRight;
  }
  
  // Default to slide up for new routes
  return pageVariants.slideUp;
};

// Enhanced Motion wrapper with white flash prevention
function AnimatedPage({ children }) {
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState(location.pathname);
  
  useEffect(() => {
    setPreviousPath(location.pathname);
  }, [location.pathname]);

  const currentVariant = getPageVariant(location.pathname, previousPath);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={currentVariant}
      transition={transitionConfig}
      style={{ 
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'inherit', // Inherit parent background
        zIndex: 1
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }} // Faster content fade
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: 'white', // Your app's background color
          position: 'relative',
          zIndex: 2
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Enhanced AnimatedRoutes with white flash prevention
function AnimatedRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // handle /home redirect smoothly
  useEffect(() => {
    if (location.pathname === '/home') {
      navigate('/', { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <div style={{ 
      position: 'relative', 
      height: '100vh', 
      overflow: 'hidden',
      backgroundColor: '#000', // Prevent white background flash
      minHeight: '100vh'
    }}>
      <AnimatePresence 
        mode="popLayout" // Changed from "wait" to prevent flash
        initial={false}
        onExitComplete={() => {
          // Optional: Scroll to top after route change
          window.scrollTo(0, 0);
        }}
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
            <Route path="/home" element={<AnimatedPage><Home /></AnimatedPage>} />
          <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
          <Route path="/services" element={<AnimatedPage><Services /></AnimatedPage>} />
          <Route path="/features" element={<AnimatedPage><Features /></AnimatedPage>} />
          <Route path="/faq" element={<AnimatedPage><FAQ /></AnimatedPage>} />
          <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
          <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
          <Route path="/register" element={<AnimatedPage><Register /></AnimatedPage>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

// Loading animation component (optional)
const LoadingSpinner = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="loading-spinner"
    style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 9999
    }}
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      style={{
        width: 40,
        height: 40,
        border: '3px solid #f3f3f3',
        borderTop: '3px solid #007bff',
        borderRadius: '50%'
      }}
    />
  </motion.div>
);

function App() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Optional: Add loading states for better UX
  useEffect(() => {
    const handleRouteChangeStart = () => setIsLoading(true);
    const handleRouteChangeComplete = () => setIsLoading(false);

    // You can integrate this with your routing logic if needed
    
    return () => {
      // Cleanup
    };
  }, []);

  return (
    <Router>
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <Navbar />
        <AnimatedRoutes />
        <AnimatePresence>
          {isLoading && <LoadingSpinner />}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;