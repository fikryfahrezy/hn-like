import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Web Development Resources</title>
        <link rel="icon" href="/favicon.ico" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta name="description" content="Share Something Awesome for Me" />
        <meta
          name="keyword"
          content="html, css, javascript, yarn, npm, package, library, developer, development, resources, web development, learning, tips, trick"
        />

        <meta
          property="og:description"
          content="Share Something Awesome for Me"
        />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content="Resources Website" />
        <meta
          name="twitter:description"
          content="Share Something Awesome for Me"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          What "I" <a href="#">Save</a>
        </h1>

        <p className={styles.description}>
          Simple website that made to share something{' '}
          <code className={styles.code}>useful for "me"</code>
        </p>

        <div className={styles.grid}>
          <Link href="/news">
            <a className={styles.card}>
              <h3>JavaScript Indonesia Telegram Channel &rarr;</h3>
              <p>
                Daily reference posted on Telegram Channel JavaScript Indonesia.
              </p>
            </a>
          </Link>

          <Link href="/mediums">
            <a className={styles.card}>
              <h3>Medium &rarr;</h3>
              <p>What "I" bookmark on my Medium account.</p>
            </a>
          </Link>

          <Link href="/devtos">
            <a className={styles.card}>
              <h3>Dev.to &rarr;</h3>
              <p>What "I" bookmark on my Dev.to account.</p>
            </a>
          </Link>

          <Link href="/repositories">
            <a className={styles.card}>
              <h3>GitHub Repositories &rarr;</h3>
              <p>Another awesome tech / GitHub repositories that "I" save.</p>
            </a>
          </Link>

          <Link href="/technologies">
            <a className={styles.card}>
              <h3>Awesome Technologies &rarr;</h3>
              <p>Another awesome tech / GitHub repositories that "I" save.</p>
            </a>
          </Link>

          <Link href="/others">
            <a className={styles.card}>
              <h3>Others &rarr;</h3>
              <p>Another awesome tech / GitHub repositories that "I" save.</p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}
