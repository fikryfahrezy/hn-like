import { gql, ApolloQueryResult } from '@apollo/client';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { initializeApollo } from '../../lib/apolloClient';
import Page from '../../components/page';
import { DataType, UtilityType } from '../../types/types';

type TechnologiesType = {
  teches: DataType[];
};

type TechCategories = {
  techCategories: UtilityType[];
};

type TechnologiesProps = {
  technologies: ApolloQueryResult<TechnologiesType>;
  techCategories: ApolloQueryResult<TechCategories>;
};

const GET_TECHNOLOGIES = gql`
  query teches($start: Int, $limit: Int, $sort: String) {
    teches(start: $start, limit: $limit, sort: $sort) {
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

const Technologies = ({ technologies, techCategories }: TechnologiesProps) => {
  const {
    data: { teches: techData },
  } = technologies;
  const {
    data: { techCategories: techCategoryData },
  } = techCategories;
  const graphQueryName = 'teches';

  const headTitle = 'Awesome Technologies';
  const headDescription = 'List of awesome technologies about programming.';
  const headImage =
    'https://og-image.vercel.app/Awesome%20Technologies.jpeg?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-black.svg';

  return (
    <>
      <Head>
        <title>Awesome Technologies</title>
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
        data={techData}
        categories={techCategoryData}
        GRAPH_QUERY={GET_TECHNOLOGIES}
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
  const GET_TECH_CATEGORIES = gql`
    query {
      techCategories {
        id
        name
      }
    }
  `;

  const technologiesPromise = apolloClient.query({
    query: GET_TECHNOLOGIES,
    variables: queryVariables,
  });
  const techCategoriesPromise = apolloClient.query({
    query: GET_TECH_CATEGORIES,
  });

  const [technologies, techCategories] = await Promise.all([
    technologiesPromise,
    techCategoriesPromise,
  ]);

  const props: TechnologiesProps = {
    technologies,
    techCategories,
  };

  return {
    props,
    revalidate: 1,
  };
};
export default Technologies;
