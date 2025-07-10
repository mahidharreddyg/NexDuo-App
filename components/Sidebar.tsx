'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { sidebarLinks } from '@/constants';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  width: number;
}

export default function Sidebar({ isOpen, setIsOpen, width }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`
        sidebar
        flex flex-col
        bg-gradient-to-br from-[#0a001f] via-[#41126A] to-[#000]
        backdrop-blur-xl border-r border-[#41126A]/50 shadow-2xl
        transition-width duration-300 ease-out
      `}
      style={{ width: isOpen ? width : 0, top: '48px' }}
    >
      <nav className="flex-1 overflow-y-auto mt-4 px-3 space-y-2">
        {sidebarLinks.map((item, idx) => {
          const active = pathname === item.route || pathname.startsWith(`${item.route}/`);
          return (
            <Link
              key={item.label}
              href={item.route}
              className={`
                group relative flex items-center gap-3 p-2 rounded-lg
                transition duration-300 ease-out
                ${active
                  ? 'bg-[#41126A]/60 text-purple-300 shadow-lg'
                  : 'text-gray-300 hover:bg-[#41126A]/30 hover:text-purple-200'}
              `}
              style={{ transitionDelay: `${idx * 60}ms` }}
            >
              <div className="relative w-6 h-6 flex-shrink-0">
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  width={20}
                  height={20}
                  className={active
                    ? 'scale-110 drop-shadow-[0_0_8px_rgba(192,132,252,0.9)] transition-transform duration-300'
                    : 'group-hover:scale-105 group-hover:drop-shadow-[0_0_6px_rgba(192,132,252,0.7)] transition-transform duration-300'}
                />
                <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-40
                  bg-gradient-to-r from-purple-600 to-purple-400 blur-lg transition-opacity duration-300"
                />
              </div>
              <span className="hidden lg:inline-block font-medium">{item.label}</span>
              <span className={`
                absolute left-4 bottom-1 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full
                transition-all duration-300 ease-out
                ${active ? 'w-6 opacity-100' : 'w-0 group-hover:w-6 group-hover:opacity-70'}
              `}/>
            </Link>
          );
        })}
      </nav>

      <div className="flex-none p-3 border-t border-[#41126A]/50 bg-gradient-to-t from-[#000] to-transparent">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
          className="
            w-9 h-9 flex items-center justify-center
            bg-gradient-to-br from-[#41126A] to-[#130122]
            text-white rounded-full shadow-lg
            transition transform duration-200 ease-out
            hover:scale-105 hover:brightness-110
          "
        >
          <span className="text-lg">{isOpen ? '←' : '→'}</span>
        </button>
      </div>

      <style jsx>{`
        .sidebar {
          position: fixed;
          left: 0;
          bottom: 0;
          height: calc(100vh - 48px);
        }
      `}</style>
    </aside>
  );
}
