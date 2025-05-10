import React from 'react';

interface InputProps {
    name: string;
    type: string;
    label?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    placeholder?: string;
}

function Input({ name, type, label = '', value, onChange, error, placeholder }: InputProps) {
    const inputId = `input-${name}`;

    return (
        <div className="mb-4">
            {label && (
                <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <input
                id={inputId}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    error ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}

export default Input;
