'use client';

import { ReactNode, useState, useEffect } from 'react';
import Navbar, { NAVBAR_HEIGHT } from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const SIDEBAR_WIDTH = 268;
const SIDEBAR_COLLAPSED_WIDTH = 80;

export default function RootLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Auto-collapse on mobile
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) return null;

  return (
    <main className="root">
      <Navbar />

      <div className="wrapper" style={{ paddingTop: NAVBAR_HEIGHT }}>
        <Sidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          width={SIDEBAR_WIDTH}
          iconSize={SIDEBAR_COLLAPSED_WIDTH}
        />

        <section
          className="content"
          style={{
            marginLeft: sidebarOpen ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH,
            minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          }}
        >
          <div className="content-inner">
            {children}
          </div>
        </section>
      </div>

      <style jsx>{`
        .root {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0f 0%, #1a0b2e 30%, #16213e 70%, #0f1419 100%);
          position: relative;
        }
        
        .root::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.04) 0%, transparent 50%);
          pointer-events: none;
          z-index: 1;
        }
        
        .wrapper {
          display: flex;
          position: relative;
          z-index: 2;
        }
        
        .content {
          flex: 1;
          transition: margin-left 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }
        
        .content-inner {
          padding: 2rem;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(16px);
          border-radius: 8px 0 0 0;
          border-top: 1px solid rgba(148, 163, 184, 0.12);
          border-left: 1px solid rgba(148, 163, 184, 0.08);
          box-shadow: 
            inset 0 1px 0 rgba(255, 255, 255, 0.06),
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
          min-height: calc(100vh - ${NAVBAR_HEIGHT}px);
          position: relative;
        }
        
        .content-inner::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.2), transparent);
        }
        
        @media (max-width: 1024px) {
          .content {
            margin-left: 0 !important;
          }
          
          .content-inner {
            padding: 1.5rem;
            border-radius: 0;
            border-left: none;
          }
        }
        
        @media (max-width: 640px) {
          .content-inner {
            padding: 1rem;
          }
        }
      `}</style>
    </main>
  );
}
