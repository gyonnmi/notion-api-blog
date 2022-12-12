import { getDatabaseItems, getPageContent } from 'cms/notion';
import LoadingSpiner from 'components/common/LoadingSpiner';
import NotionPageRenderer from 'components/notion/NotionPageRenderer';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ExtendedRecordMap } from 'notion-types';
import React from 'react';

interface BlogDetailsPageProps {
  recordMap: ExtendedRecordMap;
}

const BlogDetailsPage = ({ recordMap }: BlogDetailsPageProps) => {
  const { isFallback } = useRouter();

  if (isFallback)
    return (
      <div className="w-full flex justify-center">
        <LoadingSpiner />
      </div>
    );

  return (
    <section>
      <NotionPageRenderer recordMap={recordMap} />
    </section>
  );
};

export default BlogDetailsPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pageId = params?.pageId; //const pageId: string | string[] | undefined

  // pageId가 undefind일 경우 예외 처리(타입가드)
  if (!pageId) throw Error('PageId is not defind');
  // const pageId: string | string[]

  const recordMap = await getPageContent(pageId.toString());

  return {
    props: {
      recordMap,
    },
    revalidate: 60, // 빌드 쿨타임
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const databaseId = process.env.DATABASE_ID;

  if (!databaseId) throw new Error('DATABASE_ID is not defind');

  const databaseItems = await getDatabaseItems(databaseId);

  const paths = databaseItems.map(({ id: pageId }) => {
    return {
      params: {
        pageId,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};
