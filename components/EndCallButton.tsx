'use client';

import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();

  if (!call)
    throw new Error(
      'useStreamCall must be used within a StreamCall component.',
    );

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  const endCall = async () => {
    await call.endCall();
    router.push('/');
  };

  return (
    <>
      <Button onClick={endCall} className="endcall-btn">
      End call for everyone
    </Button>
      <style jsx>{`
        .endcall-btn {
          background: linear-gradient(90deg, #ef4444 0%, #b91c1c 100%) !important;
          color: #fff !important;
          padding: 0.5rem 1.5rem !important;
          border-radius: 8px !important;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(239, 68, 68, 0.15);
          transition: background 0.2s;
        }
        .endcall-btn:hover {
          background: linear-gradient(90deg, #dc2626 0%, #991b1b 100%) !important;
        }
      `}</style>
    </>
  );
};

export default EndCallButton;
