import CardList from '../components/card/CardList';
import TagList from 'components/card/tags/TagList';
import PageHead from '../components/common/PageHead';
import Pagination from 'components/common/Pagination';
import { POSTS_PER_PAGE } from 'const/const';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { CardData } from 'types/types';
import { getAlltags } from 'utils/getAllTags';
import { getCachedDatabaseItems } from 'utils/getCachedDatabaseItems';
import { getDatabaseItems } from '../cms/notion';
import HeroSection from '../components/Intro/HeroSection';
import { parseDatabaseItems } from '../utils/parseDatabaseItems';
import { insertPreviewImage } from 'utils/previewImage';

interface HomeProps {
  data: CardData[];
  allTags: CardData['tags'];
}

export default function Home({ data, allTags }: HomeProps) {
  const { query } = useRouter();
  const currentPage = query.page ? parseInt(query.page.toString()) : 1;

  const [postData, setPostData] = useState(
    data.slice(POSTS_PER_PAGE * (currentPage - 1), POSTS_PER_PAGE * currentPage)
  );

  useEffect(() => {
    setPostData(
      data.slice(
        POSTS_PER_PAGE * (currentPage - 1),
        POSTS_PER_PAGE * currentPage
      )
    );
  }, [currentPage, data]);

  return (
    <>
      <PageHead />

      <HeroSection />
      <section>
        {/* basis = 비율 */}
        <aside style={{ flexBasis: '20%' }}>
          <div
            className="p-6 m-4 rounded-xl shadow-md border"
            style={{ margin: '1.5rem' }}
          >
            <h2 className="text-2xl font-bold mb-4">Tags</h2>
            <TagList tags={allTags} />
          </div>
        </aside>
        {/* flex-grow = 남는 공간 전부 차지 */}
        <div style={{ margin: '1.5rem' }}>
          <h3 className="font-bold text-4xl mb-4">Devlog</h3>
          <CardList data={postData} />
          <div className="my-4 flex justify-center">
            <Pagination current={currentPage} total={data.length} />
          </div>
        </div>
      </section>
    </>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const databaseId = process.env.DATABASE_ID;

  // databaseId가 undefind일 경우
  if (!databaseId) throw new Error('DATABASE_ID is not defind');

  const databaseItems = await getCachedDatabaseItems(databaseId);

  const parsedData = parseDatabaseItems(databaseItems);

  const dataWithPreview = await insertPreviewImage(parsedData);

  const allTags = getAlltags(parsedData);

  const duplicatedData: CardData[] = [];

  for (let i = 0; i < 20; i++) {
    duplicatedData.push(...parsedData);
    duplicatedData.push(...dataWithPreview);
  }

  return {
    props: {
      data: dataWithPreview,
      allTags: allTags,
    },
    revalidate: 60, // 빌드 쿨타임
  };
};
