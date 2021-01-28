import Article from './article';
import { DataType } from '../types/types';

type ArticlesProps = {
  filteredData: DataType[] | null;
  data: DataType[];
};

const Articles = ({ filteredData, data }: ArticlesProps) => (
  <>
    {filteredData
      ? filteredData.map((article: DataType, i: number) =>
          i === filteredData.length - 1 ? (
            <Article key={i} article={article} />
          ) : (
            <Article key={i} article={article} />
          )
        )
      : data.map((article: any, i: number) =>
          i === data.length - 1 ? (
            <Article key={i} article={article} />
          ) : (
            <Article key={i} article={article} />
          )
        )}
  </>
);

export default Articles;
