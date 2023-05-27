import Head from 'next/head';
import PizzaRestaurant from '../components/pages/PizzaRestaurant/PizzaRestaurant';

export default function Home() {
  return (
    <>
      <Head>
        <title>Pizza Restaurant</title>
        <meta name="description" content="Pizza restaurant - The best pizzas in the world" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Replacing this to the <Script> tag of next.js causes it to stop working. Keep this in the meantime. */}
        <script src="https://kit-pro.fontawesome.com/releases/v6.4.0/js/pro.min.js" data-auto-fetch-svg></script>
      </Head>
      <PizzaRestaurant />
    </>
  );
}
