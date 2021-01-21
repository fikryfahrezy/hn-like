import React from 'react';
import style from '../styles/Page.module.css';
import Articles from './articles';
import Header from './header';
import Select from './select';
import Loading from './loading';
import Error from './error';
import BackTopButton from './backTopButton';
import useDataManagement from '../lib/useDataManagement';
import { DocumentNode } from '@apollo/client';

type PageProps = {
  GRAPH_QUERY: DocumentNode;
  data: any[];
  queryVariables: object;
  graphQueryName: string;
  pageTitle: string;
  pageDescription: string;
  categories: any[];
  sources?: any[];
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
    setData,
    onChange,
    error,
    lastElementRef,
    loading,
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
              type="text"
              placeholder="..."
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
          <Select onChange={onChange} items={categories} name="category" />
          {sources && (
            <Select onChange={onChange} items={sources} name="source" />
          )}
          <div className={style.searchItem}>
            <button
              onClick={() =>
                setData((prevState) => ({ ...prevState, filteredData: [] }))
              }
            >
              Clear
            </button>
          </div>
        </div>
        <main className={style.main}>
          <Articles
            filteredData={filteredData}
            data={data}
            lastElementRef={lastElementRef}
          />
          {loading && <Loading />}
          {error && <Error />}
        </main>
        <BackTopButton />
      </div>
    </div>
  );
};

export default Page;
