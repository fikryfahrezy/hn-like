import { gql, ApolloQueryResult } from '@apollo/client';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { initializeApollo } from '../../lib/apolloClient';
import Page from '../../components/page';

const GET_DEVTOS = gql`
  query devtos($start: Int, $limit: Int, $sort: String) {
    devtos(start: $start, limit: $limit, sort: $sort) {
      id
      title
      link
      slug
      description
      category {
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

type DevtosProps = {
  devtos: ApolloQueryResult<any>;
  devtoCategories: ApolloQueryResult<any>;
};

const Devtos = ({ devtos, devtoCategories }: DevtosProps) => {
  const {
    data: { devtos: devtoData },
  } = devtos;
  const {
    data: { devtoCategories: devtoCategoryData },
  } = devtoCategories;
  const graphQueryName = 'devtos';

  return (
    <>
      <Head>
        <title>Dev.to Posts</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Find newest Dev.to posts." />
        <meta
          name="keyword"
          content="html,css,javascript,web,development,web development,resources,learning,tips,trick"
        />
        <meta property="og:title" content="Dev.to Posts" />
        <meta property="og:description" content="Find newest Dev.to posts." />
        <meta
          name="og:image"
          content="https://og-image.vercel.app/Dev.to%20Posts.jpeg?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-black.svg"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Dev.to Posts" />
        <meta name="twitter:description" content="Find newest Dev.to posts." />
        <meta
          name="twitter:image"
          content="https://og-image.vercel.app/Dev.to%20Posts.jpeg?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-black.svg"
        />
      </Head>
      <Page
        data={devtoData}
        categories={devtoCategoryData}
        GRAPH_QUERY={GET_DEVTOS}
        queryVariables={queryVariables}
        graphQueryName={graphQueryName}
        pageTitle="Dev.to Articles that 'I' Bookmarked"
        pageDescription="List of Awesome Dev.to Articles for 'me'"
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // https://github.com/vercel/next.js/blob/canary/examples/with-apollo/pages/index.js
  const apolloClient = initializeApollo();
  const GET_DEVTO_CATEGORIES = gql`
    query {
      devtoCategories {
        id
        name
      }
    }
  `;

  const devtosPromise = apolloClient.query({
    query: GET_DEVTOS,
    variables: queryVariables,
  });
  const devtoCategoriesPromise = apolloClient.query({
    query: GET_DEVTO_CATEGORIES,
  });

  const [devtos, devtoCategories] = await Promise.all([
    devtosPromise,
    devtoCategoriesPromise,
  ]);

  const props: DevtosProps = {
    devtos,
    devtoCategories,
  };

  return {
    props,
    revalidate: 1,
  };
};
export default Devtos;
