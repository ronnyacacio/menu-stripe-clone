import React from 'react';

import Layout from './components/Layout';
import Navbar from './components/Navbar';
import GlobalStyle from './styles/global';

export default function App() {
  return (
    <>
      <Layout>
        <Navbar />
      </Layout>
      <GlobalStyle />
    </>
  );
}
