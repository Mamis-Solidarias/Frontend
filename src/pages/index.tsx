import Head from 'next/head';

import Box from '@mui/material/Box';

import { Navigation } from './../components/index';

const Home = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Head>
        <title>Mamis Solidarias</title>
      </Head>
      <Navigation />
    </Box>
  );
};

export default Home;
