import { gql, ApolloQueryResult } from '@apollo/client';
import Head from 'next/head';
import { initializeApollo } from '../../lib/apolloClient';
import Page from '../../components/page';

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

type TechnologiesProps = {
  technologies: ApolloQueryResult<any>;
  techCategories: ApolloQueryResult<any>;
};

const Technologies = ({ technologies, techCategories }: TechnologiesProps) => {
  const {
    data: { teches: techData },
  } = technologies;
  const {
    data: { techCategories: techCategoryData },
  } = techCategories;
  const graphQueryName = 'teches';

  return (
    <>
      <Head>
        <title>Awesome Tech's</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta name="description" content="Awesome Web Technologies" />
        <meta
          name="keyword"
          content="javascript, yarn, npm, package, library, web development"
        />

        <meta property="og:description" content="Awesome Web Technologies" />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content="Awesome Technologies" />
        <meta name="twitter:description" content="Awesome Web Technologies" />
      </Head>
      <Page
        data={techData}
        categories={techCategoryData}
        GRAPH_QUERY={GET_TECHNOLOGIES}
        queryVariables={queryVariables}
        graphQueryName={graphQueryName}
        pageTitle="Awesome Tech's for Web Development that 'I' Liked"
        pageDescription="List of Awesome Awesome Tech's for Web Development for 'me'"
      />
    </>
  );
};

export async function getStaticProps() {
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
}
export default Technologies;
