// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { getPageItem } from 'cms/notion';
import type { NextApiRequest, NextApiResponse } from 'next';

interface ImageSrc {
  cover: string;
  icon: PageObjectResponse['icon'];
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ImageSrc>) => {
  const { id } = req.query;

  if (!id) throw new Error('No id provided');

  const pageItem = await getPageItem(id.toString());

  // res.status(200).json({ name: 'John Doe' });
};

export default handler;
