import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { CardData } from 'types/types';
import { getDatabaseItems } from '../cms/notion';
import CardList from '../components/card/CardList';
import PageHead from '../components/common/PageHead';
import HeroSection from '../components/Intro/HeroSection';
import styles from '../styles/Home.module.css';
import { parseDatabaseItems } from '../utils/parseDatabaseItems';

interface HomeProps {
  data: CardData[];
}

export default function Home({ data }: HomeProps) {
  return (
    <>
      {/* <PageHead /> */}
      <Head>
        <title>Rizy's devlog ٩(๑′∀ ‵๑)۶•*¨*•.¸¸♪</title>
        <meta name="description" content="프론트엔드 주니어 개발자🐣" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeroSection />

      <section className="m-4 min-h-[50vh] gap-8 px-4">
        <CardList data={data} />
      </section>
    </>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const databaseId = process.env.DATABASE_ID;

  // databaseId가 undefind일 경우
  if (!databaseId) throw new Error('DATABASE_ID is not defind');

  const databaseItems = await getDatabaseItems(databaseId);

  const parsedData = parseDatabaseItems(databaseItems);

  return {
    props: {
      data: parsedData,
    },
  };
};
