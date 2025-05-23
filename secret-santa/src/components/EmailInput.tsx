'use client';

import React, { useState, KeyboardEvent } from 'react';

interface EmailInputProps {
  emails: string[];
  setEmails: (emails: string[]) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ emails, setEmails }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const isValidEmail = (email: string): boolean => {
    // Basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setError(null); // Clear error when user types
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (['Enter', ',', ' '].includes(event.key) && inputValue.trim() !== '') {
      event.preventDefault();
      const newEmail = inputValue.trim();

      if (!isValidEmail(newEmail)) {
        setError('Invalid email format.');
        return;
      }
      if (emails.includes(newEmail)) {
        setError('Email already added.');
        setInputValue(''); // Clear input even if duplicate
        return;
      }

      setEmails([...emails, newEmail]);
      setInputValue('');
      setError(null);
    } else if (event.key === 'Backspace' && inputValue === '' && emails.length > 0) {
      // Optional: remove last email on backspace if input is empty
      setEmails(emails.slice(0, -1));
    }
  };

  const removeEmail = (emailToRemove: string) => {
    setEmails(emails.filter(email => email !== emailToRemove));
  };

  return (
    <div className="w-full">
      {/* Email tags */}
      <div className="mb-2 flex flex-wrap gap-2">
        {emails.map(email => (
          <span key={email} className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center text-sm">
            {email}
            <button
              type="button"
              className="ml-2 text-blue-100 hover:text-white focus:outline-none"
              onClick={() => removeEmail(email)}
            >
              &times;
            </button>
          </span>
        ))}
      </div>

      {/* Input field */}
      <input
        type="email"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type an email and press Enter, Comma, or Space"
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default EmailInput;
