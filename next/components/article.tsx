import style from '../styles/Article.module.css';

/**
 * NOTE: Difference between <section> and <article>
 * https://stackoverflow.com/questions/7549561/section-vs-article-html5
 */

type ArticleProps = any;

const Article = ({ article, lastElementRef }: ArticleProps) => (
  <article
    id={article.slug}
    className={style.article}
    ref={lastElementRef && lastElementRef}
  >
    <h2>
      <a href={article.link} target="_blank">
        {article.title}
      </a>
    </h2>
    <p>Description: {article.description}</p>
    <p>
      Category: <code className={style.code}>{article.category?.name}</code>
    </p>
    {article.source && (
      <p>
        Source: <code className={style.code}>{article.source?.name}</code>
      </p>
    )}
  </article>
);

export default Article;
