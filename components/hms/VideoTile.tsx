import { MicOffIcon } from '@100mslive/react-icons';
import {
  useHMSStore,
  HMSPeer,
  useAudioLevelStyles,
  selectIsPeerAudioEnabled,
  selectIsPeerVideoEnabled,
  useVideo,
  HMSTrackID,
  selectPeerByID,
  selectTrackByID
} from '@100mslive/react-sdk';
import React, { useCallback, useRef } from 'react';
import Avatar from './Avatar';
import { hmsConfig } from './config';

interface Props {
  trackId: HMSTrackID;
  width: number;
  height: number;
}

const VideoTile: React.FC<Props> = ({ width, height, trackId }) => {
  const track = useHMSStore(selectTrackByID(trackId));
  const peer = useHMSStore(selectPeerByID(track?.peerId));
  const isVideoEnabled = useHMSStore(selectIsPeerVideoEnabled(peer?.id));
  const isAudioEnabled = useHMSStore(selectIsPeerAudioEnabled(peer?.id));
  return (
    <div className="p-2 relative" style={{ width, height }}>
      {peer ? (
        <div className="w-full h-full relative rounded-lg flex justify-center items-center">
          <AudioLevel audioTrack={peer.audioTrack} />
          {isVideoEnabled ? (
            <>{height > 300 ? <HmsWatermark /> : null}</>
          ) : (
            <Avatar size={width < 400 ? 'lg' : 'xl'} className="absolute z-40" name={peer.name} />
          )}
          <PeerName name={peer?.name} />
          {peer.videoTrack ? <Video mirror={peer.isLocal} id={peer.videoTrack} /> : null}
          {isAudioEnabled ? null : <AudioIndicator />}
        </div>
      ) : null}
    </div>
  );
};

export default VideoTile;

const Video: React.FC<{ id: string; mirror: boolean }> = ({ id, mirror }) => {
  const ref = useVideo(id);
  return (
    <video
      className={`bg-gray-base border-solid border-transparent w-full h-full rounded-lg object-cover  ${
        mirror ? 'mirror' : ''
      }`}
      ref={ref}
      autoPlay
      muted
      playsInline
    />
  );
};

const AudioIndicator = () => {
  return (
    <div className="absolute right-2 bottom-2 p-1 flex items-center justify-center rounded-full bg-red-500">
      <MicOffIcon />
    </div>
  );
};

const PeerName: React.FC<{ name: string }> = ({ name }) => {
  return (
    <span
      style={{ textShadow: 'black 1px 0 10px' }}
      className="absolute bottom-3 left-3 z-40 text-sm"
    >
      {name}
    </span>
  );
};

const HmsWatermark = () => {
  return <img src="/hms-coachmark.svg" className="absolute right-6 top-6 z-30" />;
};

export const AudioLevel: React.FC<{ audioTrack: HMSPeer['audioTrack'] }> = ({ audioTrack }) => {
  const getStyle = useCallback((level: number) => {
    const style: Record<string, string> = {
      border: `3px solid ${level > 0 ? hmsConfig.audioLevelColor : 'transparent'}`
      // transition: 'border 0.4s ease-in-out'
    };
    return style;
  }, []);
  const ref = useRef(null);
  useAudioLevelStyles({
    trackId: audioTrack,
    getStyle,
    ref
  });
  return <div className="w-full h-full absolute left-0 top-0 rounded-lg z-20" ref={ref} />;
};
