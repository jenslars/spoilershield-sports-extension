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

const HeadToHeadSection: React.FC<HeadToHeadSectionProps> = ({ teams }) => (
  <div className="flex flex-row items-center gap-2 w-4/5 justify-between">
    <div className="flex flex-col items-center text-[9px] font-light">
      <img src={teams.home.logo} alt={teams.home.name} style={{ height: 30 }} />
      <div className="mt-1">{teams.home.name}</div>
    </div>
    <span className="text-[21px] font-semibold text-[#F0F0F0]">-</span>
    <div className="flex flex-col items-center text-[9px] font-light">
      <img src={teams.visitors.logo} alt={teams.visitors.name} style={{ height: 30 }} />
      <div className="mt-1">{teams.visitors.name}</div>
    </div>
  </div>
);

export default HeadToHeadSection; 