import React from 'react';
import Day from './Day/Day';

interface DateSectionProps {
  currentWeek: Date[];
  activeDay: Date;
  onDayClick: (date: Date) => void;
}

const DateSection: React.FC<DateSectionProps> = ({ currentWeek, activeDay, onDayClick }) => {
  return (
    <div className="flex flex-row w-[90%] justify-around">
      {currentWeek.map((date, index) => (
        <Day
          key={index}
          date={date}
          isActive={activeDay && activeDay.toDateString() === date.toDateString()}
          onClick={() => onDayClick(date)}
        />
      ))}
    </div>
  );
};

export default DateSection; 