import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

import HomePage from '@/pages/HomePage.jsx';
import ProjectsPage from '@/pages/ProjectsPage.jsx';
import ShopPage from '@/pages/ShopPage.jsx';
import CustomPage from '@/pages/CustomPage.jsx';
import AboutPage from '@/pages/AboutPage.jsx';
import ContactPage from '@/pages/ContactPage.jsx';
import PaymentPage from '@/pages/PaymentPage.jsx';

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/custom" element={<CustomPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
