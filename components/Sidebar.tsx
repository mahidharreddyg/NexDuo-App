'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dispatch, SetStateAction, useCallback, useState, useEffect, useRef } from 'react';
import { sidebarLinks } from '@/constants';
import { NAVBAR_HEIGHT } from '@/components/Navbar';
import { useUser } from '@clerk/nextjs';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  width: number;
  iconSize?: number;
  userName?: string; // Added prop for user name
}

export default function Sidebar({
  isOpen,
  setIsOpen,
  width,
  iconSize = 80,
  userName = "User", // Default fallback name
}: SidebarProps) {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();

  // Determine display name
  const displayName = user?.firstName || user?.username || user?.primaryEmailAddress?.emailAddress || 'User';

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sidebarRef = useRef<HTMLElement>(null);

  const toggle = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsOpen(prev => !prev);
    setTimeout(() => setIsAnimating(false), 350);
  }, [setIsOpen, isAnimating]);

  // Find active index
  useEffect(() => {
    const activeIdx = sidebarLinks.findIndex(
      item => pathname === item.route || pathname.startsWith(`${item.route}/`)
    );
    if (activeIdx !== -1) setActiveIndex(activeIdx);
  }, [pathname]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        window.innerWidth <= 1024 && 
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target as Node) && 
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsOpen, isOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* Enhanced Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-xl z-40 lg:hidden transition-all duration-350"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        ref={sidebarRef}
        role="navigation"
        aria-label="Main Navigation"
        className={`
          fixed left-0 z-50 flex flex-col
          bg-gradient-to-b from-slate-900/95 via-slate-800/95 to-slate-950/95 
          backdrop-blur-2xl border-r border-slate-700/30
          shadow-2xl transition-all duration-350 cubic-bezier(0.4, 0, 0.2, 1)
          lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isAnimating ? 'overflow-hidden' : ''}
          rounded-tr-2xl
          before:absolute before:inset-0 before:bg-gradient-to-br 
          before:from-purple-500/5 before:via-transparent before:to-blue-500/5 
          before:opacity-0 before:transition-opacity before:duration-300
          hover:before:opacity-100
        `}
        style={{
          top: `${NAVBAR_HEIGHT}px`,
          width: isOpen ? width : iconSize,
          height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
        }}
      >
        {/* Animated Border Gradients */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent rounded-tr-2xl animate-pulse" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-pulse" />

        {/* Enhanced Morphing Toggle Button */}
        <button
          onClick={toggle}
          disabled={isAnimating}
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          className="
            absolute -right-6 top-8 z-30 w-12 h-12 flex items-center justify-center
            bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700
            backdrop-blur-xl border-2 border-purple-400/30
            rounded-2xl shadow-2xl shadow-purple-500/30
            transition-all duration-350 cubic-bezier(0.4, 0, 0.2, 1)
            hover:from-purple-500 hover:via-purple-600 hover:to-indigo-600
            hover:border-purple-300/50 hover:shadow-purple-400/50
            hover:scale-110 active:scale-95
            focus:outline-none focus:ring-4 focus:ring-purple-400/30
            group overflow-hidden
          "
        >
          {/* Animated Background Pulse */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 via-transparent to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-350" />
          
          {/* Morphing Icon Container */}
          <div className="relative w-6 h-6 flex items-center justify-center">
            {/* Top Line */}
            <div 
              className={`
                absolute w-4 h-0.5 bg-white rounded-full transition-all duration-350 ease-out
                ${isOpen 
                  ? 'rotate-45 translate-y-0' 
                  : '-translate-y-1.5 group-hover:w-5'
                }
              `}
              style={{
                transformOrigin: 'center',
                filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))',
              }}
            />
            
            {/* Middle Line */}
            <div 
              className={`
                absolute w-4 h-0.5 bg-white rounded-full transition-all duration-350 ease-out
                ${isOpen 
                  ? 'opacity-0 scale-0' 
                  : 'opacity-100 scale-100 group-hover:w-3'
                }
              `}
              style={{
                filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))',
              }}
            />
            
            {/* Bottom Line */}
            <div 
              className={`
                absolute w-4 h-0.5 bg-white rounded-full transition-all duration-350 ease-out
                ${isOpen 
                  ? '-rotate-45 translate-y-0' 
                  : 'translate-y-1.5 group-hover:w-5'
                }
              `}
              style={{
                transformOrigin: 'center',
                filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))',
              }}
            />
            
            {/* Subtle Glow Effect */}
            <div className="absolute inset-0 bg-white/10 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-350" />
          </div>
          
          {/* Enhanced Ripple Effect */}
          <div className="absolute inset-0 rounded-2xl bg-white/20 scale-0 group-active:scale-100 transition-transform duration-200 ease-out" />
          
          {/* Bounce Animation on Toggle */}
          <div className={`absolute inset-0 rounded-2xl bg-purple-300/30 ${isAnimating ? 'animate-ping' : 'scale-0'} transition-transform duration-350`} />
        </button>

        {/* Personalized Header */}
        <div className="relative px-6 py-6 border-b border-slate-700/20">
          {isOpen && (
            <div className="transition-all duration-350 ease-out">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/30 ring-2 ring-purple-400/20">
                    <span className="text-white font-bold text-lg drop-shadow-lg">
                      {displayName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-2xl blur animate-pulse" />
                  
                  {/* Online Status Indicator */}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-800 animate-pulse" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-white tracking-wide bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent truncate">
                    Hi! {displayName}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 font-medium flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                    Welcome back
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Revolutionary Navigation with Increased Spacing */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto scrollbar-hide relative">
          {/* Active Item Indicator Background */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 h-16 bg-gradient-to-r from-purple-600/20 via-purple-500/15 to-purple-600/20 rounded-xl transition-all duration-350 ease-out shadow-lg shadow-purple-500/10 ring-1 ring-purple-500/20"
            style={{
              transform: `translateX(-50%) translateY(${activeIndex * 80 + 8}px)`,
              opacity: isOpen ? 1 : 0,
              width: isOpen ? 'calc(100% - 32px)' : '48px',
            }}
          />

          {/* Hover Item Indicator Background */}
          {hoveredIndex !== null && hoveredIndex !== activeIndex && (
            <div 
              className="absolute left-1/2 -translate-x-1/2 h-16 bg-gradient-to-r from-slate-600/20 via-slate-500/15 to-slate-600/20 rounded-xl transition-all duration-300 ease-out shadow-lg shadow-slate-500/10 ring-1 ring-slate-500/20"
              style={{
                transform: `translateX(-50%) translateY(${hoveredIndex * 80 + 8}px)`,
                opacity: isOpen ? 1 : 0,
                width: isOpen ? 'calc(100% - 32px)' : '48px',
              }}
            />
          )}

          {/* Only Active Triangle Indicator for Collapsed State */}
          {!isOpen && (
            <>
              {/* Premium 3D Active Triangle Indicator - Moved Down */}
              <div 
                className="absolute right-0 transition-all duration-500 ease-out z-20 group"
                style={{
                  top: `${24 + (activeIndex * 80) + 38}px`, // Moved down by 6px
                  transform: 'translateY(-50%)',
                }}
              >
                {/* Glow Background */}
                <div 
                  className="absolute -inset-2 rounded-full blur-sm opacity-60 animate-pulse"
                  style={{
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
                  }}
                />
                
                {/* Main 3D Triangle Container */}
                <div className="relative transform hover:scale-110 transition-transform duration-300">
                  {/* Shadow Base */}
                  <div 
                    className="absolute -z-20"
                    style={{
                      top: '3px',
                      right: '-3px',
                      width: '0',
                      height: '0',
                      borderTop: '8px solid transparent',
                      borderBottom: '8px solid transparent',
                      borderRight: '13px solid rgba(0, 0, 0, 0.3)',
                      filter: 'blur(1px)',
                    }}
                  />
                  
                  {/* Deep Depth Layer */}
                  <div 
                    className="absolute -z-10"
                    style={{
                      top: '2px',
                      right: '-2px',
                      width: '0',
                      height: '0',
                      borderTop: '8px solid transparent',
                      borderBottom: '8px solid transparent',
                      borderRight: '13px solid #6d28d9',
                    }}
                  />
                  
                  {/* Mid Depth Layer */}
                  <div 
                    className="absolute -z-5"
                    style={{
                      top: '1px',
                      right: '-1px',
                      width: '0',
                      height: '0',
                      borderTop: '8px solid transparent',
                      borderBottom: '8px solid transparent',
                      borderRight: '13px solid #7c3aed',
                    }}
                  />
                  
                  {/* Main Triangle */}
                  <div 
                    className="relative"
                    style={{
                      width: '0',
                      height: '0',
                      borderTop: '8px solid transparent',
                      borderBottom: '8px solid transparent',
                      borderRight: '13px solid #a855f7',
                      filter: 'drop-shadow(0 2px 8px rgba(168, 85, 247, 0.5)) drop-shadow(0 1px 3px rgba(0, 0, 0, 0.4))',
                    }}
                  />
                  
                  {/* Top Highlight */}
                  <div 
                    className="absolute"
                    style={{
                      top: '-6px',
                      right: '-11px',
                      width: '0',
                      height: '0',
                      borderTop: '6px solid transparent',
                      borderBottom: '6px solid transparent',
                      borderRight: '11px solid #c084fc',
                      opacity: 0.8,
                    }}
                  />
                  
                  {/* Edge Highlight */}
                  <div 
                    className="absolute"
                    style={{
                      top: '-4px',
                      right: '-9px',
                      width: '0',
                      height: '0',
                      borderTop: '4px solid transparent',
                      borderBottom: '4px solid transparent',
                      borderRight: '9px solid #ddd6fe',
                      opacity: 0.6,
                    }}
                  />
                  
                  {/* Inner Glow */}
                  <div 
                    className="absolute"
                    style={{
                      top: '-2px',
                      right: '-7px',
                      width: '0',
                      height: '0',
                      borderTop: '2px solid transparent',
                      borderBottom: '2px solid transparent',
                      borderRight: '7px solid #f3e8ff',
                      opacity: 0.4,
                    }}
                  />
                </div>
              </div>
            </>
          )}

          {/* Navigation Items with Fixed Icon Positioning */}
          <div className="space-y-4 relative z-10">
            {sidebarLinks.map((item, index) => {
              const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
              const isHovered = hoveredItem === item.route;
              
              return (
                <div key={item.label} className="relative">
                  <Link
                    href={item.route}
                    aria-current={isActive ? 'page' : undefined}
                    onMouseEnter={() => {
                      setHoveredItem(item.route);
                      setHoveredIndex(index);
                    }}
                    onMouseLeave={() => {
                      setHoveredItem(null);
                      setHoveredIndex(null);
                    }}
                    className={`
                      group relative flex items-center h-16 transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)
                      ${isOpen 
                        ? 'px-4 rounded-xl' 
                        : 'mx-2 rounded-xl justify-center'
                      }
                      ${isActive 
                        ? 'text-white' 
                        : 'text-slate-400 hover:text-white'
                      }
                    `}
                    style={{ 
                      transitionDelay: isOpen ? `${index * 15}ms` : '0ms'
                    }}
                  >
                    {/* Fixed Icon Container - Always Centered */}
                    <div className={`
                      relative flex items-center justify-center flex-shrink-0
                      ${isOpen ? '' : 'w-full'}
                    `}>
                      <div className={`
                        w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300
                        ${isActive 
                          ? 'bg-gradient-to-br from-purple-500/30 to-blue-500/30 ring-2 ring-purple-400/40' 
                          : 'group-hover:bg-slate-700/50'
                        }
                      `}>
                        <Image
                          src={item.imgURL}
                          alt=""
                          width={20}
                          height={20}
                          className={`
                            w-5 h-5 object-contain transition-all duration-300
                            ${isActive 
                              ? 'scale-110 brightness-125 saturate-110 drop-shadow-lg' 
                              : 'group-hover:scale-110 group-hover:brightness-110'
                            }
                          `}
                        />
                      </div>
                      
                      {/* Glow Effect */}
                      {isActive && (
                        <div className="absolute inset-0 bg-purple-400/30 rounded-lg blur-lg -z-10 animate-pulse" />
                      )}
                    </div>
                    
                    {/* Text Container - Only Visible When Open */}
                    {isOpen && (
                      <div className="flex-1 ml-4 overflow-hidden min-w-0">
                        <span className={`
                          block text-sm font-semibold whitespace-nowrap select-none
                          transition-all duration-350 cubic-bezier(0.4, 0, 0.2, 1)
                          opacity-100 translate-x-0 delay-75
                          ${isActive 
                            ? 'bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent' 
                            : ''
                          }
                        `}>
                          {item.label}
                        </span>
                        
                        {/* Animated Underline for Active */}
                        {isActive && (
                          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent mt-1 animate-pulse" />
                        )}
                      </div>
                    )}
                  </Link>

                  {/* Next-Gen Tooltips - Aligned to Icon Center */}
                  {!isOpen && isHovered && (
                    <div 
                      className="
                        absolute z-50
                        px-6 py-4 bg-gradient-to-br from-slate-800/95 via-slate-900/95 to-slate-800/95
                        backdrop-blur-xl text-white text-sm rounded-2xl
                        shadow-2xl shadow-black/60 border border-slate-600/40
                        animate-in fade-in slide-in-from-left duration-300 whitespace-nowrap
                        ring-1 ring-slate-500/20
                      "
                      style={{
                        left: `${iconSize}px`,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        marginLeft: '24px'
                      }}
                    >
                      <div className="font-semibold">{item.label}</div>
                      <div className="text-xs text-slate-400 mt-1">Navigate to {item.label.toLowerCase()}</div>
                      
                      {/* Enhanced 3D Triangle - Aligned to Icon Center */}
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-3"
                        style={{ left: '0px' }}
                      >
                        {/* Shadow Layer */}
                        <div 
                          className="absolute"
                          style={{
                            top: '1px',
                            left: '1px',
                            width: '24px',
                            height: '24px',
                            background: 'linear-gradient(135deg, #475569, #334155)',
                            transform: 'rotate(45deg)',
                            filter: 'blur(1px)',
                            opacity: 0.3,
                          }}
                        />
                        
                        {/* Main Triangle */}
                        <div 
                          className="relative"
                          style={{
                            width: '24px',
                            height: '24px',
                            background: 'linear-gradient(135deg, #64748b, #475569)',
                            transform: 'rotate(45deg)',
                            borderLeft: '1px solid #94a3b8',
                            borderBottom: '1px solid #334155',
                            borderRadius: '2px',
                            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                          }}
                        />
                        
                        {/* Highlight */}
                        <div 
                          className="absolute top-0 left-0"
                          style={{
                            width: '12px',
                            height: '12px',
                            background: 'linear-gradient(135deg, #94a3b8, #64748b)',
                            transform: 'rotate(45deg)',
                            borderRadius: '1px',
                            opacity: 0.6,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Active State Tooltip - Aligned to Icon Center */}
                  {!isOpen && isActive && (
                    <div 
                      className="
                        absolute z-50
                        px-6 py-4 bg-gradient-to-br from-slate-800/95 via-slate-900/95 to-slate-800/95
                        backdrop-blur-xl text-white text-sm rounded-2xl
                        shadow-2xl shadow-black/60 border border-slate-600/40
                        animate-in fade-in slide-in-from-left duration-300 whitespace-nowrap
                        ring-1 ring-slate-500/20
                      "
                      style={{
                        left: `${iconSize}px`,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        marginLeft: '24px'
                      }}
                    >
                      <div className="font-bold flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                        {item.label}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">Currently active</div>
                      
                      {/* Enhanced 3D Triangle - Aligned to Icon Center */}
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-3"
                        style={{ left: '0px' }}
                      >
                        {/* Shadow Layer */}
                        <div 
                          className="absolute"
                          style={{
                            top: '1px',
                            left: '1px',
                            width: '24px',
                            height: '24px',
                            background: 'linear-gradient(135deg, #475569, #334155)',
                            transform: 'rotate(45deg)',
                            filter: 'blur(1px)',
                            opacity: 0.3,
                          }}
                        />
                        
                        {/* Main Triangle */}
                        <div 
                          className="relative"
                          style={{
                            width: '24px',
                            height: '24px',
                            background: 'linear-gradient(135deg, #64748b, #475569)',
                            transform: 'rotate(45deg)',
                            borderLeft: '1px solid #94a3b8',
                            borderBottom: '1px solid #334155',
                            borderRadius: '2px',
                            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                          }}
                        />
                        
                        {/* Highlight */}
                        <div 
                          className="absolute top-0 left-0"
                          style={{
                            width: '12px',
                            height: '12px',
                            background: 'linear-gradient(135deg, #94a3b8, #64748b)',
                            transform: 'rotate(45deg)',
                            borderRadius: '1px',
                            opacity: 0.6,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Futuristic Footer */}
        <div className="p-4 border-t border-slate-700/20 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
          <div className="text-center">
            <div className="text-xs text-slate-500 font-medium">
              {isOpen ? 'Powered by Innovation' : '⚡'}
            </div>
          </div>
        </div>
      </aside>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes slide-in-from-left {
          from {
            opacity: 0;
            transform: translateX(-12px) translateY(-50%);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(-50%);
          }
        }
        
        .animate-in {
          animation: fade-in 0.3s ease-out, slide-in-from-left 0.3s ease-out;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        
        .bg-gradient-conic {
          background: conic-gradient(var(--tw-gradient-stops));
        }
      `}</style>
    </>
  );
}
