import { useState, useEffect } from 'react';

export interface Sport {
  id: string;
  name: string;
  abbreviation: string;
  imageUrl: string;
  imageHeight?: string; // Optional custom height
  shouldFilterInDarkMode?: boolean; // Optional: whether to apply white filter in dark mode
  // Advanced filtering options controlled by API
  svgFilters?: {
    light?: {
      brightness?: number;
      contrast?: number;
      saturate?: number;
      hueRotate?: number;
      invert?: number;
      opacity?: number;
    };
    dark?: {
      brightness?: number;
      contrast?: number;
      saturate?: number;
      hueRotate?: number;
      invert?: number;
      opacity?: number;
    };
  };
}

// Pseudo data for sports
const mockSports: Sport[] = [
  {
    id: 'premier-league',
    name: 'Premier League',
    abbreviation: 'PL',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg',
    shouldFilterInDarkMode: true, // This logo should be white in dark mode
  },
  {
    id: 'nba',
    name: 'National Basketball Association',
    abbreviation: 'NBA',
    imageUrl: 'https://cdn.brandfetch.io/idFBraEt77/theme/light/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B',
    shouldFilterInDarkMode: false, // Keep original colors
  },
  {
    id: 'ufc',
    name: 'Ultimate Fighting Championship',
    abbreviation: 'UFC',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/92/UFC_Logo.svg',
    shouldFilterInDarkMode: true, // This logo should be white in dark mode
  },
  {
    id: 'f1',
    name: 'Formula 1',
    abbreviation: 'F1',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/F1_%28registered_trademark%29.svg',
    shouldFilterInDarkMode: true, // This logo should be white in dark mode
  },
  {
    id: 'olympics',
    name: 'Olympic Games',
    abbreviation: 'OLY',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Olympic_rings_without_rims.svg',
    shouldFilterInDarkMode: true, // Keep original colors
  },
  {
    id: 'champions-league',
    name: 'UEFA Champions League',
    abbreviation: 'UCL',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f5/UEFA_Champions_League.svg',
    imageHeight: 'h-[60px]',
    shouldFilterInDarkMode: true, // This logo should be white in dark mode
  },
  {
    id: 'mlb',
    name: 'Major League Baseball',
    abbreviation: 'MLB',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Major_League_Baseball_logo.svg',
    shouldFilterInDarkMode: false, // Keep original colors
  },
  {
    id: 'nfl',
    name: 'National Football League',
    abbreviation: 'NFL',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a2/National_Football_League_logo.svg',
    imageHeight: 'h-[60px]',
    shouldFilterInDarkMode: false, // Keep original colors
  }
];

export const useSports = () => {
  const [sports, setSports] = useState<Sport[]>(mockSports);
  const [selectedSports, setSelectedSports] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSports, setFilteredSports] = useState<Sport[]>(mockSports);

  // Load selected sports from localStorage on mount
  useEffect(() => {
    const savedSelectedSports = localStorage.getItem('selectedSports');
    if (savedSelectedSports) {
      try {
        const parsed = JSON.parse(savedSelectedSports);
        setSelectedSports(new Set(parsed));
      } catch (error) {
        console.error('Error loading selected sports from localStorage:', error);
      }
    }
  }, []);

  // Save selected sports to localStorage whenever they change
  useEffect(() => {
    const selectedArray = Array.from(selectedSports);
    localStorage.setItem('selectedSports', JSON.stringify(selectedArray));
  }, [selectedSports]);

  // Filter sports based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredSports(sports);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = sports.filter(sport => 
        sport.name.toLowerCase().includes(query) ||
        sport.abbreviation.toLowerCase().includes(query)
      );
      setFilteredSports(filtered);
    }
  }, [searchQuery, sports]);

  const toggleSportSelection = (sportId: string) => {
    setSelectedSports(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sportId)) {
        newSet.delete(sportId);
      } else {
        newSet.add(sportId);
      }
      return newSet;
    });
  };

  const isSportSelected = (sportId: string) => {
    return selectedSports.has(sportId);
  };

  const getSelectedSports = () => {
    return Array.from(selectedSports);
  };

  const clearSelection = () => {
    setSelectedSports(new Set());
  };

  const selectAll = () => {
    setSelectedSports(new Set(sports.map(sport => sport.id)));
  };

  return {
    sports: filteredSports,
    selectedSports: getSelectedSports(),
    searchQuery,
    setSearchQuery,
    toggleSportSelection,
    isSportSelected,
    clearSelection,
    selectAll,
    totalSports: sports.length,
    selectedCount: selectedSports.size
  };
};
