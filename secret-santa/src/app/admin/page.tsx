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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Secret Santa Admin Panel
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter the email addresses of the participants below.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <EmailInput emails={emails} setEmails={setEmails} />

          {feedbackMessage && (
            <div className={`p-3 rounded-md ${
              feedbackMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              <p className="text-sm">{feedbackMessage.message}</p>
            </div>
          )}

          <div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? 'Submitting...' : 'Submit Emails'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
