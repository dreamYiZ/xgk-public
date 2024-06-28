"use client"
import { useState } from 'react';
import styles from './doc.module.sass';
import Box from './cpnt/box';

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <main className={styles.doc}>
      <Box>
        Hello
      </Box>
    </main>
  );
}
