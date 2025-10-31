import React from 'react';

interface BehanceIconProps {
  size?: number | string;
  className?: string;
}

export const BehanceIcon: React.FC<BehanceIconProps> = ({ size = 24, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.94 2.49-5.92 5.564-5.92 3.06 0 4.658 1.622 5.064 4.675h-3.204c-.208-.727-1.241-1.964-2.866-1.964-2.491 0-3.865 1.922-3.865 4.415 0 2.512 1.384 4.437 3.865 4.437 1.597 0 2.598-.88 2.866-1.964H23.726zM8.405 13.472c-.328 0-.578-.123-.767-.37-.184-.247-.28-.57-.28-.97 0-.45.105-.774.316-.971.209-.194.49-.291.842-.291.348 0 .594.091.732.271.139.177.205.4.205.67 0 .506-.09.807-.28.972-.192.164-.479.247-.866.247zm-3.413 1.611H1.25v-7.75h4.235c1.063 0 1.811.454 2.246 1.362.435.909.653 2.009.653 3.3 0 1.477-.229 2.514-.686 3.112-.455.597-1.191.896-2.206.896H4.992z" fillRule="evenodd"/>
    </svg>
  );
};

export default BehanceIcon;

