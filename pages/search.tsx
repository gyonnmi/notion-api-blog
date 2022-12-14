import CardList from 'components/card/CardList';
import LoadingSpiner from 'components/common/LoadingSpiner';
import PageHead from 'components/common/PageHead';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { CardData } from 'types/types';
import { SearchResultType } from './api/getSearchResult';
import styles from './search.module.css';

const SearchPage = () => {
  const { push, query } = useRouter();
  const searchQuery = query.q?.toString() ?? '';

  const [inputValue, setInputValue] = useState('');
  const [postData, setPostData] = useState<CardData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    push({
      query: {
        q: inputValue,
      },
    });
  };

  useEffect(() => {
    const fetchSearchItems = async () => {
      if (!searchQuery) return;

      setIsLoading(true);

      const response = await fetch(`/api/getSearchResult?q=${searchQuery}`);
      const { data }: SearchResultType = await response.json();

      setPostData(data);

      setIsLoading(false);
    };

    fetchSearchItems();
    setInputValue(searchQuery);
  }, [searchQuery]);

  return (
    <>
      <PageHead
        title={searchQuery ? `${searchQuery}에 대한 검색 결과` : ''}
        description={
          searchQuery
            ? `${searchQuery}에 대한  ${postData.length}개의 검색 결과가 있습니다.`
            : ''
        }
      />
      <section className={`${styles.search}`}>
        <div className="bg-gradient-to-r from-purple-300 to-blue-300 p-8">
          <form className={`${styles.searchForm}`} onSubmit={onSubmit}>
            <input
              className={`${styles.searchInput}`}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className={`${styles.searchBtn}`} type="submit">
              <AiOutlineSearch size={'1.5rem'} />
            </button>
          </form>
        </div>

        <div>
          <div className="p-8 max-w-5xl mx-auto">
            {isLoading ? (
              <div className="flex justify-center">
                <LoadingSpiner />
              </div>
            ) : (
              <CardList data={postData} />
            )}
            {!isLoading && postData.length === 0 ? (
              <div className="text-center">No result found</div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchPage;
