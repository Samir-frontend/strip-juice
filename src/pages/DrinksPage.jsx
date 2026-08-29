import React from 'react';
import Layout from '../components/Layout.jsx';
import PageBanner from '../components/PageBanner.jsx';
import ProductsSection from '../components/ProductsSection.jsx';
import { useShop } from '../context/ShopContext.jsx';

export default function DrinksPage() {
  const { products, topBuying, newArrivals } = useShop();

  return (
    <Layout>
      <PageBanner
        eyebrow="Shop"
        title="Every flavor we make."
        subtitle="Real fruit extracts, electrolyte-balanced, and always free of artificial colors or preservatives."
      />
      <ProductsSection
        id="new-arrivals"
        productsOverride={newArrivals}
        title="New Arrivals"
        subtitle="The newest additions to the lineup — added this season."
      />
      <ProductsSection
        id="top-buying"
        productsOverride={topBuying}
        title="Top buying drinks"
        subtitle="What's moving fastest across all Strip orders this month."
      />
      <ProductsSection
        id="all-drinks"
        productsOverride={products}
        title="All flavors"
        subtitle="The complete lineup — click any bottle for the full story, ratings, and to add it to your cart."
      />
    </Layout>
  );
}
