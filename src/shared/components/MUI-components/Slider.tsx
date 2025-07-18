import React from 'react';
import { Slider, SliderValueLabelProps, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';

// MUI Slider Components
export function ValueLabelComponent(props: SliderValueLabelProps) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

export const IOSSlider = styled(Slider)(({ theme }) => ({
  color: '#007bff',
  height: 5,
  padding: '15px 0',
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    boxShadow: '0 0 2px 0px rgba(0, 0, 0, 0.1)',
    '&:focus, &:hover, &.Mui-active': {
      boxShadow: '0px 0px 3px 1px rgba(0, 0, 0, 0.1)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
    '&:before': {
      boxShadow:
        '0px 0px 1px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 1px 0px rgba(0,0,0,0.12)',
    },
  },
  '& .MuiSlider-valueLabel': {
    fontSize: 12,
    fontWeight: 'normal',
    top: -6,
    backgroundColor: 'unset',
    color: theme.palette.text.primary,
    '&::before': {
      display: 'none',
    },
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },
  '& .MuiSlider-track': {
    border: 'none',
    height: 5,
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    boxShadow: 'inset 0px 0px 4px -2px #000',
    backgroundColor: '#d0d0d0',
  },
}));

// Reusable slider component with common props
interface CustomSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  showValueLabel?: boolean;
  showUnlimited?: boolean;
  unlimitedValue?: number;
}

export const CustomSlider: React.FC<CustomSliderProps> = ({
  value,
  onChange,
  min = 1,
  max = 100,
  step = 1,
  label,
  showValueLabel = true,
  showUnlimited = false,
  unlimitedValue = 31,
}) => {
  const effectiveMax = showUnlimited ? unlimitedValue : max;
  
  return (
    <IOSSlider
      value={value}
      onChange={(_, newValue) => onChange(newValue as number)}
      min={min}
      max={effectiveMax}
      step={step}
      valueLabelDisplay={showValueLabel ? "auto" : "off"}
      slots={{
        valueLabel: ValueLabelComponent,
      }}
      aria-label={label}
    />
  );
};
