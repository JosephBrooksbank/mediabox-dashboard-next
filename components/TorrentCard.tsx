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

export const TorrentCard = ( { torrents }: ITorrentCardProps ) => {
    return (
        <>
            <div className={"border border-black rounded p-2 m-3"}>
                Torrent Data
                {Object.values( torrents ).map( ( tor ) => <div key={tor.name}>
                    <pre>{JSON.stringify( tor )}</pre>
                </div> )}
            </div>
        </>
    )
}