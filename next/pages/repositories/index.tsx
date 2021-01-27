import { gql, ApolloQueryResult } from '@apollo/client';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { initializeApollo } from '../../lib/apolloClient';
import Page from '../../components/page';
import { DataType, UtilityType } from '../../types/types';

type RepositoriesType = {
  repositories: DataType[];
};

type RepositoriesCategories = {
  repositoryCategories: UtilityType[];
};

type RepositoriesProps = {
  repositories: ApolloQueryResult<RepositoriesType>;
  repositoryCategories: ApolloQueryResult<RepositoriesCategories>;
};

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

  const headTitle = 'GitHub Repositories';
  const headDescription = 'List of awesome GitHub Repositories.';
  const headImage =
    'https://og-image.vercel.app/GitHub%20Repositories.jpeg?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-black.svg';

  return (
    <>
      <Head>
        <title>GitHub Repositories</title>
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
        data={repositoryData}
        categories={repositoryCategoryData}
        GRAPH_QUERY={GET_REPOSITORIES}
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
