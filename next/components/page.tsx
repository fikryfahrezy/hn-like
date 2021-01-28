import React from 'react';
import Link from 'next/link';
import { DocumentNode } from '@apollo/client';
import style from '../styles/Page.module.css';
import Articles from './articles';
import Header from './header';
import Select from './select';
import Loading from './loading';
import Error from './error';
import BackTopButton from './backTopButton';
import useDataManagement from '../lib/useDataManagement';
import { DataType, UtilityType } from '../types/types';

type PageProps = {
  GRAPH_QUERY: DocumentNode;
  data: DataType[];
  queryVariables: object;
  graphQueryName: string;
  pageTitle: string;
  pageDescription: string;
  categories: UtilityType[];
  sources?: UtilityType[];
};

const Page = ({
  data: propsData,
  categories,
  sources,
  GRAPH_QUERY,
  queryVariables,
  graphQueryName,
  pageTitle,
  pageDescription,
}: PageProps) => {
  const {
    data: { data, filteredData },
    clearData,
    onChange,
    error,
    lastElementRef,
    loading,
    currentSearch,
  } = useDataManagement(
    propsData,
    graphQueryName,
    GRAPH_QUERY,
    queryVariables,
    propsData.length
  );

  return (
    <div className={style.flex}>
      <div className={style.container}>
        <Link href="/">
          <a>
            <button className={style.backButton}>&larr;</button>
          </a>
        </Link>
        <Header pageTitle={pageTitle} pageDescription={pageDescription} />
        <div
          className={
            sources ? style.searchWithSource : style.searchWithoutSource
          }
        >
          <div className={style.searchItem}>
            <label htmlFor="search">Search</label>
            <input
              id="search"
              name="search"
              type="text"
              placeholder="..."
              value={!filteredData ? '' : currentSearch.search}
              onChange={({ target }) => onChange('search', target.value)}
            />
          </div>
          <Select
            onChange={onChange}
            items={categories}
            name="category"
            currentSelected={currentSearch.category}
          />
          {sources && (
            <Select
              onChange={onChange}
              items={sources}
              name="source"
              currentSelected={currentSearch.source}
            />
          )}
          <div className={style.searchItem}>
            <button onClick={() => clearData()}>Clear</button>
          </div>
        </div>
        <main className={style.main}>
          <Articles filteredData={filteredData} data={data} />
        </main>
        <span
          ref={lastElementRef}
          style={{ visibility: 'hidden', display: 'block' }}
        >
          Load more ...
        </span>
        {loading && <Loading />}
        {error && <Error />}
        <BackTopButton />
      </div>{' '}
    </div>
  );
};

export default Page;
