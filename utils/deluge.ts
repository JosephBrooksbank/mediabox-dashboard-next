import axios from "axios";

const deluge = (method: string, params: any[]) => {
   return axios.post('/api/deluge', {
       method,
       params,
       id: 1
   }, {withCredentials: true});
}

export const updateUi = () => {
    return deluge(

            "web.update_ui",
            [
                [
                    "queue",
                    "name",
                    "total_wanted",
                    "state",
                    "progress",
                    "num_seeds",
                    "total_seeds",
                    "num_peers",
                    "total_peers",
                    "download_payload_rate",
                    "upload_payload_rate",
                    "eta",
                    "ratio",
                    "distributed_copies",
                    "is_auto_managed",
                    "time_added",
                    "tracker_host",
                    "download_location",
                    "last_seen_complete",
                    "total_done",
                    "total_uploaded",
                    "max_download_speed",
                    "max_upload_speed",
                    "seeds_peers_ratio",
                    "total_remaining",
                    "completed_time",
                    "time_since_transfer",
                    "label"
                ],
                {}
            ]
    )
}

export const login = async () => {

    const res = await axios.post(`${process.env.DELUGE_URL}`  , {
        method: 'auth.login',
        params: ['deluge'],
        id: 1
    }, {withCredentials: true});

   if (res.status == 200) {
       const cookie = res.headers && res.headers['set-cookie'] as string[];

       // Grab cookie and change the path to be equal to our proxy - We need to proxy it like this because CORS is annoying
       // and there is currently no way to change the accepted domains on deluge's end.
       const parsed = cookie[0].split('Path=');
       parsed[1] = '/api/deluge';
       cookie[0] = parsed.join('Path=');

       return cookie;
   } else return [''];
}
export const serverSideDeluge = async (method: string, params: string[], cookie: string[]) => {
      return axios.post(`${process.env.DELUGE_URL}`  , {
        method,
        params,
        id: 1
    }, {withCredentials: true, headers: { Cookie: cookie}});

}

export default deluge;