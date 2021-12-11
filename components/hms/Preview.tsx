import {
  HMSPeer,
  selectIsPeerAudioEnabled,
  selectIsPeerVideoEnabled,
  selectVideoTrackByPeerID
} from '@100mslive/hms-video-store';
import { useHMSActions, useHMSStore } from '@100mslive/react-sdk';
import React, { useRef, useEffect } from 'react';
import { MicOffIcon, MicOnIcon, VideoOffIcon, VideoOnIcon } from '@100mslive/react-icons';
import Avatar from './Avatar';
import cn from 'classnames';

interface Props {
  peer: HMSPeer;
}

const Preview: React.FC<Props> = ({ peer }) => {
  const actions = useHMSActions();
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoTrack = useHMSStore(selectVideoTrackByPeerID(peer.id));
  useEffect(() => {
    if (videoRef.current && videoTrack) {
      if (videoTrack.enabled) {
        actions.attachVideo(videoTrack.id, videoRef.current);
      } else {
        actions.detachVideo(videoTrack.id, videoRef.current);
      }
    }
  }, [videoTrack, actions]);
  const isAudioOn = useHMSStore(selectIsPeerAudioEnabled(peer.id));
  const isVideoOn = useHMSStore(selectIsPeerVideoEnabled(peer.id));
  return (
    <div className="w-[290px] h-[290px] relative flex justify-center items-center">
      <div className="preview-controls space-x-2">
        <ControlButton active={isAudioOn} onClick={() => actions.setLocalAudioEnabled(!isAudioOn)}>
          {isAudioOn ? <MicOnIcon /> : <MicOffIcon />}
        </ControlButton>
        <ControlButton active={isVideoOn} onClick={() => actions.setLocalVideoEnabled(!isVideoOn)}>
          {isVideoOn ? <VideoOnIcon /> : <VideoOffIcon />}
        </ControlButton>
      </div>
      <div className="bottom-overlay" />
      {isVideoOn ? (
        <video
          autoPlay
          muted
          playsInline
          ref={videoRef}
          className="object-cover w-full h-full rounded-2xl mirror"
        />
      ) : (
        <Avatar name={peer.name} />
      )}
    </div>
  );
};

export default Preview;

interface ControlButtonProps {
  active: boolean;
}

const ControlButton: React.FC<ControlButtonProps & JSX.IntrinsicElements['button']> = ({
  active,
  children,
  ...props
}) => {
  const base = `flex justify-content items-center p-1 rounded-lg`;
  const activeClass = !active ? 'bg-foreground text-gray-800' : 'text-foreground bg-transparent';
  return (
    <button className={cn(base, activeClass)} {...props}>
      {children}
    </button>
  );
};
