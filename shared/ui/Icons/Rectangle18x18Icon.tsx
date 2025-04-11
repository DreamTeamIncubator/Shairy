import React from 'react';

type Props = {
    isActive?: boolean;
    className?: string;
};

const Rectangle18x18Icon = ({ isActive = false, className = '' }: Props) => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`svgIcon ${isActive ? 'active' : ''} ${className}`}
    >
        <rect
            x="1"
            y="1"
            width="16"
            height="16"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
        />
    </svg>
);

export default Rectangle18x18Icon;
