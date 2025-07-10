'use client';
import { useState } from 'react';
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { useRouter, useSearchParams } from 'next/navigation';
import { Users, LayoutList } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Loader from './Loader';
import EndCallButton from './EndCallButton';

// No cn import needed

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');
  const router = useRouter();
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();

  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="meetingroom-section">
      <div className="meetingroom-main">
        <div className="meetingroom-video">
          <CallLayout />
        </div>
        <div
          className={`meetingroom-participants${showParticipants ? ' show' : ''}`}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      {/* video layout and call controls */}
      <div className="meetingroom-controls">
        <CallControls onLeave={() => router.push(`/`)} />
        <DropdownMenu>
          <div className="meetingroom-dropdown-trigger">
            <DropdownMenuTrigger className="meetingroom-dropdown-btn">
              <LayoutList size={20} className="meetingroom-dropdown-icon" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="meetingroom-dropdown-content">
            {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() =>
                    setLayout(item.toLowerCase() as CallLayoutType)
                  }
                  className="meetingroom-dropdown-item"
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="meetingroom-dropdown-separator" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="meetingroom-users-btn">
            <Users size={20} className="meetingroom-users-icon" />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
      <style jsx>{`
        .meetingroom-section {
          position: relative;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          padding-top: 1rem;
          color: #fff;
          background: linear-gradient(to bottom, #1e293b 0%, #0f172a 100%);
        }
        .meetingroom-main {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: calc(100vh - 100px);
        }
        .meetingroom-video {
          flex: 1;
          max-width: 1000px;
          background: rgba(30, 41, 59, 0.9);
          border-radius: 16px;
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 16px rgba(30, 41, 59, 0.15);
        }
        .meetingroom-participants {
          display: none;
          margin-left: 0.5rem;
          background: #1e293b;
          border-radius: 12px;
          padding: 1rem;
          box-shadow: 0 2px 8px rgba(30, 41, 59, 0.15);
          height: calc(100vh - 220px);
        }
        .meetingroom-participants.show {
          display: block;
        }
        .meetingroom-controls {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
          background: rgba(15, 23, 42, 0.8);
          padding: 0.75rem 1rem;
          box-shadow: 0 -2px 16px rgba(15, 23, 42, 0.15);
          z-index: 10;
        }
        .meetingroom-dropdown-trigger {
          display: flex;
          align-items: center;
        }
        .meetingroom-dropdown-btn {
          cursor: pointer;
          border-radius: 16px;
          background: linear-gradient(90deg, #1e293b 0%, #334155 100%);
          padding: 0.5rem 1rem;
          transition: background 0.2s;
          box-shadow: 0 2px 8px rgba(30, 41, 59, 0.12);
        }
        .meetingroom-dropdown-btn:hover {
          background: linear-gradient(90deg, #334155 0%, #1e293b 100%);
        }
        .meetingroom-dropdown-content {
          border-radius: 12px;
          background: #1e293b;
          color: #fff;
          box-shadow: 0 2px 16px rgba(30, 41, 59, 0.15);
        }
        .meetingroom-dropdown-item {
          border-radius: 8px;
          padding: 0.5rem 1rem;
          transition: background 0.2s;
        }
        .meetingroom-dropdown-item:hover {
          background: #334155;
        }
        .meetingroom-dropdown-separator {
          border-color: #334155;
        }
        .meetingroom-users-btn {
          cursor: pointer;
          border-radius: 16px;
          background: linear-gradient(90deg, #1e293b 0%, #334155 100%);
          padding: 0.5rem 1rem;
          transition: background 0.2s;
          box-shadow: 0 2px 8px rgba(30, 41, 59, 0.12);
        }
        .meetingroom-users-btn:hover {
          background: linear-gradient(90deg, #334155 0%, #1e293b 100%);
        }
        .meetingroom-users-icon {
          color: #fff;
        }
        @media (max-width: 900px) {
          .meetingroom-main {
            flex-direction: column;
            height: auto;
          }
          .meetingroom-video {
            max-width: 100%;
            padding: 0.5rem;
          }
        }
        @media (max-width: 600px) {
          .meetingroom-section {
            padding-top: 0.5rem;
          }
          .meetingroom-controls {
            gap: 0.5rem;
            padding: 0.5rem 0.25rem;
          }
        }
      `}</style>
    </section>
  );
};

export default MeetingRoom;