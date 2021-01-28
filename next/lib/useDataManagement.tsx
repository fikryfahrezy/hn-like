import { useState, useEffect, useRef, useCallback } from 'react';
import { ApolloClient, DocumentNode } from '@apollo/client';
import { initializeApollo } from '../lib/apolloClient';
import { DataType } from '../types/types';

type CurrentSearchType = {
  search: string;
  category: string;
  source: string;
};

type DataStateType = {
  data: DataType[];
  filteredData: DataType[] | null;
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
  const defaultSearch = {
    search: '',
    category: '',
    source: '',
  };

  const [data, setData] = useState<DataStateType>({
    data: inputData,
    filteredData: null,
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const observer = useRef<IntersectionObserver>(null);
  const isFetching = useRef(true);
  const isMounted = useRef(true);
  const isFetchMore = useRef(true);
  const isFetchCanceled = useRef(false);
  const currentSearch = useRef<CurrentSearchType>(defaultSearch);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(async function () {
      try {
        if (isFetching.current) {
          isFetching.current = false;
          const { data: fetchedData } = await apolloClient.query({
            query: QUERY,
            variables: {
              ...variables,
              start: dataLength * page,
            },
          });

          if (fetchedData[graphQuery].length > 0) {
            isFetchMore.current = true;
            const { data: currentData, filteredData } = data;
            const newData = fetchedData[graphQuery] as DataType[];

            if (isMounted.current)
              setData((prevState) => ({
                ...prevState,
                data: filteredData ? currentData : [...currentData, ...newData],
                filteredData: filteredData
                  ? [
                      ...filteredData,
                      ...newData.filter(filterFn(currentSearch.current)),
                    ]
                  : filteredData,
              }));
          } else isFetchMore.current = false;

          if (isMounted.current) setLoading(false);

          isFetching.current = true;
        }
      } catch (error) {
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      }
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, [page]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const lastElementRef = useCallback(
    (node: HTMLButtonElement) => {
      if (loading || !isFetchMore.current || isFetchCanceled.current) {
        isFetchCanceled.current = false;
        return;
      }
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

  const filterFn = ({ search, category, source }: CurrentSearchType) => (
    value: DataType
  ) => {
    const isMatch =
      (value.title.includes(search) ||
        value.link.includes(search) ||
        value.description?.includes(search)) &&
      value.category?.name.includes(category) &&
      value.source?.name.includes(source);

    return isMatch;
  };

  const onChange = (
    name: 'search' | 'category' | 'source',
    keyword: string
  ) => {
    currentSearch.current[name] = keyword;
    const { data: currentData } = data;
    let filteredData = currentData.filter(filterFn(currentSearch.current));
    setData((prevState) => ({ ...prevState, filteredData }));
  };

  const clearData = () => {
    isFetchCanceled.current = true;
    currentSearch.current = defaultSearch;
    setData((prevState) => ({ ...prevState, filteredData: null }));
  };

  return {
    data,
    clearData,
    onChange,
    loading,
    error,
    lastElementRef,
    currentSearch: currentSearch.current,
  };
};

export default useDataManagement;
