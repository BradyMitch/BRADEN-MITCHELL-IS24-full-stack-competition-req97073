import { Footer, Header } from 'layouts';
import { LandingPage } from 'pages';
import { ProductsProvider } from 'providers';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const AppRouter = () => {
  return (
    <Router>
      <ProductsProvider>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
        <Footer />
      </ProductsProvider>
    </Router>
  );
};

export default AppRouter;
