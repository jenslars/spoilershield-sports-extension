import React from 'react';
import HeaderRightSection from "./HeaderRightSection/HeaderRightSection";
import HeaderLeftSection from './HeaderLeftSection/HeaderLeftSection';
import MonthYearLabel from './HeaderMiddleSection/MonthYearLabel/MonthYearLabel';

interface MonthYear {
  month: string;
  year: string;
}

interface HeaderSectionProps {
  monthYear: MonthYear;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ monthYear }) => {
  return (
    <div className="flex flex-row items-center justify-between w-[90%] mt-[10px]">
      <HeaderLeftSection />
      <MonthYearLabel monthYear={monthYear} />
      <HeaderRightSection />
    </div>
  );
};

export default HeaderSection; 