import Checkbox from "./Checkbox";
import { useState } from "react";

export interface ITorrent {
    ratio: number
    total_peers: number
    tracker_host: string
    time_since_transfer: number
    download_location: string
    total_seeds: number
    eta: number
    queue: number
    num_seeds: number
    is_auto_managed: boolean
    download_payload_rate: number
    total_uploaded: number
    time_added: number
    max_upload_speed: number
    total_remaining: number
    total_wanted: number,
    progress: number,
    max_download_speed: number,
    distributed_copies: number,
    upload_payload_rate: number,
    num_peers: number,
    seeds_peers_ratio: number,
    total_done: number,
    last_seen_complete: number,
    completed_time: number,
    name: string,
    // TODO check the last two are correct
    state: "Seeding" | "Queued" | "Waiting" | "Downloading",
    label: "tv-sonarr" | "radarr" | "prowlarr" | null
}

interface ITorrentCardProps {
    torrents: ITorrent[]
}

const ProgressBar = ( { progress }: { progress: number } ) => {
    return <div className={"bg-gray-500 w-40 rounded-full h-5 dark:bg-gray-700 table-cell"}>
        <div className={`bg-blue-600 h-5 rounded-full`} style={{ width: `${progress}%` }}></div>
    </div>
}

const TorrentRow = ( { torrent }: { torrent: ITorrent } ) => {
    return <div
        className={"flex justify-between overflow-hidden bg-slate-600 rounded-xl border-slate-700 m-5 p-2 shadow-lg"}>
        <div className={"w-1/3 whitespace-nowrap overflow-y-hidden scrollbar-hide"}>
            {torrent.name}
        </div>
        <ProgressBar progress={torrent.progress}/>
        <span className={""}>
           {torrent.state}
       </span>
    </div>
}

export const TorrentCard = ( { torrents }: ITorrentCardProps ) => {

    const [showSeeding, setShowSeeding] = useState(false);
    const [showQueued, setShowQueued] = useState(false);
    return (
        <>
                <div className={"border border-slate-500 rounded-2xl shadow-lg overflow-x-scroll h-80 scrollbar-hide"}>
                    <div>
                        <h1 className={"text-xl pl-5 mt-2"}>
                            Torrent Settings
                        </h1>
                        <div className={'mx-5 my-2 flex'}>
                            <Checkbox label={"Show Seeding"} checked={showSeeding} setChecked={setShowSeeding}/>
                            <Checkbox label={"Show Queued"} checked={showQueued} setChecked={setShowQueued}/>
                        </div>
                    </div>
                    {Object.values( torrents ).map( ( tor ) => {

                        if (tor.state == "Seeding" && !showSeeding) {
                            return;
                        }
                        if (tor.state == "Queued" && !showQueued) {
                            return;
                        }
                        return <TorrentRow torrent={tor} key={tor.name}/>;
                    } )}
                </div>
        </>
    )
}