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
    <Button 
  onClick={endCall} 
  className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-4 py-2 rounded shadow-lg">
      End call for everyone
    </Button>
  );
};

export default EndCallButton;
