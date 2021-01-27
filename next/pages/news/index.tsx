import { gql, ApolloQueryResult } from '@apollo/client';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { initializeApollo } from '../../lib/apolloClient';
import Page from '../../components/page';
import { DataType, UtilityType } from '../../types/types';

type NewsType = {
  jsids: DataType[];
};

type NewsCategories = {
  jsidCategories: UtilityType[];
};

type NewsSources = {
  jsidSources: UtilityType[];
};

type NewsProps = {
  news: ApolloQueryResult<NewsType>;
  newsSources: ApolloQueryResult<NewsSources>;
  newsCategories: ApolloQueryResult<NewsCategories>;
};

const GET_NEWS = gql`
  query jsids($start: Int, $limit: Int, $sort: String) {
    jsids(start: $start, limit: $limit, sort: $sort) {
      id
      title
      link
      slug
      description
      category {
        name
      }
      source {
        name
      }
    }
  }
`;

const queryVariables = {
  start: 0,
  limit: 20,
  sort: 'id:DESC',
};

const News = ({ news, newsSources, newsCategories }: NewsProps) => {
  const {
    data: { jsids: jsidData },
  } = news;
  const {
    data: { jsidCategories: jsidCategoryData },
  } = newsCategories;
  const {
    data: { jsidSources: jsidSourceData },
  } = newsSources;
  const graphQueryName = 'jsids';

  const headTitle = 'Web Dev News';
  const headDescription =
    'Find recent news about web programming from random sources.';
  const headImage =
    'https://og-image.vercel.app/Web%20Dev%20News.jpeg?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-black.svg';

  return (
    <>
      <Head>
        <title>Web Dev News</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={headDescription} />
        <meta
          name="keyword"
          content="html,css,javascript,web,development,web development,resources,learning,tips,trick"
        />
        <meta property="og:title" content={headTitle} />
        <meta property="og:description" content={headDescription} />
        <meta name="og:image" content={headImage} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={headTitle} />
        <meta name="twitter:description" content={headDescription} />
        <meta name="twitter:image" content={headImage} />
      </Head>
      <Page
        data={jsidData}
        categories={jsidCategoryData}
        sources={jsidSourceData}
        GRAPH_QUERY={GET_NEWS}
        queryVariables={queryVariables}
        graphQueryName={graphQueryName}
        pageTitle={headTitle}
        pageDescription={headDescription}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // https://github.com/vercel/next.js/blob/canary/examples/with-apollo/pages/index.js
  const apolloClient = initializeApollo();
  const GET_NEWS_SOURCES = gql`
    query {
      jsidSources {
        id
        name
      }
    }
  `;
  const GET_NEWS_CATEGORIES = gql`
    query {
      jsidCategories {
        id
        name
      }
    }
  `;

  const newsPromise = apolloClient.query({
    query: GET_NEWS,
    variables: queryVariables,
  });
  const newsSourcesPromise = apolloClient.query({
    query: GET_NEWS_SOURCES,
  });
  const newsCategoriesPromise = apolloClient.query({
    query: GET_NEWS_CATEGORIES,
  });

  const [news, newsSources, newsCategories] = await Promise.all([
    newsPromise,
    newsSourcesPromise,
    newsCategoriesPromise,
  ]);

  const props: NewsProps = {
    news,
    newsSources,
    newsCategories,
  };

  return {
    props,
    revalidate: 1,
  };
};

export default News;
