"use client"
import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to the Counting Game!</h1>

      <p className={styles.description}>
        Click the button below to increase the count:
      </p>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>Count: {count}</h2>
          <button onClick={() => setCount(count + 1)}>
            Click me
          </button>
        </div>
      </div>
    </main>
  );
}
