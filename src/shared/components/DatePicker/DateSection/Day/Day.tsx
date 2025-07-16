import React from 'react';
import { tv } from 'tailwind-variants';

const dayContainer = tv({
  base: "flex justify-between flex-col text-center cursor-pointer transition-all duration-200"
});

const weekdayBackground = tv({
  base: "w-7 h-7 rounded-full flex items-center justify-center",
  variants: {
    isToday: {
      true: "",
      false: ""
    },
    isActive: {
      true: "",
      false: ""
    }
  },
  compoundVariants: [
    {
      isToday: true,
      isActive: true,
      class: "bg-blue-500"
    },
    {
      isToday: false,
      isActive: true,
      class: "bg-gray-700"
    }
  ]
});

const weekday = tv({
  base: "text-gray-500 text-xs mt-0.5 font-bold mb-1"
});

const dateNumber = tv({
  base: "font-normal text-sm",
  variants: {
    isToday: {
      true: "",
      false: ""
    },
    isActive: {
      true: "",
      false: ""
    }
  },
  compoundVariants: [
    {
      isToday: true,
      isActive: true,
      class: "text-gray-800"
    },
    {
      isToday: false,
      isActive: true,
      class: "text-white"
    },
    {
      isToday: true,
      isActive: false,
      class: "text-blue-400"
    }
  ]
});

interface DayProps {
  date: Date;
  isActive: boolean;
  onClick: () => void;
}

const Day: React.FC<DayProps> = ({ date, isActive, onClick }) => {
  if (!date) return null;

  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();

  const weekdayLetter = date.toLocaleString('default', { weekday: 'short' }).charAt(0); 
  const dayNumber = date.getDate();

  return (
    <div className={dayContainer()} onClick={onClick}>
      <div className={weekday()}>{weekdayLetter}</div>
      <div className={weekdayBackground({ isToday, isActive })}>
        <div className={dateNumber({ isToday, isActive })}>{dayNumber}</div>
      </div>
    </div>
  );
};

export default Day; 