import React from 'react';
import Layout from '../components/Layout.jsx';
import PageBanner from '../components/PageBanner.jsx';
import ProductsSection from '../components/ProductsSection.jsx';
import { useShop } from '../context/ShopContext.jsx';

export default function BestSellersPage() {
  const { bestSellers } = useShop();

  return (
    <Layout>
      <PageBanner
        eyebrow="Best Sellers"
        title="The flavors people reorder."
        subtitle="Our highest-rated, most-repurchased bottles — a safe place to start if you're new to Strip."
      />
      <ProductsSection
        id="bestsellers-list"
        productsOverride={bestSellers}
        title="Best sellers"
        subtitle="Ranked by repeat purchases and customer rating."
      />
    </Layout>
  );
}
