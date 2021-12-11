/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getToken } from '@lib/getToken';
import { rolesList } from '@lib/hms/types';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import ViewerJoin from './ViewerJoin';
import SpeakerJoin from './SpeakerJoin';

interface Props {
  roomId: string;
}

/**
 * Join form & Preview
 */
const Join: React.FC<Props> = ({ roomId }) => {
  const [token, setToken] = useState('');
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    const tempRole = (router.query.role as string) || 'viewer';
    // @ts-ignore
    if (rolesList.includes(tempRole)) {
      // @ts-ignore
      getToken(tempRole, roomId)
        .then(t => setToken(t))
        .catch(e => {
          throw new Error(e);
        });
    } else {
      throw new Error(`Invalid Role join with the following: ${rolesList.join(', ')}`);
    }
  }, [router.isReady, router.query.role, roomId]);
  return (
    <div className="flex flex-col items-center justify-center h-full w-full space-y-4">
      {token ? (
        router.query.role === 'stage' || router.query.role === 'backstage' ? (
          <SpeakerJoin token={token} />
        ) : (
          <ViewerJoin />
        )
      ) : (
        'Generating Token ...'
      )}
    </div>
  );
};

export default Join;
