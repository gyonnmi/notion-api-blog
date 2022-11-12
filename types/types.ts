import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export interface cardData {
  id: string;
  cover: string;
  title: string;
  description: string;
  published: string;
  icon: PageObjectResponse['icon'];
  tags: string[];
}
