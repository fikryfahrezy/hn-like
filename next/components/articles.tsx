import Article from './article';
import { DataType } from '../types/types';

type ArticlesProps = {
  filteredData: DataType[];
  data: DataType[];
  lastElementRef?: (node: any) => void;
};

const Articles = ({ filteredData, data, lastElementRef }: ArticlesProps) => (
  <>
    {filteredData.length > 0
      ? filteredData.map((article: DataType, i: number) =>
          i === filteredData.length - 1 ? (
            <Article
              key={i}
              article={article}
              lastElementRef={lastElementRef}
            />
          ) : (
            <Article key={i} article={article} />
          )
        )
      : data.map((article: any, i: number) =>
          i === data.length - 1 ? (
            <Article
              key={i}
              article={article}
              lastElementRef={lastElementRef}
            />
          ) : (
            <Article key={i} article={article} />
          )
        )}
  </>
);

export default Articles;
