import React from 'react';
import { createRoot } from 'react-dom/client';
import LandingPage from '../../views/LandingPage/LandingPage';
import { useTheme } from '../../shared/hooks/useTheme';
import '../../shared/styles/globals.css';

const Popup: React.FC = () => {
  useTheme(); // Initialize theme detection
  
  return (
    <div className="w-[392px] h-[612px] bg-surface text-text-primary">
      <LandingPage />
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<Popup />);
  
  // Update theme indicator
  const updateThemeIndicator = () => {
    const indicator = document.getElementById('theme-indicator');
    if (indicator) {
      const isDark = document.documentElement.classList.contains('dark');
      indicator.textContent = isDark ? 'dark' : 'light';
    }
  };
  
  // Update immediately and then every 100ms for a few seconds
  updateThemeIndicator();
  const interval = setInterval(updateThemeIndicator, 100);
  setTimeout(() => clearInterval(interval), 2000);
} 