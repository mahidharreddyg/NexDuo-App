'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, UserButton } from '@clerk/nextjs';

const NAVBAR_HEIGHT = 48;

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href="/" className="navbar-logo-link">
        <Image
          src="/icons/NexDuo-logo.svg"
          width={160}
          height={32}
          alt="NexDuo logo"
          className="navbar-logo-img"
        />
      </Link>
      <div className="navbar-actions">
        <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>
      </div>
      <style jsx>{`
        .navbar {
          height: ${NAVBAR_HEIGHT}px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 0 1.5rem;
          background: #1a1a1a;
          z-index: 50;
        }
        .navbar-logo-link {
          display: flex;
          align-items: center;
        }
        .navbar-logo-img {
          width: 160px;
          height: 32px;
        }
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        @media (max-width: 600px) {
          .navbar {
            padding: 0 1rem;
          }
          .navbar-logo-img {
            width: 80px;
            height: 32px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
