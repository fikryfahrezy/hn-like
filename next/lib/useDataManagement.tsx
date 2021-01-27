import { useState, useEffect, useRef, useCallback } from 'react';
import { ApolloClient, DocumentNode } from '@apollo/client';
import { initializeApollo } from '../lib/apolloClient';
import { DataType } from '../types/types';

type CurrentSearchType = {
  search: string;
  category: string;
  source: string;
};

// NOTE: Infinity Scroll References
// https://github.com/WebDevSimplified/React-Infinite-Scrolling
// < Using GraphQL> https://github.com/vercel/next.js/blob/canary/examples/with-apollo/components/PostList.js
const apolloClient: ApolloClient<unknown> = initializeApollo();

const useDataManagement = (
  inputData: DataType[],
  graphQuery: string,
  QUERY: DocumentNode,
  variables: object,
  dataLength: number
) => {
  const [data, setData] = useState({ data: inputData, filteredData: [] });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const observer = useRef(null);
  const isFetching = useRef(true);
  const isMounted = useRef(true);
  const isFetchMore = useRef(true);
  const currentSearch = useRef<CurrentSearchType>({
    search: '',
    category: '',
    source: '',
  });
  const timeout = useRef<NodeJS.Timeout>(null);

  const lastElementRef = useCallback(
    (node) => {
      if (loading || !isFetchMore.current) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && isMounted.current) {
          setPage((prevState) => ++prevState);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  useEffect(() => {
    setLoading(true);
    timeout.current = setTimeout(() => {
      (async function () {
        try {
          if (isFetching.current) {
            isFetching.current = false;
            const { data: fetchData } = await apolloClient.query({
              query: QUERY,
              variables: {
                ...variables,
                start: dataLength * page,
              },
            });

            if (fetchData[graphQuery].length > 0) {
              isFetchMore.current = true;
              const { data: currentData, filteredData } = data;
              const newData = fetchData[graphQuery] as any[];

              setData((prevState) => ({
                ...prevState,
                data: [...currentData, ...newData],
                filteredData:
                  filteredData.length > 0
                    ? [
                        ...filteredData,
                        ...filteredData.filter(filterFn(currentSearch.current)),
                      ]
                    : filteredData,
              }));
            } else {
              isFetchMore.current = false;
            }

            if (isMounted.current) setLoading(false);

            isFetching.current = true;
          }
        } catch (error) {
          if (isMounted) {
            setError(true);
            setLoading(false);
          }
        }
      })();
    }, 1500);
  }, [page]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
      clearTimeout(timeout.current);
    };
  }, []);

  const filterFn = ({ search, category, source }: CurrentSearchType) => (
    value: DataType
  ) => {
    const searchRegex = RegExp(`${search}`, 'gi');
    const categoryRegex = RegExp(`${category}`, 'gi');
    const sourceRegex = RegExp(`${source}`, 'gi');

    return (
      value.title.match(searchRegex) ||
      value.link.match(searchRegex) ||
      value.description?.match(searchRegex) ||
      value.category?.name.match(categoryRegex) ||
      value.source?.name.match(sourceRegex)
    );
  };

  const onChange = (
    name: 'search' | 'category' | 'source',
    keyword: string
  ) => {
    currentSearch.current[name] = keyword;

    let filtered: Array<any>;
    const { data: currentData, filteredData } = data;
    if (filteredData.length === 0)
      filtered = currentData.filter(filterFn(currentSearch.current));
    else filtered = filteredData.filter(filterFn(currentSearch.current));

    setData((prevState) => ({ ...prevState, filteredData: filtered }));
  };

  return {
    data,
    setData,
    onChange,
    loading,
    error,
    lastElementRef,
  };
};

export default useDataManagement;
