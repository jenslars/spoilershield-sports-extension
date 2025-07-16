import React from 'react';

interface MultiCompetitorSectionProps {
  title: string;
  image?: string;
  description: string;
}

const MultiCompetitorSection: React.FC<MultiCompetitorSectionProps> = ({ title, image, description }) => (
  <div className="flex flex-col w-4/5 justify-between">
    <div className="flex flex-row items-center text-[16px] font-normal">
      <div className="event-title">{title}</div>
      {image && <img src={image} alt={title} className="ml-1 rounded h-3 w-5" />}
    </div>
    <div className="text-[9px] font-light">
      {description}
    </div>
  </div>
);

export default MultiCompetitorSection; 