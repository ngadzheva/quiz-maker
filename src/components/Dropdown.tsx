import React from 'react';
import '../styles/Dropdown.css';

interface DropdownProps {
    type: string;
    options: { key: string, value: string }[];
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Dropdown({ type, options, handleChange }: DropdownProps) {
    return (
        <select id={`${type}Select`} onChange={handleChange}>
            <option key=''>Select a {type}</option>
            {options.map(({key, value}) => {
                return <option key={`${key}: ${value}`} value={key}>{value}</option>
            })}
        </select>
    );
}