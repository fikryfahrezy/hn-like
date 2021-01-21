import { useState, useEffect, useRef, useCallback } from 'react';
import { ApolloClient, DocumentNode } from '@apollo/client';
import { initializeApollo } from '../lib/apolloClient';

// NOTE: Infinity Scroll References
// https://github.com/WebDevSimplified/React-Infinite-Scrolling
// < Using GraphQL> https://github.com/vercel/next.js/blob/canary/examples/with-apollo/components/PostList.js
const apolloClient: ApolloClient<unknown> = initializeApollo();

const useDataManagement = (
  inputData: any[],
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
  const currentSearch = useRef('');
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
              const regex = RegExp(`${currentSearch.current}`, 'gi');

              setData((prevState) => ({
                ...prevState,
                data: [...currentData, ...newData],
                filteredData:
                  filteredData.length > 0
                    ? [...filteredData, ...filteredData.filter(filterFn(regex))]
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

  const filterFn = (regex: RegExp) => (value: any) =>
    value.title.match(regex) ||
    value.link.match(regex) ||
    value.description?.match(regex) ||
    value.category.name.match(regex) ||
    value.source?.name.match(regex);

  const onChange = (keyword: string) => {
    currentSearch.current = keyword;
    const regex = RegExp(`${keyword}`, 'gi');

    let filtered: Array<any>;
    const { data: currentData, filteredData } = data;
    if (filteredData.length === 0)
      filtered = currentData.filter(filterFn(regex));
    else filtered = filteredData.filter(filterFn(regex));

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
