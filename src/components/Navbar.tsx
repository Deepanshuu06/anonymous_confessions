'use client';

import { useSession, signOut } from 'next-auth/react';
import { User } from 'next-auth';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const { data: session, status } = useSession();
  const user: User = session?.user as User;
  const [showMenu, setShowMenu] = useState(false);


  if (status === 'loading') {
    return null; 
  }

  return (
    <div className="bg-white shadow-lg sticky top-0">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/">
              <h2 className="text-black font-bold text-xl">Anonymous Confessions</h2>
            </Link>
          </div>
          <div className="flex items-center">
            {/* Conditional rendering of login button */}
            {!session && (
              <Link href="/sign-in">
                <Button className="bg-gray-400 text-white">Log In</Button>
              </Link>
            )}
            {/* Hamburger icon for logged-in user */}
            {session && (
              <button
                className="block sm:hidden text-black mr-4"
                onClick={() => setShowMenu(!showMenu)}
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {showMenu ? (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
                    />
                  ) : (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
                    />
                  )}
                </svg>
              </button>
            )}
            {/* Welcome message (hidden on mobile) */}
            {session && (
              <div className="flex items-center">
                <span className="hidden sm:block text-black mr-4">
                  Welcome, {user?.username || user?.email}
                </span>
                <Button
                  onClick={() => {
                    signOut();
                  }}
                  className="bg-black text-white hidden sm:block"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {session && showMenu && (
          <div className="sm:hidden mt-2">
            <span className="block text-black mb-2">
              Welcome, {user?.username || user?.email}
            </span>
            <Button
              onClick={() => {
                signOut();
                setShowMenu(false);
              }}
              className="bg-violet-500 hover:bg-violet-700 text-white w-full mb-3"
            >
              Logout
            </Button>
            <Link href="/dashboard">
              <Button
                className="bg-red-600 text-white w-full mb-3"
                onClick={() => setShowMenu(false)}
              >
                Go to Dashboard
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
