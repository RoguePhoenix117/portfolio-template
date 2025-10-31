import React from 'react';

interface ThreadsIconProps {
  size?: number | string;
  className?: string;
}

export const ThreadsIcon: React.FC<ThreadsIconProps> = ({ size = 24, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.119 0C5.402 0 0 5.402 0 12.119c0 6.717 5.402 12.119 12.119 12.119 6.717 0 12.119-5.402 12.119-12.119C24.238 5.402 18.836 0 12.119 0zm0 21.786c-5.327 0-9.667-4.34-9.667-9.667s4.34-9.667 9.667-9.667 9.667 4.34 9.667 9.667-4.34 9.667-9.667 9.667zm-4.667-9.667c0 2.576 2.091 4.667 4.667 4.667s4.667-2.091 4.667-4.667c0-.917-.264-1.773-.719-2.496l-3.948 3.948-3.948-3.948c-.455.723-.719 1.579-.719 2.496zm4.667-4.667c-2.576 0-4.667 2.091-4.667 4.667 0 .917.264 1.773.719 2.496l3.948-3.948 3.948 3.948c.455-.723.719-1.579.719-2.496 0-2.576-2.091-4.667-4.667-4.667z"/>
    </svg>
  );
};

export default ThreadsIcon;

