import React from 'react';

interface MastodonIconProps {
  size?: number | string;
  className?: string;
}

export const MastodonIcon: React.FC<MastodonIconProps> = ({ size = 24, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M23.268 5.313h-3.544l-7.227 8.26 8.502 11.24h3.544l-8.738-11.74L23.268 5.313zm-8.089 9.229l-2.206-2.587-7.73 8.835h3.544l6.392-6.248zm-9.588-7.458c-1.183 0-2.157 1.085-2.157 2.419 0 1.333.956 2.419 2.157 2.419 1.21 0 2.176-1.096 2.157-2.42 0-1.333-.946-2.418-2.157-2.418z" fillRule="evenodd"/>
    </svg>
  );
};

export default MastodonIcon;

