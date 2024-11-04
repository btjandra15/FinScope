import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-5xl mx-auto text-center">
        <p>
            &copy; {new Date().getFullYear()} FinScope. All rights reserved.
        </p>

        <div className="flex justify-center space-x-4 mt-2">
          <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <Link href="/terms-of-service" className="hover:underline">Terms of Service</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
