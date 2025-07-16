import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import IconButton from '../IconButton/IconButton';
import ReturnIcon from '../../../assets/icons/svg/ReturnIcon.svg';

const slidingPanel = tv({
  base: "fixed top-0 h-screen w-full z-50 transition-transform duration-300 ease-in-out",
  variants: {
    direction: {
      left: "left-0 shadow-[2px_0_8px_rgba(0,0,0,0.1)]",
      right: "right-0 shadow-[-2px_0_8px_rgba(0,0,0,0.1)]"
    },
    isOpen: {
      true: "translate-x-0",
      false: ""
    }
  },
  compoundVariants: [
    {
      direction: "left",
      isOpen: false,
      class: "-translate-x-full"
    },
    {
      direction: "right", 
      isOpen: false,
      class: "translate-x-full"
    }
  ],
  defaultVariants: {
    direction: "left",
    isOpen: false
  }
});

const panelContent = tv({
  base: "p-5 h-full overflow-y-auto"
});

interface SlidingPanelProps 
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'direction'>,
    VariantProps<typeof slidingPanel> {
  direction: 'left' | 'right';
  children: React.ReactNode;
  label: string;
  isOpen: boolean;
  onClose?: () => void;
}

const SlidingPanel: React.FC<SlidingPanelProps> = ({ 
  direction, 
  label,
  children, 
  isOpen, 
  onClose,
  className,
  ...props
}) => {
  return (
    <div className={slidingPanel({ direction, isOpen, className })} {...props}>
      {onClose && (
        <div className="bg-background h-[23%] flex flex-col justify-end relative">
            <IconButton
                icon={ReturnIcon}
                onClick={onClose}
                label="Close panel"
                size="md"
                variant="Header"
                className={`absolute top-4 z-10 ${direction === 'left' ? 'left-2' : 'right-2'}`}
            />
            <h1 className="text-2xl font-semibold mb-2 ml-7">
                {label}
            </h1> 
        </div>
      )} 
        <div className="bg-surface h-full">
            <div className={panelContent()}>
                {children}
            </div>
        </div>
    </div>
  );
};

export default SlidingPanel; 