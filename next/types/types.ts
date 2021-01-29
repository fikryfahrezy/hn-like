export type UtilityType = {
  id: number;
  name: string;
};

type AdditionalDataType = {
  name: string;
};

export type DataType = {
  id: string;
  title: string;
  link: string;
  slug: string;
  description: string;
  category: AdditionalDataType;
  source?: AdditionalDataType;
};

export type CurrentSearchType = {
  search: string;
  category: string;
  source: string;
};

export type DataStateType = {
  data: DataType[];
  filteredData: DataType[] | null;
};

export type FilterChangeType = {
  name: 'search' | 'category' | 'source';
  keyword: string;
};
