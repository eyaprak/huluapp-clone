import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Results from '../components/Results';
import styles from '../styles/Home.module.css';
import requests from '../utils/requets';

export default function Home({ results }) {
  return (
    <div>
      <Head>
        <title>Hulu App</title>
      </Head>
      <Header />
      <Nav />

      <Results results={results} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const genre = context.query.genre;
  const res = await fetch(
    `https://api.themoviedb.org/3${
      requests[genre]?.url || requests.fetchTrending.url
    }`
  );

  const data = await res.json();

  return {
    props: {
      results: data.results,
    },
  };
}
