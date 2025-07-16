import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const iconButton = tv({
  base: "inline-flex items-center justify-center rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:scale-101",
  variants: {
    size: {
      sm: "w-8 h-8",
      md: "w-10 h-10", 
      lg: "w-12 h-12",
      xl: "w-14 h-14"
    },
    variant: {
      solid: "",
      DatePicker: "text-blue-500 hover:text-blue-400",
      Header: "text-text-primary hover:text-text-secondary"
    },
    color: {
      primary: "text-slate-100 hover:text-slate-50",
      secondary: "text-gray-500 hover:text-gray-700",
      success: "text-green-600 hover:text-green-700",
      warning: "text-yellow-600 hover:text-yellow-700",
      danger: "text-red-600 hover:text-red-700",
      info: "text-blue-600 hover:text-blue-700",
      blue: "text-blue-400 hover:text-blue-500",
      theme: "text-text-primary hover:text-text-secondary"
    }
  },
  compoundVariants: [
    // Fallback Variants
    {
      variant: "solid",
      color: "primary",
    },
    // DatePicker Variants
    {
        variant: "DatePicker",
        color: "blue",
        class: "text-blue-400 hover:text-blue-500"
    },
    // Header with theme colors
    {
        variant: "Header",
        color: "theme",
        class: "text-text-primary hover:text-text-secondary"
    }
  ],
  defaultVariants: {
    size: "md",
    variant: "solid",
    color: "primary"
  }
});

const iconSizes = tv({
  base: "transition-colors duration-200", // Removed fill-current stroke-current
  variants: {
    size: {
      sm: "w-6 h-6",
      md: "w-8 h-8",
      lg: "w-10 h-10", 
      xl: "w-12 h-12"
    }
  },
  defaultVariants: {
    size: "md"
  }
});

export interface IconButtonProps 
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof iconButton> {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label?: string;
  loading?: boolean;
  customColors?: {
    light?: string;
    dark?: string;
  };
  useThemeFill?: boolean; // New prop to control theme-based fill
}

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  size = "md",
  variant = "solid",
  color = "primary",
  label,
  loading = false,
  customColors,
  useThemeFill = false, // Default to false to maintain backward compatibility
  className,
  disabled,
  onClick,
  ...props
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) return;
    onClick?.(event);
  };

  // Determine if this variant should use theme fill
  const shouldUseThemeFill = useThemeFill || variant === "Header";

  // Get the appropriate fill value
  const getFillValue = () => {
    if (customColors) {
      // Use custom colors if provided
      return `var(--color-${customColors.light || 'text-primary'})`;
    }
    
    if (shouldUseThemeFill) {
      // Use theme-based fill
      return "var(--color-text-primary)";
    }
    
    // Default to currentColor for other variants
    return "currentColor";
  };

  return (
    <button
      className={iconButton({ size, variant, color, className })}
      onClick={handleClick}
      disabled={disabled || loading}
      aria-label={label}
      {...props}
    >
      {loading ? (
        <svg
          className={`${iconSizes({ size })} animate-spin`}
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <Icon 
          className={iconSizes({ size })} 
          fill={getFillValue()}
        />
      )}
    </button>
  );
};

export default IconButton; 