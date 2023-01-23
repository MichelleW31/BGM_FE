import {ReactElement} from 'react';
import styles from './Image.module.scss';

const Image = (): ReactElement => (
  <section className={styles.ImageContainer}>
    <h2 className={styles.HeaderCopy}>Welcome to BGM Bank!</h2>
    <p className={styles.BodyCopy}>Let's Get Started</p>
  </section>
);

export default Image;
