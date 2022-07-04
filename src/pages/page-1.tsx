import { useMemo } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { withUrqlClient } from 'next-urql';
import { dedupExchange, cacheExchange, fetchExchange, useQuery } from 'urql';

import styles from '../styles/Home.module.css';

const Page1: NextPage = () => {
  const [{ fetching, data }] = useQuery({
    query: `
      query TodosAll {
        todosAll {
          id
          title
          completed
        }
      }
    `,
  });

  const todos = useMemo(() => data?.todosAll || [], [data?.todosAll]);

  console.log('Page 1:', fetching, todos);

  return (
    <div className={styles.container}>
      <Head>
        <title>Page 1 | Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Page 1!</a>
        </h1>

        <div className={styles.menu}>
          <Link href="/">Home</Link>
          <Link href="/page-1">Page 1</Link>
          <Link href="/page-2">Page 2</Link>
        </div>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          {todos.map((todo: any) => (
            <a key={todo.id} className={styles.card}>
              <h2>{todo.title}</h2>
              <p>{String(todo.completed)}</p>
            </a>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};


export default withUrqlClient((ssrExchange, ctx) => ({
  url: 'https://playground.kirinami.com/graphql',
  exchanges: [dedupExchange, cacheExchange, ssrExchange, fetchExchange],
  fetchOptions: {
    headers: {
      authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTY1Njk0NTk1NiwiZXhwIjoxNjU3NTUwNzU2fQ.PUNbuXqFxSuVL8dugY5862kbrPHK2bGOD0H0TgkD2zU',
    },
  },
}), { ssr: true })(Page1);
