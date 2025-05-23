'use client';

import React, { useState } from 'react';
import EmailInput from '@/components/EmailInput';

export default function AdminPage() {
  const [emails, setEmails] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async () => {
    if (emails.length === 0) {
      setFeedbackMessage({ type: 'error', message: 'Please add at least one email.' });
      return;
    }

    setIsLoading(true);
    setFeedbackMessage(null);

    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emails }),
      });

      const result = await response.json();

      if (response.ok) {
        setFeedbackMessage({ type: 'success', message: result.message || 'Emails submitted successfully!' });
        setEmails([]); // Clear emails on success
      } else {
        setFeedbackMessage({ type: 'error', message: result.message || 'Failed to submit emails. Please try again.' });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setFeedbackMessage({ type: 'error', message: 'An unexpected error occurred. Please check the console.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // The min-h-screen and flex setup for centering should already have bg-festive-lightBg from globals.css
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Card styling: added shadow-xl, border, border-festive-red/30 */}
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-xl border border-festive-red/30">
        <div>
          {/* Title: uses font-handwriting, new text color and size */}
          <h2 className="mt-6 text-center text-5xl font-handwriting text-festive-red">
            Secret Santa Admin
          </h2>
          {/* Subtitle: uses default font-sans, adjusted text color */}
          <p className="mt-4 text-center text-sm text-festive-darkText/80">
            Enter the email addresses of the participants below.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <EmailInput emails={emails} setEmails={setEmails} />

          {feedbackMessage && (
            // Feedback message styling updated
            <div className={`p-3 rounded-md text-sm ${
              feedbackMessage.type === 'success' 
                ? 'bg-festive-green/20 text-festive-green' 
                : 'bg-festive-red/20 text-festive-red'
            }`}>
              <p>{feedbackMessage.message}</p>
            </div>
          )}

          <div>
            {/* Button styling updated: font, bg color, hover state, text color */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent
                         text-lg font-handwriting text-white 
                         bg-festive-red hover:bg-opacity-80
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-festive-red/70
                         rounded-md disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'Submitting...' : 'Share the Joy!'} 
              {/* Changed button text for more festive feel */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
