import { ArrowRightIcon } from '@100mslive/react-icons';
import { usePreview } from '@100mslive/react-sdk';
import InfoIcon from '@components/icons/icon-info';
import React from 'react';
import Button from './Button';
import Loading from './Loading';
import Preview from './Preview';

interface Props {
  token: string;
}

const SpeakerJoin: React.FC<Props> = ({ token }) => {
  const { localPeer, audioEnabled, videoEnabled } = usePreview(token, 'preview');
  return (
    <div className="flex md:flex-row flex-col items-center p-8 md:space-x-12 space-y-4 md:space-y-0 rounded-2xl bg-gray-700">
      {localPeer ? (
        <Preview peer={localPeer} />
      ) : (
        <div className="w-[290px] h-[290px] flex justify-center items-center">
          <Loading size={90} />
        </div>
      )}
      <div className="w-[330px] flex flex-col justify-between md:h-full md:text-left text-center">
        <div>
          <h2>Welcome David</h2>
          <p className="text-gray-300 my-0 ">
            Preview your video and audio before joining the stage
          </p>
        </div>
        <div>
          <div className="flex items-center md:justify-start justify-center space-x-2">
            <InfoIcon />
            <p className="text-gray-200">
              Note: Your mic is {audioEnabled ? 'on' : 'off'} and video is{' '}
              {videoEnabled ? 'on' : 'off'}
            </p>
          </div>
          <div className="flex space-x-4">
            <Button variant="secondary">Go Back</Button>
            <Button>
              Join Stage <ArrowRightIcon className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakerJoin;
