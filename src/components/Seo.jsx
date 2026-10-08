import { useEffect } from 'react';
import { brand } from '../data/content';
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_URL } from '../data/site';

function upsertMeta(selector, attr, value, createAttrs = {}) {
  if (value == null || value === '') return;
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    Object.entries(createAttrs).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function upsertLink(rel, href) {
  if (!href) return;
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(id, data) {
  const existing = document.getElementById(id);
  if (existing) existing.remove();
  if (!data) return;
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = id;
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
}

/**
 * Client-side SEO manager. Pair with build-time prerender (scripts/seo-build.cjs)
 * so crawlers also see correct tags in static HTML for each route.
 */
export default function Seo({
  title = brand.seoTitle,
  description = brand.seoDescription,
  keywords = brand.keywords.join(', '),
  path = '/',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noindex = false,
  jsonLd,
  jsonLdId = 'startbiz-jsonld',
}) {
  const url = absoluteUrl(path);
  const imageUrl = image?.startsWith('http') ? image : absoluteUrl(image);

  useEffect(() => {
    document.title = title;

    upsertMeta('meta[name="description"]', 'content', description, {
      name: 'description',
    });
    upsertMeta('meta[name="keywords"]', 'content', keywords, {
      name: 'keywords',
    });
    upsertMeta('meta[name="robots"]', 'content', noindex ? 'noindex, follow' : 'index, follow', {
      name: 'robots',
    });
    upsertMeta('meta[name="author"]', 'content', brand.name, { name: 'author' });

    upsertLink('canonical', url);

    upsertMeta('meta[property="og:type"]', 'content', type, { property: 'og:type' });
    upsertMeta('meta[property="og:site_name"]', 'content', brand.name, {
      property: 'og:site_name',
    });
    upsertMeta('meta[property="og:title"]', 'content', title, { property: 'og:title' });
    upsertMeta('meta[property="og:description"]', 'content', description, {
      property: 'og:description',
    });
    upsertMeta('meta[property="og:url"]', 'content', url, { property: 'og:url' });
    upsertMeta('meta[property="og:image"]', 'content', imageUrl, {
      property: 'og:image',
    });
    upsertMeta('meta[property="og:locale"]', 'content', 'en_IN', {
      property: 'og:locale',
    });

    upsertMeta('meta[name="twitter:card"]', 'content', 'summary_large_image', {
      name: 'twitter:card',
    });
    upsertMeta('meta[name="twitter:title"]', 'content', title, {
      name: 'twitter:title',
    });
    upsertMeta('meta[name="twitter:description"]', 'content', description, {
      name: 'twitter:description',
    });
    upsertMeta('meta[name="twitter:image"]', 'content', imageUrl, {
      name: 'twitter:image',
    });

    upsertJsonLd(jsonLdId, jsonLd);

    return () => {
      // Keep tags for next page; next Seo effect overwrites.
    };
  }, [title, description, keywords, url, imageUrl, type, noindex, jsonLd, jsonLdId]);

  return null;
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    name: brand.name,
    url: `${SITE_URL}/`,
    logo: absoluteUrl('/images/logo-light.png'),
    image: DEFAULT_OG_IMAGE,
    description: brand.seoDescription,
    telephone: brand.phoneHref.replace('tel:', ''),
    email: brand.email,
    areaServed: { '@type': 'State', name: 'Maharashtra' },
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    sameAs: [`https://wa.me/${brand.whatsapp}`],
    serviceType: [
      'Business Consulting Services',
      'Company Registration',
      'GST Registration',
      'MSME Registration',
      'Trademark Registration',
      'FSSAI Licence',
      'Shop Act Registration',
    ],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: brand.name,
    description: brand.seoDescription,
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export function serviceSchema({ name, description, path, category }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: absoluteUrl(path),
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: { '@type': 'State', name: 'Maharashtra' },
    serviceType: category || 'Business Registration',
  };
}
