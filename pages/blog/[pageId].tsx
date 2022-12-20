import { getPageContent } from 'cms/notion';
import LoadingSpiner from 'components/common/LoadingSpiner';
import NotionPageRenderer from 'components/notion/NotionPageRenderer';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ExtendedRecordMap } from 'notion-types';
import React from 'react';
import { getCachedDatabaseItems } from 'utils/getCachedDatabaseItems';
import { insertPreviewImageToRecordMap } from 'utils/previewImage';
import Giscus from '@giscus/react';

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
      <div className="max-w-4xl mx-auto my-8">
        <Giscus
          id="comments"
          term="blog"
          repo="gyonnmi/notion-api-blog"
          repoId="R_kgDOIWUBOw"
          category="General"
          categoryId="DIC_kwDOIWUBO84CTK2Y"
          mapping="pathname"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="light"
          lang="ko"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default BlogDetailsPage;

export const getStaticProps: GetStaticProps<BlogDetailsPageProps> = async ({
  params,
}) => {
  const pageId = params?.pageId; //const pageId: string | string[] | undefined

  // pageId가 undefind일 경우 예외 처리(타입가드)
  if (!pageId) throw Error('PageId is not defind');
  // const pageId: string | string[]

  const recordMap = await getPageContent(pageId.toString());

  const preview_images = await insertPreviewImageToRecordMap(recordMap);

  return {
    props: {
      recordMap: { ...recordMap, preview_images },
    },
    revalidate: 60, // 빌드 쿨타임
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const databaseId = process.env.DATABASE_ID;

  if (!databaseId) throw new Error('DATABASE_ID is not defind');

  const databaseItems = await getCachedDatabaseItems(databaseId);

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
