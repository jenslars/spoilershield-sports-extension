import React from 'react';
import IconButton from '../../IconButton';
import { ChevronBackward as ChevronBackward } from '@/shared/icons';

interface NavigateLeftButtonProps {
  onClick: () => void;
}

const NavigateLeftButton: React.FC<NavigateLeftButtonProps> = ({ onClick }) => (
  <IconButton
    icon={ChevronBackward}
    onClick={onClick}
    label="Previous Week"
    size="md"
    variant="DatePicker"
    color="blue"
  />
);

export default NavigateLeftButton; 