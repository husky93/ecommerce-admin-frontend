import React from 'react';
import Card from '../components/Card';
import styles from '../assets/styles/routes/Home.module.css';

const Home: React.FC = ({}) => {
  return (
    <section className={styles.home} aria-label="Dashboard Home">
      <div className={styles.dashboard_top} aria-label="Dashboard Top">
        <Card title="Sales" variant="primary">
          Sales: 345$
        </Card>
        <Card title="Sales" variant="secondary">
          Sales: 345$
        </Card>
        <Card title="Sales" variant="tertiary">
          Sales: 345$
        </Card>
      </div>
    </section>
  );
};

export default Home;
