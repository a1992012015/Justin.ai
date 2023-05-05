import React from 'react';

import logo from '../../logo.svg';
import styles from './home.module.css';

export default function Home() {
  return (
    <div className={styles.home}>
      <img src={logo} className={styles['home-logo']} alt="logo" />
      <p>
        Edit <code>src/home.tsx</code> and save to reload.
      </p>
      <a className={styles['home-link']} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Learn React
      </a>
    </div>
  );
}
