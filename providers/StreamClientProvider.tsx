'use client';

import { ReactNode, useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';

import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';

const API_KEY = 'tr4g984uqdpp';
console.log('Hardcoded API Key:', API_KEY);

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    console.log('Hardcoded API Key:', API_KEY); 
    console.log('Effect triggered - User:', user, 'IsLoaded:', isLoaded);

    if (!isLoaded) {
      console.log('Clerk user not loaded yet.');
      return;
    }

    if (!user) {
      console.log('No user data available.');
      return;
    }

    if (!API_KEY) {
      console.error('Stream API key is missing. Check environment variables.');
      return;
    }

    try {
      console.log('Initializing StreamVideoClient...');
      const client = new StreamVideoClient({
        apiKey: API_KEY,
        user: {
          id: user?.id,
          name: user?.username || user?.id,
          image: user?.imageUrl,
        },
        tokenProvider,
      });

      console.log('StreamVideoClient successfully initialized:', client);
      setVideoClient(client);
    } catch (error) {
      console.error('Error initializing StreamVideoClient:', error);
    }
  }, [user, isLoaded]);

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
