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
