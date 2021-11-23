import { selectPeersByRole } from '@100mslive/hms-video-store';
import { useHMSStore } from '@100mslive/react-sdk';
import s from './participant.module.css';
import React from 'react';
import Avatar from '../avatar';
import Dropdown from './dropdown';

const Participants = () => {
  const stagePeers = useHMSStore(selectPeersByRole('stage'));
  const inviteePeers = useHMSStore(selectPeersByRole('invitee'));
  const viewerPeers = useHMSStore(selectPeersByRole('viewer'));
  return (
    <div className={s['part-ctx']}>
      {stagePeers.length > 0 ? (
        <div>
          <p className={s['part-role']}>Stage ({stagePeers.length})</p>
          {stagePeers.map(p => (
            <div key={p.id} className={s['part-box']}>
              <Avatar name={p.name} />
              <div className={s['part-name']}>{p.name}</div>
              <Dropdown role={p.roleName || 'viewer'} id={p.id} />
            </div>
          ))}
        </div>
      ) : null}
      <div className={s['divider']} />

      {inviteePeers.length > 0 ? (
        <div>
          <p className={s['part-role']}>Invitee ({inviteePeers.length})</p>
          {inviteePeers.map(p => (
            <div key={p.id} className={s['part-box']}>
              <Avatar name={p.name} />
              <div className={s['part-name']}>{p.name}</div>
              <Dropdown id={p.id} role={p.roleName || 'viewer'} />
            </div>
          ))}
        </div>
      ) : null}

      {viewerPeers.length > 0 ? (
        <div>
          <p className={s['part-role']}>Viewers ({viewerPeers.length})</p>
          {viewerPeers.map(p => (
            <div key={p.id} className={s['part-box']}>
              <Avatar name={p.name} />
              <div className={s['part-name']}>{p.name}</div>
              <Dropdown role={p.roleName || 'viewer'} id={p.id} />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Participants;