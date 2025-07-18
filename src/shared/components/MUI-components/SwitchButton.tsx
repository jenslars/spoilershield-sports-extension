import React from 'react';
import { Switch, SwitchProps } from '@mui/material';
import { styled } from '@mui/material/styles';

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
        backgroundColor: '#2B7FFF', // blue-400
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

interface SwitchButtonProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ 
  checked, 
  onChange, 
  disabled = false 
}) => {
  return (
    <IOSSwitch
      checked={checked}
      disabled={disabled}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)}
    />
  );
};

export default SwitchButton;
