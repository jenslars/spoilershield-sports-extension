import React from 'react';
import IconButton from '../../IconButton';
import { ChevronForward as ChevronForward } from '@/shared/icons';

interface NavigateRightButtonProps {
  onClick: () => void;
}

const NavigateRightButton: React.FC<NavigateRightButtonProps> = ({ onClick }) => (
  <IconButton
    icon={ChevronForward}
    onClick={onClick}
    label="Next Week"
    size="md"
    variant="DatePicker"
    color="blue"
  />
);

export default NavigateRightButton; 