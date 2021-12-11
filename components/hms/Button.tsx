import React from 'react';
import cn from 'classnames';

interface ButtonProps {
  type?: JSX.IntrinsicElements['button']['type'];
  variant?: 'secondary' | 'primary';
}

const Button: React.FC<ButtonProps & JSX.IntrinsicElements['button']> = ({
  type = 'button',
  variant = 'primary',
  children,
  ...props
}) => {
  const baseClass = `flex items-center justify-center rounded-lg px-4 py-3 cursor-pointer min-w-btn`;
  const variantClass = `${
    variant === 'primary' ? 'bg-brand-300 hover:bg-brand-200' : 'bg-gray-600 hover:bg-gray-500'
  }`;
  return (
    <button className={cn(baseClass, variantClass)} type={type} {...props}>
      {children}
    </button>
  );
};

export default Button;
