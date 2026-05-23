import React from 'react';
import { Helmet } from 'react-helmet-async';

const siteName = 'Bluvera Exports';
const siteUrl = 'https://www.bluveraexports.com';
const canonicalUrl = `${siteUrl}/`;
const title = 'Bluvera Exports | Global Import & Export Solutions';
const description = 'Bluvera Exports provides international import and export services with reliable global trade solutions and quality products.';
const keywords = [
  'exports',
  'imports',
  'international trade',
  'logistics',
  'global business',
  'export services',
  'import services',
  'supply chain',
  'global trade solutions',
];

const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/logo.jpg`,
  email: 'bluveraexports@gmail.com',
  telephone: '+91 97395 41463',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'SF-208, 2nd floor, D Block, Greenaly Signature',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '560076',
    addressCountry: 'IN',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteName,
  url: siteUrl,
};

function Seo() {
  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content={siteName} />
      <meta name="application-name" content={siteName} />
      <meta name="theme-color" content="#0c5132" />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" href="/logo.jpg" sizes="32x32" />
      <link rel="apple-touch-icon" href="/logo.jpg" />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`${siteUrl}/hero.jpg`} />
      <meta property="og:image:alt" content="Bluvera Exports import and export solutions" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}/hero.jpg`} />

      <script type="application/ld+json">{JSON.stringify(businessSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
    </Helmet>
  );
}

export default Seo;