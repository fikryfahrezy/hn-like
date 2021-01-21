import { gql, ApolloQueryResult } from '@apollo/client';
import Head from 'next/head';
import { initializeApollo } from '../../lib/apolloClient';
import Page from '../../components/page';

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

type NewsProps = {
  news: ApolloQueryResult<any>;
  newsSources: ApolloQueryResult<any>;
  newsCategories: ApolloQueryResult<any>;
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

  return (
    <>
      <Head>
        <title>JavaScript Indonesia Post</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta name="description" content="JavaScript Indonesia Post" />
        <meta
          name="keyword"
          content="html, css, javascript, yarn, npm, package, library, developer, development, resources, web development, learning, tips, trick"
        />

        <meta property="og:description" content="JavaScript Indonesia Post" />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content="JavaScript Indonesia Post" />
        <meta name="twitter:description" content="JavaScript Indonesia Post" />
      </Head>
      <Page
        data={jsidData}
        categories={jsidCategoryData}
        sources={jsidSourceData}
        GRAPH_QUERY={GET_NEWS}
        queryVariables={queryVariables}
        graphQueryName={graphQueryName}
        pageTitle="JavaScript Indonesia Telegram Channel Post"
        pageDescription="Daily Post from JavaScript Indonesia Channel on Telegram"
      />
    </>
  );
};

export async function getStaticProps() {
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
}

export default News;
