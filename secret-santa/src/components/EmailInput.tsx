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
      {/* Email tags styling updated */}
      <div className="mb-3 flex flex-wrap gap-2">
        {emails.map(email => (
          <span 
            key={email} 
            // Tag styling: bg-festive-red, rounded-md
            className="bg-festive-red text-white px-3 py-1.5 rounded-md flex items-center text-sm shadow-sm"
          >
            {/* Email text uses font-sans by default from global styles */}
            {email}
            <button
              type="button"
              // "x" button styling updated
              className="ml-2 text-red-100 hover:text-white focus:outline-none"
              onClick={() => removeEmail(email)}
            >
              &times;
            </button>
          </span>
        ))}
      </div>

      {/* Input field styling updated */}
      <input
        type="email" // Changed from type="text" to type="email" for semantic correctness
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type an email and press Enter..." // Placeholder text shortened
        className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 text-sm
                    font-sans {/* Explicitly apply font-sans for input text */}
                    ${ error 
                        ? 'border-festive-red focus:ring-festive-red/70' 
                        : 'border-gray-300 focus:ring-festive-red/70' // Keep gray border for normal state, festive focus
                    }
                    placeholder-gray-400 text-festive-darkText bg-white`} // Ensure input text color is dark
      />
      {/* Error message styling updated */}
      {error && <p className="text-festive-red text-xs mt-1.5 font-sans">{error}</p>} {/* Applied font-sans to error text */}
    </div>
  );
};

export default EmailInput;
