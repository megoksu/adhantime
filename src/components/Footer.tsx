import React from 'react';

export default function Footer() {
  return (
    <footer className="relative w-full py-4 mt-16 min-h-[100px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="text-gray-600 max-w-2xl text-sm">
            <p className="mb-2">
              designed with thought
            </p>
            <p className="text-gray-500">
              <a href="mailto:mamileyte0234@gmail.com" className="hover:text-white px-2 py-1 rounded transition-colors">
                Let&apos;s have a chat
              </a>
            </p>
          </div>
          <div className="mt-4 text-xs text-gray-500">
            © {new Date().getFullYear()} adhan time. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
} 