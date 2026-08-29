import React from 'react';
import Layout from '../components/Layout.jsx';
import PageBanner from '../components/PageBanner.jsx';
import AboutSection from '../components/AboutSection.jsx';
import ReviewsSection from '../components/ReviewsSection.jsx';

export default function AboutPage() {
  return (
    <Layout>
      <PageBanner
        eyebrow="About Strip"
        title="Hydration built for people who don't sit still."
        subtitle="Small-batch, farm-sourced, and tested until it's something we'd actually reach for mid-run."
      />
      <AboutSection id="about-full" preview={false} />
      <ReviewsSection />
    </Layout>
  );
}
