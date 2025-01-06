import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 w-full py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="text-white/80 max-w-2xl text-sm">
            <p className="mb-2">
              designed with thought
            </p>
            <p className="text-white/70">
              <a href="mailto:mamileyte0234@gmail.com" className="hover:text-white transition-colors">
                Let's have a chat
              </a>
            </p>
          </div>
          <div className="mt-4 text-xs text-white/60">
            © {new Date().getFullYear()} adhan time. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
} 