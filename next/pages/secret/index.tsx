import { useState, useEffect } from 'react';
import Link from 'next/link';
import style from '../../styles/Secret.module.css';

const Secret = () => {
  const [gists, setGists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    window
      .fetch('https://api.github.com/users/fikryfahrezy/gists', {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      })
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
        setGists(res);
      });
  }, []);

  return (
    <div className={style.flex}>
      <div className={style.container}>
        {isLoading ? (
          <p>loading</p>
        ) : (
          <main className={style.main}>
            {gists.map((gist: any, i: number) => (
              <article key={i} className={style.article}>
                <h2>
                  <Link href={`/secret/${gist.id}`}>
                    <a>{Object.keys(gist.files)[0]}</a>
                  </Link>
                </h2>
              </article>
            ))}
          </main>
        )}
      </div>
    </div>
  );
};

export default Secret;
