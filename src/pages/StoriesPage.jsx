import React from 'react';
import Layout from '../components/Layout.jsx';
import PageBanner from '../components/PageBanner.jsx';
import StoriesSection from '../components/StoriesSection.jsx';

export default function StoriesPage() {
  return (
    <Layout>
      <PageBanner
        eyebrow="Stories"
        title="From the field and the fridge."
        subtitle="Notes from our farms, our tasting panel, and the community that drinks with us."
      />
      <StoriesSection id="all-stories" title="All stories" />
    </Layout>
  );
}
