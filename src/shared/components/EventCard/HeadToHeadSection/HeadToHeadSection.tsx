import React from 'react';

interface Team {
  id: string;
  name: string;
  nickname: string;
  code: string;
  logo: string;
}

interface HeadToHeadSectionProps {
  teams: {
    home: Team;
    visitors: Team;
  };
}

// Function to determine if team logos should be filtered in dark mode
// For now, we'll keep team logos unfiltered as they're typically designed for both themes
const getTeamLogoFilter = (isDarkMode: boolean) => {
  // Team logos are usually designed to work in both themes, so we don't filter them
  // If you need to filter specific team logos, you can add logic here
  return '';
};

const HeadToHeadSection: React.FC<HeadToHeadSectionProps> = ({ teams }) => {
  // Check if dark mode is active
  const isDarkMode = document.documentElement.classList.contains('dark');
  const teamLogoFilter = getTeamLogoFilter(isDarkMode);

  return (
    <div className="flex flex-row items-center gap-2 w-4/5 justify-between">
      <div className="flex flex-col items-center text-[9px] font-light">
        <img 
          src={teams.home.logo} 
          alt={teams.home.name} 
          style={{ height: 30, filter: teamLogoFilter }}
          className="transition-all duration-300"
        />
        <div className="mt-1">{teams.home.name}</div>
      </div>
      <span className="text-[21px] font-semibold text-[#F0F0F0]">-</span>
      <div className="flex flex-col items-center text-[9px] font-light">
        <img 
          src={teams.visitors.logo} 
          alt={teams.visitors.name} 
          style={{ height: 30, filter: teamLogoFilter }}
          className="transition-all duration-300"
        />
        <div className="mt-1">{teams.visitors.name}</div>
      </div>
    </div>
  );
};

export default HeadToHeadSection; 