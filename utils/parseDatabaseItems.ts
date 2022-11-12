import { getDatabaseItems } from '../cms/notion';
import { cardData } from '../types/types';

export const parseDatabaseItems = (
  databaseItems: Awaited<ReturnType<typeof getDatabaseItems>>
) =>
  databaseItems.reduce<cardData[]>((acc, item) => {
    if (!('properties' in item)) return acc;

    console.log(item.properties);
    const { Description, Published, Tags, 이름 } = item.properties;

    const cover =
      item.cover?.type === 'external'
        ? item.cover.external.url
        : item.cover?.file
        ? item.cover.file.url
        : '';

    const title = 이름?.type === 'title' ? 이름.title[0].plain_text : '';

    const description =
      Description?.type === 'rich_text'
        ? Description.rich_text[0].plain_text
        : '';

    const published =
      // 옵셔널 체이닝, start가 없을 경우 date를 undefind로 반환
      Published?.type === 'date' ? Published.date?.start ?? '' : '';

    acc.push({
      id: item.id,
      cover,
      title,
      description,
      published,
      icon: item.icon,
      tags: Tags,
    });

    return acc;
  }, []); // 새로운 배열을 만들기 위해
