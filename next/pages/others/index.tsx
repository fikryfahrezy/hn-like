import { gql, ApolloQueryResult } from '@apollo/client';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { initializeApollo } from '../../lib/apolloClient';
import Page from '../../components/page';

const GET_ARTICLES = gql`
  query articles($start: Int, $limit: Int, $sort: String) {
    articles(start: $start, limit: $limit, sort: $sort) {
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

type OthersProps = {
  articles: ApolloQueryResult<any>;
  articleSources: ApolloQueryResult<any>;
  articleCategories: ApolloQueryResult<any>;
};

const Others = ({
  articles,
  articleSources,
  articleCategories,
}: OthersProps) => {
  const {
    data: { articles: articleData },
  } = articles;
  const {
    data: { articleCategories: articleCategoryData },
  } = articleCategories;
  const {
    data: { articleSources: articleSourceData },
  } = articleSources;
  const graphQueryName = 'articles';

  return (
    <>
      <Head>
        <title>Just Others</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Just another article or source about programming references."
        />
        <meta
          name="keyword"
          content="html,css,javascript,web,development,web development,resources,learning,tips,trick"
        />
        <meta property="og:title" content="Just Others" />
        <meta
          property="og:description"
          content="Just another article or source about programming references."
        />
        <meta
          name="og:image"
          content="https://og-image.vercel.app/Just%20Others.jpeg?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-black.svg"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Just Others" />
        <meta
          name="twitter:description"
          content="Just another article or source about programming references."
        />
        <meta
          name="twitter:image"
          content="https://og-image.vercel.app/Just%20Others.jpeg?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-black.svg"
        />
      </Head>
      <Page
        data={articleData}
        categories={articleCategoryData}
        sources={articleSourceData}
        GRAPH_QUERY={GET_ARTICLES}
        queryVariables={queryVariables}
        graphQueryName={graphQueryName}
        pageTitle="Articles that 'I' Bookmarked"
        pageDescription="List of Awesome Articles for 'me'"
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // https://github.com/vercel/next.js/blob/canary/examples/with-apollo/pages/index.js
  const apolloClient = initializeApollo();
  const GET_ARTICLES_SOURCES = gql`
    query {
      articleSources {
        id
        name
      }
    }
  `;
  const GET_ARTICLES_CATEGORIES = gql`
    query {
      articleCategories {
        id
        name
      }
    }
  `;

  const articlesPromise = apolloClient.query({
    query: GET_ARTICLES,
    variables: queryVariables,
  });
  const articleSourcesPromise = apolloClient.query({
    query: GET_ARTICLES_SOURCES,
  });
  const articleCategoriesPromise = apolloClient.query({
    query: GET_ARTICLES_CATEGORIES,
  });

  const [articles, articleSources, articleCategories] = await Promise.all([
    articlesPromise,
    articleSourcesPromise,
    articleCategoriesPromise,
  ]);

  const props: OthersProps = {
    articles,
    articleSources,
    articleCategories,
  };

  return {
    props,
    revalidate: 1,
  };
};

export default Others;
