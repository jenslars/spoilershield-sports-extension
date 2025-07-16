import React, { useState } from 'react';
import { Switch, SwitchProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import ThemeIcon from '../../../assets/icons/svg/label-icons/ThemeIcon.svg';
import FeedIcon from '../../../assets/icons/svg/label-icons/FeedIcon.svg';
import BlockPreferencesIcon from '../../../assets/icons/svg/label-icons/BlockPreferencesIcon.svg';
import ListCheckedIcon from '../../../assets/icons/svg/label-icons/ListCheckedIcon.svg';
import ContactIcon from '../../../assets/icons/svg/label-icons/ContactIcon.svg';
import FAQIcon from '../../../assets/icons/svg/label-icons/FAQIcon.svg';
import ChevronForwardIcon from '../../../assets/icons/svg/label-icons/ChevronForwardIcon.svg';

// Custom styled MUI Switch for iOS style
const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#60a5fa', // blue-400
        opacity: 1,
        border: 0,
        ...theme.applyStyles('dark', {
          backgroundColor: '#3b82f6', // blue-500 for dark mode
        }),
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#3b82f6', // blue-500
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
      ...theme.applyStyles('dark', {
        color: theme.palette.grey[600],
      }),
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
      ...theme.applyStyles('dark', {
        opacity: 0.3,
      }),
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: '#39393D',
    }),
  },
}));

interface SettingsItemProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  onClick?: () => void;
  showChevron?: boolean;
  showSwitch?: boolean;
  switchChecked?: boolean;
  onSwitchChange?: (checked: boolean) => void;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  icon: Icon,
  label,
  onClick,
  showChevron = true,
  showSwitch = false,
  switchChecked = false,
  onSwitchChange
}) => {
  return (
    <div 
      className="flex items-center justify-between cursor-pointer border-b border-gray-700 py-2"
      onClick={onClick}
    >
      <div className="flex items-center space-x-2">
        <Icon className="w-5 h-5 text-text-primary" />
        <span className="text-white text-text-primary font-light text-sm">{label}</span>
      </div>
      <div className="flex items-center">
        {showSwitch ? (
          <IOSSwitch
            checked={switchChecked}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSwitchChange?.(e.target.checked)}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          />
        ) : showChevron ? (
          <ChevronForwardIcon className="w-7 h-7 text-text-primary" />
        ) : null}
      </div>
    </div>
  );
};

const SettingsNavigation = () => {
  const [darkMode, setDarkMode] = useState(true);

  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked);
    // Here you would typically update the theme
    document.documentElement.classList.toggle('dark', checked);
  };

  return (
    <>
      {/* Settings Content */}
      <div className="w-[90%] mx-auto">
        {/* General Section */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-text-primary mb-4">General</h2>
          <div>
            <SettingsItem
              icon={ThemeIcon}
              label="Dark Mode"
              showChevron={false}
              showSwitch={true}
              switchChecked={darkMode}
              onSwitchChange={handleDarkModeToggle}
            />
            <SettingsItem
              icon={FeedIcon}
              label="Schedule Feed Preferences"
            />
            <SettingsItem
              icon={BlockPreferencesIcon}
              label="Blocking Preferences"
            />
            <SettingsItem
              icon={ListCheckedIcon}
              label="Blocked Events"
            />
          </div>
        </div>

        {/* Support Section */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4 px-2">Support</h2>
          <div>
            <SettingsItem
              icon={ContactIcon}
              label="Report an Issue"
            />
            <SettingsItem
              icon={FAQIcon}
              label="FAQ"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsNavigation;