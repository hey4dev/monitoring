import { randomBoolean } from '@/lib/response';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<Boolean>) {
    const result = randomBoolean;
    res.status(200).send(result);
}
