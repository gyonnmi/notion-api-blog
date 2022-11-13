import TagList from 'components/card/tags/TagList';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { CardData } from 'types/types';
import { getAlltags } from 'utils/getAllTags';
import { getDatabaseItems } from '../cms/notion';
import CardList from '../components/card/CardList';
import PageHead from '../components/common/PageHead';
import HeroSection from '../components/Intro/HeroSection';
import styles from '../styles/Home.module.css';
import { parseDatabaseItems } from '../utils/parseDatabaseItems';

interface HomeProps {
  data: CardData[];
  allTags: CardData['tags'];
}

export default function Home({ data, allTags }: HomeProps) {
  return (
    <>
      {/* <PageHead /> */}
      <Head>
        <title>Rizy's devlog ٩(๑′∀ ‵๑)۶•*¨*•.¸¸♪</title>
        <meta name="description" content="프론트엔드 주니어 개발자🐣" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeroSection />
      <section>
        {/* basis = 비율 */}
        <aside style={{ flexBasis: '20%' }}>
          <div className="p-6 rounded-xl shadow-md border">
            <h2 className="text-2xl font-bold mb-4">Tags</h2>
            <TagList tags={allTags} />
          </div>
        </aside>
        {/* flex-grow = 남는 공간 전부 차지 */}
        <div>
          <h3 className="font-bold text-4xl mb-4">Devlog</h3>
          <CardList data={data} />
        </div>
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

  const allTags = getAlltags(parsedData);

  return {
    props: {
      data: parsedData,
      allTags: allTags,
    },
  };
};
