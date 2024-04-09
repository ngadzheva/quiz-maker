import React from 'react';
import '../styles/Button.css';

interface ButtonProps {
    type?: string;
    text: string;
    handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}

export default function Button({ type, text, handleClick, className }: ButtonProps) {
    return (
        <button id={type} className={className} onClick={handleClick}>{text}</button>
    );
}