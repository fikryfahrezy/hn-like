import { gql, ApolloQueryResult } from '@apollo/client';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { initializeApollo } from '../../lib/apolloClient';
import Page from '../../components/page';
import { DataType, UtilityType } from '../../types/types';

type MediumsType = {
  mediums: DataType[];
};

type MediumCategories = {
  mediumCategories: UtilityType[];
};

type MediumsProps = {
  mediums: ApolloQueryResult<MediumsType>;
  mediumCategories: ApolloQueryResult<MediumCategories>;
};

const GET_MEDIUMS = gql`
  query mediums($start: Int, $limit: Int, $sort: String) {
    mediums(start: $start, limit: $limit, sort: $sort) {
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

const Mediums = ({ mediums, mediumCategories }: MediumsProps) => {
  const {
    data: { mediums: mediumData },
  } = mediums;
  const {
    data: { mediumCategories: mediumCategoryData },
  } = mediumCategories;
  const graphQueryName = 'mediums';

  const headTitle = 'Medium Stories';
  const headDescription = 'Find newest Medium stories.';
  const headImage =
    'https://og-image.vercel.app/Medium%20Stories.jpeg?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-black.svg';

  return (
    <>
      <Head>
        <title>Medium Stories</title>
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
        data={mediumData}
        categories={mediumCategoryData}
        GRAPH_QUERY={GET_MEDIUMS}
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
  const GET_MEDIUM_CATEGORIES = gql`
    query {
      mediumCategories {
        id
        name
      }
    }
  `;

  const mediumPromise = apolloClient.query({
    query: GET_MEDIUMS,
    variables: queryVariables,
  });
  const mediumCategoriesPromise = apolloClient.query({
    query: GET_MEDIUM_CATEGORIES,
  });

  const [mediums, mediumCategories] = await Promise.all([
    mediumPromise,
    mediumCategoriesPromise,
  ]);

  const props: MediumsProps = {
    mediums,
    mediumCategories,
  };

  return {
    props,
    revalidate: 1,
  };
};
export default Mediums;
