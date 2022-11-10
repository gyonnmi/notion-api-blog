import { Client } from '@notionhq/client';

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
