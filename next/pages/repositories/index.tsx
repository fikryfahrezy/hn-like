import { gql, ApolloQueryResult } from '@apollo/client';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { initializeApollo } from '../../lib/apolloClient';
import Page from '../../components/page';

const GET_REPOSITORIES = gql`
  query repositories($start: Int, $limit: Int, $sort: String) {
    repositories(start: $start, limit: $limit, sort: $sort) {
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

type RepositoriesProps = {
  repositories: ApolloQueryResult<any>;
  repositoryCategories: ApolloQueryResult<any>;
};

const Repositories = ({
  repositories,
  repositoryCategories,
}: RepositoriesProps) => {
  const {
    data: { repositories: repositoryData },
  } = repositories;
  const {
    data: { repositoryCategories: repositoryCategoryData },
  } = repositoryCategories;
  const graphQueryName = 'repositories';

  return (
    <>
      <Head>
        <title>GitHub Repositories</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="List of awesome GitHub Repositories."
        />
        <meta
          name="keyword"
          content="html,css,javascript,web,development,web development,resources,learning,tips,trick"
        />
        <meta property="og:title" content="GitHub Repositories" />
        <meta
          property="og:description"
          content="List of awesome GitHub Repositories."
        />
        <meta
          name="og:image"
          content="https://og-image.vercel.app/GitHub%20Repositories.jpeg?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-black.svg"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="GitHub Repositories" />
        <meta
          name="twitter:description"
          content="List of awesome GitHub Repositories."
        />
        <meta
          name="twitter:image"
          content="https://og-image.vercel.app/GitHub%20Repositories.jpeg?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-black.svg"
        />
      </Head>
      <Page
        data={repositoryData}
        categories={repositoryCategoryData}
        GRAPH_QUERY={GET_REPOSITORIES}
        queryVariables={queryVariables}
        graphQueryName={graphQueryName}
        pageTitle="Awesome Repositories that 'I' Starred"
        pageDescription="List of Awesome Repositories for 'me'"
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // https://github.com/vercel/next.js/blob/canary/examples/with-apollo/pages/index.js
  const apolloClient = initializeApollo();
  const GET_REPOSITORIES_CATEGORIES = gql`
    query {
      repositoryCategories {
        id
        name
      }
    }
  `;

  const repositoriesPromise = apolloClient.query({
    query: GET_REPOSITORIES,
    variables: queryVariables,
  });
  const repositoryCategoriesPromise = apolloClient.query({
    query: GET_REPOSITORIES_CATEGORIES,
  });

  const [repositories, repositoryCategories] = await Promise.all([
    repositoriesPromise,
    repositoryCategoriesPromise,
  ]);

  const props: RepositoriesProps = {
    repositories,
    repositoryCategories,
  };

  return {
    props,
    revalidate: 1,
  };
};
export default Repositories;
