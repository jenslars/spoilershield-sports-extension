import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { useSports } from '../../../hooks/useSports';
import SearchIcon from '../../../../assets/icons/svg/SearchIcon.svg';

// Utility function to generate CSS filter string from API data
const generateFilterString = (filters: any) => {
  if (!filters) return '';
  
  const filterParts = [];
  if (filters.brightness !== undefined) filterParts.push(`brightness(${filters.brightness})`);
  if (filters.contrast !== undefined) filterParts.push(`contrast(${filters.contrast})`);
  if (filters.saturate !== undefined) filterParts.push(`saturate(${filters.saturate})`);
  if (filters.hueRotate !== undefined) filterParts.push(`hue-rotate(${filters.hueRotate}deg)`);
  if (filters.invert !== undefined) filterParts.push(`invert(${filters.invert})`);
  if (filters.opacity !== undefined) filterParts.push(`opacity(${filters.opacity})`);
  
  return filterParts.join(' ');
};

// Define component variants using tailwind-variants
const searchBar = tv({
  base: "relative",
      slots: {
      icon: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
      input: "w-full pl-10 h-[40px] text-base font-normal bg-interactive duration-300 shadow-2xs rounded-full text-text-primary placeholder-text-tertiary focus:shadow-2xl focus:duration-300 focus:outline-none"
    }
});

const sportsGrid = tv({
  base: "flex flex-wrap gap-4 justify-between"
});

const sportCard = tv({
  base: "h-[74px] w-[137px] relative bg-interactive rounded-xl cursor-pointer transition-all duration-300 shadow-2xs",
  variants: {
    selected: {
      true: "border-2 border-blue-500",
      false: ""
    }
  },
  defaultVariants: {
    selected: false
  }
});

const sportContent = tv({
  base: "flex flex-col items-center justify-center h-full"
});

const sportImageContainer = tv({
  base: "h-[30px] w-auto flex items-center justify-center transition-all duration-300"
});

const emptyState = tv({
  base: "text-center py-8"
});

const emptyStateText = tv({
  base: "text-text-tertiary"
});

const FeedPreferences = () => {
  const {
    sports,
    searchQuery,
    setSearchQuery,
    toggleSportSelection,
    isSportSelected,
  } = useSports();

  const { base, icon, input } = searchBar();

  // Check if dark mode is active
  const isDarkMode = document.documentElement.classList.contains('dark');

  // Function to get the appropriate filter for a sport based on theme
  const getSportFilter = (sport: any) => {
    // If the sport has custom SVG filters defined, use those
    if (sport.svgFilters) {
      const currentFilters = isDarkMode ? sport.svgFilters.dark : sport.svgFilters.light;
      return generateFilterString(currentFilters);
    }
    
    // Otherwise, use the shouldFilterInDarkMode property
    if (sport.shouldFilterInDarkMode && isDarkMode) {
      return 'brightness(0) invert(1)'; // Make logo white in dark mode
    }
    
    return ''; // No filter
  };

  return (
    <div className="w-[90%] h-full bg-surface text-text-primary mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-medium text-text-primary">
          Competitions displayed
        </h1>
      </div>

      {/* Search Bar */}
      <div className="h-[40px] mb-6">
        <div className={base()}>
          <div className={icon()}>
            <SearchIcon className="h-5 w-5" fill="var(--color-text-tertiary)" />
          </div>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={input()}
          />
        </div>
      </div>

      {/* Sports Grid */}
      <div className={sportsGrid()}>
        {sports.map((sport) => {
          const isSelected = isSportSelected(sport.id);
          const filterString = getSportFilter(sport);
          
          return (
            <div
              key={sport.id}
              onClick={() => toggleSportSelection(sport.id)}
              className={sportCard({ selected: isSelected })}
            >
              {/* Sport content */}
              <div className={sportContent()}>
                {/* Sport image */}
                <div className={`${sportImageContainer()} ${sport.imageHeight || 'h-[30px]'}`}>
                  <img
                    src={sport.imageUrl}
                    alt={sport.name}
                    className="w-full h-full object-contain transition-all duration-300"
                    style={{ filter: filterString }}
                    onError={(e) => {
                      // Fallback to abbreviation if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<span class="text-text-tertiary text-lg font-medium">${sport.abbreviation}</span>`;
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {sports.length === 0 && (
        <div className={emptyState()}>
          <p className={emptyStateText()}>No competitions found</p>
        </div>
      )}
    </div>
  );
};

export default FeedPreferences;