import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';

export const propertyTable = {
  Public: 'Public',
  Published: 'Published',
};

// Initializing a client
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getDatabaseItems = async (databaseId: string) => {
  const databaseItems = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: propertyTable.Public,
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: propertyTable.Published,
        direction: 'descending', //내림차순
      },
    ],
  });

  return databaseItems.results; //results를 써주는게 중요
};

export const reactNotionApi = new NotionAPI();

export const getPageContent = async (pageId: string) => {
  const recordMap = await reactNotionApi.getPage(pageId);

  return recordMap;
};
