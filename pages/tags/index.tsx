import { getDatabaseItems } from 'cms/notion';
import CardList from 'components/card/CardList';
import TagList from 'components/card/tags/TagList';
import PageHead from 'components/common/PageHead';
import HeroSection from 'components/Intro/HeroSection';
import { GetStaticProps } from 'next';
import React from 'react';
import { CardData } from 'types/types';
import { getAlltags } from 'utils/getAllTags';
import { getCachedDatabaseItems } from 'utils/getCachedDatabaseItems';
import { parseDatabaseItems } from 'utils/parseDatabaseItems';
import { insertPreviewImage } from 'utils/previewImage';
import styles from './index.module.css';

interface TagIndexPageProps {
  data: Record<string, CardData[]>;
  allTags: CardData['tags'];
}

const TagIndexPage = ({ data, allTags }: TagIndexPageProps) => {
  return (
    <>
      <PageHead />
      <HeroSection />
      {allTags.map(({ id, name }) => (
        <section key={id} className={`${styles.tagIndex}`}>
          <aside className={`${styles.aside}`}>
            <div className={`${styles.tags}`}>
              <h2 className={`${styles.tagsTitle}`}>Tags</h2>
              <TagList tags={getAlltags(data[name])} />
            </div>
          </aside>
          <div className={`${styles.cardList}`}>
            <h3 className={`${styles.tagTitle}`}>#{name}</h3>

            <CardList data={data[name]} />
          </div>
        </section>
      ))}
    </>
  );
};

export default TagIndexPage;

export const getStaticProps: GetStaticProps<TagIndexPageProps> = async () => {
  const databaseId = process.env.DATABASE_ID;

  if (!databaseId) throw new Error('DATABASE_ID is not defined');

  const databaseItems = await getCachedDatabaseItems(databaseId);

  const parsedData = parseDatabaseItems(databaseItems);
  const dataWithPreview = await insertPreviewImage(parsedData);

  const allTags = getAlltags(parsedData);

  const dataByTag = allTags.reduce<Record<string, CardData[]>>(
    (acc, { name }) => {
      acc[name] = dataWithPreview
        .filter(({ tags }) => tags.findIndex((tag) => tag.name === name) !== -1)
        .slice(0, 3);
      return acc;
    },
    {}
  );

  return {
    props: {
      data: dataByTag,
      allTags,
    },
    revalidate: 60,
  };
};
