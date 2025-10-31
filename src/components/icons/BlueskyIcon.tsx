import React from 'react';

interface BlueskyIconProps {
  size?: number | string;
  className?: string;
}

export const BlueskyIcon: React.FC<BlueskyIconProps> = ({ size = 24, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 10.8c-2.3-5.7-8-9.6-11.8-9.6C0 2.5 0 5.6.7 8.7c.2.9 1.1 1.6 2.1 1.6.9 0 1.6-.5 1.9-1.2 1-2.6 2.6-4.7 4.9-6.1 1.7-1 3.8-1.6 6.1-1.6 3.2 0 6 1.4 7.9 3.7 1.6 2 2.4 4.5 2.4 7.3 0 6.7-5.4 12.1-12.1 12.1-6.7 0-12.1-5.4-12.1-12.1 0-1.7.4-3.3 1-4.8.2-.5.7-.8 1.3-.8.9 0 1.6.7 1.6 1.6v12.1c0 .9.7 1.6 1.6 1.6s1.6-.7 1.6-1.6V10.8z"/>
    </svg>
  );
};

export default BlueskyIcon;

