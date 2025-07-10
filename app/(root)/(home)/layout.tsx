'use client';

import { ReactNode, useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const SIDEBAR_WIDTH = 264;
const NAVBAR_HEIGHT = 48;

export default function RootLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#101012] to-[#130122]">
      <Navbar />

      <div className="flex" style={{ paddingTop: NAVBAR_HEIGHT }}>
        <Sidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          width={SIDEBAR_WIDTH}
        />

        <section
          className="flex-1 transition-all duration-300 ease-out"
          style={{
            marginLeft: sidebarOpen ? SIDEBAR_WIDTH : 0,
            minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          }}
        >
          {children}
        </section>
      </div>
    </main>
  );
}
