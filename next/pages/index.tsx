import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Hacker News Like</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Find the recent news about programming especially web development."
        />
        <meta
          name="keyword"
          content="html,css,javascript,web,development,web development,resources,learning,tips,trick"
        />
        <meta property="og:title" content="Hacker News Like" />
        <meta
          property="og:description"
          content="Find the recent news about programming especially web development."
        />
        <meta
          name="og:image"
          content="https://og-image.vercel.app/Hacker%20News%20Like.jpeg?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-black.svg"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Hacker News Like" />
        <meta
          name="twitter:description"
          content="Find the recent news about programming especially web development."
        />
        <meta
          name="twitter:image"
          content="https://og-image.vercel.app/Hacker%20News%20Like.jpeg?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-black.svg"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Hacker News <a href="#">Like</a>
        </h1>

        <p className={styles.description}>
          Made with love, just for <code className={styles.code}>fun</code>
        </p>

        <div className={styles.grid}>
          <Link href="/news">
            <a className={styles.card}>
              <h3>Web Dev News &rarr;</h3>
              <p>Find recent news about web programming from random sources.</p>
            </a>
          </Link>

          <Link href="/mediums">
            <a className={styles.card}>
              <h3>Medium &rarr;</h3>
              <p>Find newest Medium stories.</p>
            </a>
          </Link>

          <Link href="/devtos">
            <a className={styles.card}>
              <h3>Dev.to &rarr;</h3>
              <p>Find newest Dev.to posts.</p>
            </a>
          </Link>

          <Link href="/repositories">
            <a className={styles.card}>
              <h3>GitHub Repositories &rarr;</h3>
              <p>List of awesome GitHub Repositories.</p>
            </a>
          </Link>

          <Link href="/technologies">
            <a className={styles.card}>
              <h3>Awesome Technologies &rarr;</h3>
              <p>List of awesome technologies about programming.</p>
            </a>
          </Link>

          <Link href="/others">
            <a className={styles.card}>
              <h3>Others &rarr;</h3>
              <p>
                Just another article or source about programming references.
              </p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}
