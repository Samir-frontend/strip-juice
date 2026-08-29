import React from 'react';
import Layout from '../components/Layout.jsx';
import Hero from '../components/Hero.jsx';
import ProductsSection from '../components/ProductsSection.jsx';
import AboutSection from '../components/AboutSection.jsx';
import StoriesSection from '../components/StoriesSection.jsx';
import ReviewsSection from '../components/ReviewsSection.jsx';
import { useShop } from '../context/ShopContext.jsx';

export default function Home() {
  const { bestSellers, topBuying } = useShop();

  return (
    <Layout>
      <Hero />

      <ProductsSection
        id="bestsellers"
        productsOverride={bestSellers}
        title="Best Sellers"
        subtitle="The flavors our customers keep coming back for."
        viewAllTo="/bestsellers"
        viewAllLabel="View all best sellers"
      />

      <ProductsSection
        id="top-buying"
        productsOverride={topBuying}
        title="Top Buying Drinks"
        subtitle="Ranked by units sold across every Strip order this month."
        viewAllTo="/drinks"
        viewAllLabel="Shop all flavors"
      />

      <AboutSection preview />
      <StoriesSection limit={3} />
      <ReviewsSection />
    </Layout>
  );
}
