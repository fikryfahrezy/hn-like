import { useState, useEffect, useRef, useCallback } from 'react';
import { ApolloClient, DocumentNode } from '@apollo/client';
import { initializeApollo } from '../lib/apolloClient';
import {
  DataType,
  CurrentSearchType,
  DataStateType,
  FilterChangeType,
} from '../types/types';

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
  const isMounted = useRef(true);
  const isFetchMore = useRef(true);
  const isFetchCanceled = useRef(false);
  const currentSearch = useRef<CurrentSearchType>(defaultSearch);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(function () {
      let isFetching = true;
      if (isFetching) {
        isFetching = false;
        apolloClient
          .query({
            query: QUERY,
            variables: {
              ...variables,
              start: dataLength * page,
            },
          })
          .then((res) => {
            const { data: fetchedData } = res;
            if (fetchedData[graphQuery].length > 0) {
              isFetchMore.current = true;
              const { data: currentData, filteredData } = data;
              const newData = fetchedData[graphQuery] as DataType[];

              if (isMounted.current)
                setData((prevState) => ({
                  ...prevState,
                  data: filteredData
                    ? currentData
                    : [...currentData, ...newData],
                  filteredData: filteredData
                    ? [
                        ...filteredData,
                        ...newData.filter(filterFn(currentSearch.current)),
                      ]
                    : filteredData,
                }));
            } else isFetchMore.current = false;

            if (isMounted.current) setLoading(false);

            isFetching = true;
          })
          .catch(() => {
            if (isMounted) {
              setError(true);
              setLoading(false);
            }
          });
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
      const isReturn =
        loading || !isFetchMore.current || isFetchCanceled.current;
      if (isReturn) {
        isFetchCanceled.current = false;
        return;
      }
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && isMounted.current) {
          console.log('hi');
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

  const onChange = useCallback(
    ({ name, keyword }: FilterChangeType) => {
      currentSearch.current[name] = keyword;
      const { data: currentData } = data;
      const filteredData = currentData.filter(filterFn(currentSearch.current));
      setData((prevState) => ({ ...prevState, filteredData }));
    },
    [data]
  );

  const clearData = useCallback(() => {
    isFetchCanceled.current = true;
    currentSearch.current = defaultSearch;
    setData((prevState) => ({ ...prevState, filteredData: null }));
  }, [data]);

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
