import React, { useState } from 'react';
import ThemeIcon from '../../../assets/icons/svg/label-icons/ThemeIcon.svg';
import FeedIcon from '../../../assets/icons/svg/label-icons/FeedIcon.svg';
import BlockPreferencesIcon from '../../../assets/icons/svg/label-icons/BlockPreferencesIcon.svg';
import ListCheckedIcon from '../../../assets/icons/svg/label-icons/ListCheckedIcon.svg';
import ContactIcon from '../../../assets/icons/svg/label-icons/ContactIcon.svg';
import FAQIcon from '../../../assets/icons/svg/label-icons/FAQIcon.svg';
import ChevronForwardIcon from '../../../assets/icons/svg/label-icons/ChevronForwardIcon.svg';
import SwitchButton from '../MUI-components/SwitchButton';
import SlidingPanel from '../SlidingPanel/SlidingPanel';
import FeedPreferences from './FeedPreferences/FeedPreferences';
import BlockedEventsList from '../BlockedEventsList/BlockedEventsList';
import ReportIssue from './ReportIssue/ReportIssue';
import BlockPreferences from './BlockPreferences/BlockPreferences';

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
      className="flex items-center justify-between cursor-pointer border-b border-gray-700 py-3"
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <Icon className="w-5 h-5" fill="var(--color-text-primary)" />
        <span className="text-text-primary font-light text-sm">{label}</span>
      </div>
      <div className="flex items-center">
        {showSwitch ? (
          <div onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <SwitchButton
              checked={switchChecked}
              onChange={onSwitchChange || (() => {})}
            />
          </div>
        ) : showChevron ? (
          <ChevronForwardIcon className="w-8 h-8 text-text-primary" fill="var(--color-text-primary)" />
        ) : null}
      </div>
    </div>
  );
};

const SettingsMenu = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked);
    // Here you would typically update the theme
    document.documentElement.classList.toggle('dark', checked);
  };

  const handleItemClick = (panelType: string) => {
    setActivePanel(panelType);
  };

  const handleClosePanel = () => {
    setActivePanel(null);
  };

  // Placeholder components for each panel
  const renderPanelContent = (panelType: string) => {
    switch (panelType) {
      case 'feed-preferences':
        return <FeedPreferences />;
      case 'blocking-preferences':
        return <BlockPreferences />;
      case 'blocked-events':
        return <BlockedEventsList />;
      case 'report-issue':
        return <ReportIssue />;
      case 'faq':
        return <div className="p-4">FAQ Panel - Build your component here</div>;
      default:
        return <div className="p-4">Panel content not found</div>;
    }
  };

  return (
    <>
      {/* Settings Content */}
      <div className="w-[90%] mx-auto">
        {/* General Section */}
        <div className="mb-4">
          <h2 className="text-2xl font-regular text-text-primary mb-2">General</h2>
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
              label="Feed Preferences"
              onClick={() => handleItemClick('feed-preferences')}
            />
            <SettingsItem
              icon={BlockPreferencesIcon}
              label="Blocking Preferences"
              onClick={() => handleItemClick('blocking-preferences')}
            />
            <SettingsItem
              icon={ListCheckedIcon}
              label="Blocked Events"
              onClick={() => handleItemClick('blocked-events')}
            />
          </div>
        </div>

        {/* Support Section */}
        <div>
          <h2 className="text-2xl font-regular text-text-primary mb-2">Support</h2>
          <div>
            <SettingsItem
              icon={ContactIcon}
              label="Report an Issue"
              onClick={() => handleItemClick('report-issue')}
            />
            <SettingsItem
              icon={FAQIcon}
              label="FAQ"
              onClick={() => handleItemClick('faq')}
            />
          </div>
        </div>
      </div>

      {/* Sliding Panels */}
      <SlidingPanel
        direction="left"
        isOpen={!!activePanel}
        onClose={handleClosePanel}
        label={activePanel ? activePanel.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : ''}
      >
        {activePanel ? renderPanelContent(activePanel) : null}
      </SlidingPanel>
    </>
  );
};

export default SettingsMenu;