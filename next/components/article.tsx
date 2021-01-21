/**
 * NOTE: Difference between <section> and <article>
 * https://stackoverflow.com/questions/7549561/section-vs-article-html5
 */

type ArticleProps = any;

const Article = ({ article, lastElementRef }: ArticleProps) => (
  <article
    style={{ margin: '2.5rem 0' }}
    ref={lastElementRef && lastElementRef}
  >
    <h2>
      <a href={`#${article.slug}`}>{article.title}</a>
    </h2>
    <p>
      <a href={article.link} target="_blank">
        link
      </a>
    </p>
    <p>Description: {article.description}</p>
    <p>Category: {article.category?.name}</p>
    {article.source && <p>Source: {article.source?.name}</p>}
  </article>
);

export default Article;
