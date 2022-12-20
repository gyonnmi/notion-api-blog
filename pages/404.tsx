import CardItem from 'components/card/CardItem';
import CardList from 'components/card/CardList';
import { GetStaticProps } from 'next';
import React from 'react';
import { CardData } from 'types/types';
import { getCachedDatabaseItems } from 'utils/getCachedDatabaseItems';
import { parseDatabaseItems } from 'utils/parseDatabaseItems';
import { insertPreviewImage } from 'utils/previewImage';
import styles from './404.module.css';

interface NotFoundPageProps {
  data: CardData;
}

const NotFoundPage = ({ data }: NotFoundPageProps) => {
  return (
    <section>
      <div className={`${styles.wrap}`}>
        <div className={`${styles.contentWrap}`}>
          <h1 className={`${styles.mainTitle}`}>404 Not Found!</h1>
          <h2 className={`${styles.subTitle}`}>저런! 막다른 길이네요!</h2>
          <p className={`${styles.text}`}>대신 이런 글은 어떠세요?</p>
        </div>
        <CardItem data={data} />
      </div>
    </section>
  );
};

export default NotFoundPage;

export const getStaticProps: GetStaticProps<NotFoundPageProps> = async () => {
  const databaseId = process.env.DATABASE_ID;

  if (!databaseId) throw new Error('DATABASE_ID is not defined');

  const databaseItems = await getCachedDatabaseItems(databaseId);

  const parsedData = parseDatabaseItems(databaseItems);

  const dataWithPreview = await insertPreviewImage(parsedData);

  return {
    props: {
      data: dataWithPreview[0],
    },
    revalidate: 60,
  };
};
