'use client';
import { useEffect, useState } from 'react';
import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';

import Alert from './Alert';
import { Button } from './ui/button';

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  const call = useCall();

  if (!call) {
    throw new Error(
      'useStreamCall must be used within a StreamCall component.',
    );
  }

  const [isMicCamToggled, setIsMicCamToggled] = useState(false);

  useEffect(() => {
    if (isMicCamToggled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggled, call.camera, call.microphone]);

  if (callTimeNotArrived)
    return (
      <Alert
        title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
      />
    );

  if (callHasEnded)
    return (
      <Alert
        title="The call has been ended by the host"
        iconUrl="/icons/call-ended.svg"
      />
    );

  return (
    <div className="meetingsetup-container">
      <h1 className="meetingsetup-title">Setup</h1>
      <VideoPreview />
      <div className="meetingsetup-controls">
        <label className="meetingsetup-checkbox-label">
          <input
            type="checkbox"
            checked={isMicCamToggled}
            onChange={(e) => setIsMicCamToggled(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="meetingsetup-btn"
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
      >
        Join meeting
      </Button>
      <style jsx>{`
        .meetingsetup-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          height: 100vh;
          width: 100%;
          color: #fff;
        }
        .meetingsetup-title {
          text-align: center;
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }
        .meetingsetup-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          height: 4rem;
        }
        .meetingsetup-checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 500;
        }
        .meetingsetup-btn {
          background: linear-gradient(90deg, #22c55e 0%, #166534 100%) !important;
          color: #fff !important;
          border-radius: 8px !important;
          padding: 0.75rem 1.5rem !important;
          font-weight: 600;
          font-size: 1rem;
          margin-top: 1rem;
        }
        @media (max-width: 600px) {
          .meetingsetup-title {
            font-size: 1.25rem;
          }
          .meetingsetup-btn {
            font-size: 0.95rem;
            padding: 0.5rem 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MeetingSetup;
