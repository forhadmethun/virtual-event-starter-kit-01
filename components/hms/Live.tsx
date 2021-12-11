import React from 'react';

interface Props {
  roomId: string;
}

/**
 * Entrypoint for Joining the Live Conference
 */
const Live: React.FC<Props> = ({ roomId }) => {
  return <div>100ms Live {roomId}</div>;
};

export default Live;
