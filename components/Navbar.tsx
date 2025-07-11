'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, UserButton } from '@clerk/nextjs';

export const NAVBAR_HEIGHT = 64; // increased height

const Navbar = () => (
  <nav className="navbar">
    <Link href="/" className="navbar-logo-link">
      <Image
        src="/icons/NexDuo-logo.svg"
        width={120}              // smaller logo
        height={28}
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
        padding: 0 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: fixed;
        top: 0; left: 0; width: 100%;
        background: #1a1a1a;
        z-index: 50;
        box-shadow: 0 2px 8px rgba(0,0,0,0.5);
      }
      .navbar-logo-link { display: flex; align-items: center; }
      .navbar-logo-img  { width: 120px; height: 28px; }
      .navbar-actions   { display: flex; align-items: center; gap: 1rem; }

      @media (max-width: 600px) {
        .navbar { padding: 0 1rem; }
        .navbar-logo-img { width: 80px; height: 24px; }
      }
    `}</style>
  </nav>
);

export default Navbar;
