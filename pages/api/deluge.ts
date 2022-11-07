// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";

type Data = {
    method: string
    params: string[]
    id?: number

}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    console.log( req.body );
    const delugeResponse = await axios.post(
        `${process.env.DELUGE_URL}:${process.env.DELUGE_PORT}/json`,
        req.body,
        { withCredentials: true, headers: req.headers } );

    res.status( delugeResponse.status ).json( delugeResponse.data )
}

