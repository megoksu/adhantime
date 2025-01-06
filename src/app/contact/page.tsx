import React from 'react';
import Link from 'next/link';

export default function Contact() {
  return (
    <div className="min-h-screen bg-emerald-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-emerald-800 mb-6">Contact Us</h1>
        
        <p className="text-gray-600 mb-8">
          We&apos;d love to hear from you! Whether you have suggestions, feedback, or just want to say hello,
          feel free to reach out.
        </p>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-emerald-700 mb-2">Email</h2>
            <a href="mailto:contact@adhantime.com" className="text-emerald-600 hover:text-emerald-500">
              contact@adhantime.com
            </a>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-emerald-700 mb-2">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="https://twitter.com/adhantime" target="_blank" rel="noopener noreferrer" 
                 className="text-emerald-600 hover:text-emerald-500">Twitter</a>
              <a href="https://github.com/adhantime" target="_blank" rel="noopener noreferrer"
                 className="text-emerald-600 hover:text-emerald-500">GitHub</a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <Link href="/" className="text-emerald-600 hover:text-emerald-500">
            ← Back to Prayer Times
          </Link>
        </div>
      </div>
    </div>
  );
} 