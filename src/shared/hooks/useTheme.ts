import { useEffect } from 'react';

export const useTheme = () => {
  useEffect(() => {
    // Check browser theme preference and apply dark class
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const isDark = e.matches;
      document.documentElement.classList.toggle('dark', isDark);
      console.log('Theme changed:', isDark ? 'dark' : 'light');
    };

    // Set initial theme
    const isDark = mediaQuery.matches;
    document.documentElement.classList.toggle('dark', isDark);
    console.log('Initial theme:', isDark ? 'dark' : 'light');
    
    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
}; 