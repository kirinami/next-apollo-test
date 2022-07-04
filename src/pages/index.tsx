import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { gql, useQuery } from '@apollo/client';

import styles from '../styles/Home.module.css';
import { useMemo } from 'react';
import Link from 'next/link';

const Home: NextPage = () => {
  const { loading, data } = useQuery(gql`
    query TodosAll {
      todosAll {
        id
        title
        completed
      }
    }
  `);
  const todos = useMemo(() => data?.todosAll || [], [data?.todosAll]);

  console.log(loading, todos);

  return (
    <div className={styles.container}>
      <Head>
        <title>Home | Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Home!</a>
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

export default Home;
