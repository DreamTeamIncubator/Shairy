import React from 'react';

type Props = {
    isActive: boolean;
};

const Rectangle18x26Icon = ({ isActive }: Props) => (
    <svg
        width="18"
        height="26"
        viewBox="0 0 18 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`svgIcon ${isActive ? 'active' : ''}`}
    >
        <rect
            x="1"
            y="1"
            width="16"
            height="24"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
        />
    </svg>
);

export default Rectangle18x26Icon;
