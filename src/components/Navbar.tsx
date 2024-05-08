
'use client'
import { useSession, signOut } from 'next-auth/react';
import { User } from 'next-auth';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const { data: session } = useSession();

  const user: User = session?.user as User;
  return (
    <div className="bg-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            {/* Logo */}
            <a href="#" className="text-black font-bold text-xl">Anonymous Confessions</a>
          </div>
          <div className="flex items-center">
            {session ? (
              <>
                <span className="text-black mr-4">Welcome, {user?.username || user?.email}</span>
                <Button
                  onClick={() => {
                    signOut();
                  }}
                  className="bg-black text-white"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/sign-in">
                <Button className="bg-black text-white">Log In</Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
