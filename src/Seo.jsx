import React from 'react';
import { Helmet } from 'react-helmet-async';

const siteName = 'Bluvera Exports';
const siteUrl = 'https://www.bluveraexports.com';
const canonicalUrl = 'https://www.bluveraexports.com';
const title = 'Bluvera Exports | Premium Ayurvedic Raw Materials Exporter from India';
const description = 'Bluvera Exports supplies premium Ayurvedic herbs, powders, roots, and extracts from India for pharmaceutical, nutraceutical, cosmetic, and food industries.';
const keywords = 'Ayurvedic raw materials, Ashwagandha exporter, Herbal exports India, Ayurvedic herbs supplier, Bluvera Exports';

const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/logo.jpg`,
  email: 'bluveraexports@gmail.com',
  telephone: '+91 9739541463',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'India',
    streetAddress: 'SF-208, 2nd floor, D Block, Greenaly Signature',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '560076',
  },
};

function Seo() {
  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content={siteName} />
      <meta name="application-name" content={siteName} />
      <meta name="theme-color" content="#0c5132" />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" href="/logo.jpg" sizes="32x32" />
      <link rel="apple-touch-icon" href="/logo.jpg" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={siteName} />
      <meta property="og:description" content="Premium Ayurvedic raw materials exporter from India" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content="/logo.jpg" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteName} />
      <meta name="twitter:description" content="Premium Ayurvedic raw materials exporter from India" />
      <meta name="twitter:image" content="/logo.jpg" />

      <script type="application/ld+json">{JSON.stringify(businessSchema)}</script>
    </Helmet>
  );
}

export default Seo;
