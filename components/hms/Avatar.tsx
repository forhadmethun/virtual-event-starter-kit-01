import { getAvatarBg } from '@lib/hms/getAvatarBg';
import React from 'react';

interface Props {
  name: string;
}

const Avatar: React.FC<Props> = ({ name }) => {
  const { initials, color } = getAvatarBg(name);
  return (
    <div
      className="flex justify-center items-center font-bold object-cover w-16 h-16 mr-2 rounded-full text-white"
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
};

export default Avatar;
