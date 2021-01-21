import { gql, ApolloQueryResult } from '@apollo/client';
import Head from 'next/head';
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
        <title>Awesome Articles</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta
          name="description"
          content="List of Articles for Learning Web Development"
        />
        <meta
          name="keyword"
          content="html, css, javascript, developer, development, resources, web development, learning"
        />

        <meta
          property="og:description"
          content="List of Articles for Learning Web Development"
        />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content="Awesome Articles" />
        <meta
          name="twitter:description"
          content="List of Articles for Learning Web Development"
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

export async function getStaticProps() {
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
}

export default Others;
