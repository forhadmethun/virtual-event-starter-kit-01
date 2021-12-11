/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getToken } from '@lib/getToken';
import { rolesList } from '@lib/hms/types';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

interface Props {
  roomId: string;
}

/**
 * Join form & Preview
 */
const Join: React.FC<Props> = ({ roomId }) => {
  const router = useRouter();
  const paramRole = router.query.role;
  const [token, setToken] = useState('');
  React.useEffect(() => {
    const tempRole = paramRole ? (paramRole as string) : 'viewer';
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
  }, [paramRole, roomId]);
  return (
    <div className="flex items-center justify-center h-full w-full">
      {token ? 'Join the Room' : 'Generating Token ...'}
    </div>
  );
};

export default Join;
