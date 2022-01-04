import {
  selectDominantSpeaker,
  selectLocalPeer,
  selectPeersByRole,
  HMSPeer
} from '@100mslive/hms-video-store';
import { useHMSStore, useVideoList } from '@100mslive/react-sdk';
import React, { useEffect, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import VideoTile from './VideoTile';
import RoleChangeDialog from './request';
import EmptyRoom from './EmptyRoom';
import Pagination from './Pagination';

const VideoList = () => {
  const activeSpeakerThreshold = 1;
  const stagePeers = useHMSStore(selectPeersByRole('stage'));
  const inviteePeers = useHMSStore(selectPeersByRole('invitee'));
  const localPeer = useHMSStore(selectLocalPeer);
  const renderPeers = [...stagePeers, ...inviteePeers];
  const [activeSpeaker, setActiveSpeaker] = useState(localPeer);
  const dominantSpeaker = useHMSStore(selectDominantSpeaker);
  const isActiveSpeakerModeOn = activeSpeaker && renderPeers.length > activeSpeakerThreshold;
  /** here we are using peer filter function to change the activeSpeaker and sidebarPeers,
   * on first mount activeSpeaker points to the localPeer and on each update it points
   * to the dominantSpeaker
   */
  const peerFilter = (dominantSpeaker: HMSPeer) => {
    if (dominantSpeaker) {
      setActiveSpeaker(dominantSpeaker);
    }
  };

  useEffect(() => {
    if (dominantSpeaker) {
      peerFilter(dominantSpeaker);
    } else {
      if (localPeer.roleName === 'viewer' && stagePeers.length > 0) {
        setActiveSpeaker(stagePeers[0]);
      }
    }
  }, [dominantSpeaker, stagePeers]);
  return (
    <>
      <div
        className="w-full relative"
        style={{ height: 'calc((100vh - 3.2 * var(--header-height))' }}
      >
        {renderPeers.length > 0 ? (
          <>
            {isActiveSpeakerModeOn ? (
              <ActiveSpeaker allPeers={renderPeers} activePeer={activeSpeaker} />
            ) : (
              <NonActiveSpeakerView peers={renderPeers} />
            )}
          </>
        ) : (
          <EmptyRoom />
        )}
      </div>
      <RoleChangeDialog />
    </>
  );
};

export default VideoList;

const NonActiveSpeakerView: React.FC<{ peers: HMSPeer[] }> = ({ peers }) => {
  const { width = 0, height = 0, ref } = useResizeDetector();
  const { chunkedTracksWithPeer } = useVideoList({
    maxColCount: 2,
    maxRowCount: 2,
    maxTileCount: 4,
    width,
    height,
    peers,
    aspectRatio: {
      width: 1.8,
      height: 1
    }
  });
  return (
    <div ref={ref} className="w-full h-full flex flex-wrap place-content-center items-center">
      {chunkedTracksWithPeer &&
        chunkedTracksWithPeer.length > 0 &&
        chunkedTracksWithPeer[0].map((p, _) => (
          <VideoTile width={p.width} height={p.height} peer={p.peer} />
        ))}
    </div>
  );
};

const ActiveSpeaker: React.FC<{ activePeer: HMSPeer; allPeers: HMSPeer[] }> = ({
  allPeers,
  activePeer
}) => {
  return (
    <>
      <ActiveTile activePeer={activePeer} />
      <AllSpeakers allPeers={allPeers.filter(peer => peer.id !== activePeer.id)} />
    </>
  );
};

const ActiveTile: React.FC<{ activePeer: HMSPeer }> = ({ activePeer }) => {
  const { width = 0, height = 0, ref } = useResizeDetector();
  const { chunkedTracksWithPeer } = useVideoList({
    maxColCount: 1,
    maxRowCount: 1,
    maxTileCount: 1,
    width,
    height,
    peers: [activePeer],
    aspectRatio: {
      width: 1.8,
      height: 1
    }
  });
  return (
    <div
      ref={ref}
      className="flex justify-center"
      style={{
        height: 'calc((100vh - 3.2 * var(--header-height)) - var(--video-list-height))'
      }}
    >
      {chunkedTracksWithPeer &&
        chunkedTracksWithPeer.length > 0 &&
        chunkedTracksWithPeer[0].map((p, _) => (
          <VideoTile width={p.width} height={p.height} peer={p.peer} />
        ))}
    </div>
  );
};

const AllSpeakers: React.FC<{ allPeers: HMSPeer[] }> = ({ allPeers }) => {
  const { width = 0, height = 0, ref } = useResizeDetector();
  const { chunkedTracksWithPeer } = useVideoList({
    maxColCount: 5,
    maxRowCount: 1,
    maxTileCount: 5,
    width,
    height,
    peers: allPeers,
    aspectRatio: {
      width: 1.8,
      height: 1
    }
  });
  const [page, setPage] = React.useState(0);
  React.useEffect(() => {
    // currentPageIndex should not exceed pages length
    if (page > chunkedTracksWithPeer.length) {
      setPage(0);
    }
  }, [page, chunkedTracksWithPeer.length]);
  return (
    <div
      style={{
        height: 'var(--video-list-height)'
      }}
      ref={ref}
      className="relative w-full flex flex-wrap place-content-center items-center"
    >
      {chunkedTracksWithPeer &&
        chunkedTracksWithPeer.length > 0 &&
        chunkedTracksWithPeer[page < chunkedTracksWithPeer.length ? page : 0].map((p, _) => (
          <VideoTile width={p.width} height={p.height} peer={p.peer} />
        ))}
      {chunkedTracksWithPeer.length > 1 ? (
        <Pagination page={page} setPage={setPage} list={chunkedTracksWithPeer} />
      ) : null}
    </div>
  );
};