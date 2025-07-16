import React from 'react';

interface MonthYear {
  month: string;
  year: string;
}

interface MonthYearLabelProps {
  monthYear: MonthYear;
}

const MonthYearLabel: React.FC<MonthYearLabelProps> = ({ monthYear }) => {
  return (
    <div className="text-xl w-[60%] text-center font-semibold uppercase">
      {monthYear.month} {monthYear.year}
    </div>
  );
};

export default MonthYearLabel; 