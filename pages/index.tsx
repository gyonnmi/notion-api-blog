import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { getDatabaseItems } from '../cms/notion';
import PageHead from '../components/common/PageHead';
import styles from '../styles/Home.module.css';
import { cardData } from '../types/types';
import { parseDatabaseItems } from '../utils/parseDatabaseItems';

interface HomeProps {
  data: cardData[];
}

export default function Home({ data }: HomeProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Rizy's devlog ٩(๑′∀ ‵๑)۶•*¨*•.¸¸♪</title>
        <meta name="description" content="프론트엔드 주니어 개발자🐣" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <PageHead /> */}

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
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
