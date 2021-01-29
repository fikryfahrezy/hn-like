import Link from 'next/link';
import { DocumentNode } from '@apollo/client';
import style from '../styles/Page.module.css';
import Header from './header';
import Main from './main';
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
    data: currentData,
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
        <Main
          currentData={currentData}
          currentSearch={currentSearch}
          categories={categories}
          sources={sources}
          clearData={clearData}
          onChange={onChange}
        />
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
