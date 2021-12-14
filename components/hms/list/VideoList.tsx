import { useHMSStore, useVideoList } from "@100mslive/react-sdk"
import React from "react"
import { useResizeDetector } from "react-resize-detector"
import VideoTile from "./VideoTile"
import s from "./index.module.css"
import { selectPeersByRole, selectLocalPeer } from "@100mslive/hms-video-store"
import RoleChangeDialog from "../request"
import InviteIcon from "@components/icons/icon-invite"
import { PersonIcon } from "@100mslive/react-icons"

const VideoList = () => {
    const stagePeers = useHMSStore(selectPeersByRole("stage"))

    const inviteePeers = useHMSStore(selectPeersByRole("invitee"))
    const { width = 0, height = 0, ref } = useResizeDetector()
    const renderPeers = [...stagePeers, ...inviteePeers]
    const { chunkedTracksWithPeer } = useVideoList({
        maxColCount: 2,
        maxRowCount: 2,
        maxTileCount: 4,
        width,
        height,
        showScreenFn: () => false,
        overflow: "scroll-x",
        peers: renderPeers,
        aspectRatio: {
            width: 1.8,
            height: 1,
        },
    })
    const [page, setPage] = React.useState(0)
    const disableLeft =
        chunkedTracksWithPeer.length - page === chunkedTracksWithPeer.length
    const disableRight = chunkedTracksWithPeer.length - page === 1
    const pageProp = {}
    const nextPage = () => {
        // last
        if (page === chunkedTracksWithPeer.length - 1) {
            setPage(chunkedTracksWithPeer.length - 1)
        } else {
            setPage(page + 1)
        }
    }
    const prevPage = () => {
        // prev
        if (page === 0) {
            setPage(0)
        } else {
            setPage(page - 1)
        }
    }
    console.log("chunkedTracksWithPeer", chunkedTracksWithPeer)
    return (
        <div
            ref={ref}
            style={{ width: "100%", position: "relative", padding: "0 1rem" }}
        >
            <RoleChangeDialog />
            {chunkedTracksWithPeer && chunkedTracksWithPeer.length > 0 ? (
                <div className={s["video-list"]}>
                    {chunkedTracksWithPeer[page].map((trackPeer, _) => (
                        <VideoTile
                            key={
                                trackPeer.track
                                    ? trackPeer.track.id
                                    : trackPeer.peer.id
                            }
                            peer={trackPeer.peer}
                            width={trackPeer.width}
                            height={trackPeer.height}
                        />
                    ))}
                </div>
            ) : (
                <div className={s["empty-room"]}>
                    <h2>No Speakers Present</h2>
                    <p>
                        Looks like nobody has joined as a speaker. Invite
                        someone to speak or change your role.
                    </p>
                    <div className={s["empty-room-buttons"]}>
                        <button
                            style={{ backgroundColor: "#323332" }}
                            className={s["empty-room-button"]}
                        >
                            <InviteIcon></InviteIcon>

                            <p>Invite</p>
                        </button>
                        <button
                            style={{ backgroundColor: "#702EC2" }}
                            className={s["empty-room-button"]}
                        >
                            <PersonIcon
                                fill="#ffffff"
                                stroke="#ffffff"
                            ></PersonIcon>
                            <p>Change Role</p>
                        </button>
                    </div>
                    <p className={s["empty-room-small"]}>
                        You can also invite a guest to the stage.
                        <span style={{ color: "#702EC2" }}>
                            {" "}
                            Learn how {"->"}
                        </span>
                    </p>
                </div>
            )}
            {chunkedTracksWithPeer.length > 1 ? (
                <div className={s["pagin-ctx"]}>
                    <button onClick={prevPage} disabled={disableLeft}>
                        <ChevronLeft />
                    </button>
                    {chunkedTracksWithPeer.map((_, i: number) => (
                        <div
                            className={`${s["pagin-btn"]} ${
                                i === page ? s["pagin-active"] : null
                            }`}
                            onClick={() => setPage(i)}
                        />
                    ))}
                    <button onClick={nextPage} disabled={disableRight}>
                        <ChevronRight />
                    </button>
                </div>
            ) : null}
        </div>
    )
}

export default VideoList

const ChevronLeft = () => (
    <svg
        width={14}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        shapeRendering="geometricPrecision"
        color="white"
        className="cursor-pointer"
    >
        <path d="M15 18l-6-6 6-6" />
    </svg>
)

const ChevronRight = () => (
    <svg
        width={14}
        height={14}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        shapeRendering="geometricPrecision"
        color="white"
        className="cursor-pointer"
    >
        <path d="M9 18l6-6-6-6" />
    </svg>
)