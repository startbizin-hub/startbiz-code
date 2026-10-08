/**
 * Post-build SEO pipeline for Cloudflare Workers + CRA SPA.
 * 1) Writes public/sitemap.xml + build/sitemap.xml
 * 2) Prerenders route-specific index.html shells (correct meta for crawlers)
 * 3) Generates a local WhatsApp QR image (no third-party QR host)
 */
const fs = require('fs');
const path = require('path');

const SITE = 'https://startbiz.in';
const ROOT = path.join(__dirname, '..');
const BUILD = path.join(ROOT, 'build');
const PUBLIC = path.join(ROOT, 'public');

function slugify(title) {
  return String(title)
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), 'utf8');
}

function extractQuoted(re, text) {
  const out = [];
  let m;
  const r = new RegExp(re, 'g');
  while ((m = r.exec(text))) out.push(m[1]);
  return out;
}

function extractStringProp(source, key) {
  const re = new RegExp(
    `${key}:\\s*\\n?\\s*(['"])((?:\\\\.|(?!\\1)[\\s\\S])*?)\\1`
  );
  const match = source.match(re);
  if (!match) return '';
  return match[2].replace(/\\'/g, "'").replace(/\\"/g, '"');
}

function pageUrl(routePath) {
  return `${SITE}${routePath === '/' ? '/' : routePath}`;
}

function breadcrumbLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: pageUrl(item.path),
    })),
  };
}

function webPageLd(route) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: route.title,
    description: route.description,
    url: pageUrl(route.canonicalPath || route.path),
    isPartOf: { '@id': `${SITE}/#website` },
    about: { '@id': `${SITE}/#organization` },
  };
}

function organizationLd(description, email) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE}/#organization`,
    name: 'startbiz.in',
    url: `${SITE}/`,
    logo: `${SITE}/images/logo-light.png`,
    image: `${SITE}/images/cover.webp`,
    description,
    telephone: '+917519221199',
    email,
    areaServed: { '@type': 'State', name: 'Maharashtra' },
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    sameAs: ['https://wa.me/917519221199'],
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

function websiteLd(description) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE}/#website`,
    url: `${SITE}/`,
    name: 'startbiz.in',
    description,
    publisher: { '@id': `${SITE}/#organization` },
  };
}

function serviceDescription(title) {
  return `Get expert help for ${title} from startbiz.in. Business consulting services for company registration, compliance and filings across Maharashtra, India.`;
}

function serviceLd(title, path, description, categoryName) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    description,
    url: pageUrl(path),
    provider: { '@id': `${SITE}/#organization` },
    areaServed: { '@type': 'State', name: 'Maharashtra' },
    serviceType: categoryName || 'Business Registration',
  };
}

function collectRoutes() {
  const catalog = read('src/data/serviceCatalog.js');
  const knowledge = read('src/data/knowledge.js');
  const industries = read('src/data/industries.js');
  const content = read('src/data/content.js');

  const seoTitle =
    extractStringProp(content, 'seoTitle') ||
    'startbiz.in | Business Registrations, Licences & Solutions in Maharashtra';
  const seoDescription =
    extractStringProp(content, 'seoDescription') ||
    "Don't know what your business needs? Startbiz helps you understand which registrations, licences and business services may be relevant — GST, MSME, Shop Act, company registration, FSSAI, trademark and more across Maharashtra.";
  const email = extractStringProp(content, 'email') || 'startbiz.in@gmail.com';

  const routes = [
    {
      path: '/',
      title: seoTitle,
      description: seoDescription,
      priority: '1.0',
      jsonLd: [organizationLd(seoDescription, email), websiteLd(seoDescription)],
    },
    {
      path: '/finder',
      title: 'Find My Business Requirements | startbiz.in',
      description:
        'Answer a few questions to see which registrations, licences and compliances may apply to your business. Guidance only — Startbiz can verify.',
      priority: '0.9',
    },
    {
      path: '/compare',
      title: 'Compare Business Structures | startbiz.in',
      description:
        'Compare proprietorship, LLP and private limited company on owners, liability, compliance and funding — then talk to Startbiz.',
      priority: '0.8',
    },
    {
      path: '/knowledge',
      title: 'Business Knowledge Centre | startbiz.in',
      description:
        'Guides on business structure, GST, Udyam, FSSAI and trademarks — written to help you decide what may apply before you file.',
      priority: '0.8',
    },
    {
      path: '/industries',
      title: 'Industry Solutions | startbiz.in',
      description:
        'Typical registration paths for restaurants, cloud kitchens, e-commerce, freelancers and construction businesses in India.',
      priority: '0.8',
    },
    {
      path: '/privacy-policy',
      title: 'Privacy Policy | startbiz.in',
      description:
        'How Startbiz.in collects, uses, stores and protects information provided through our website, forms, WhatsApp, email and related channels.',
      priority: '0.4',
    },
    {
      path: '/refund-cancellation-policy',
      title: 'Refund & Cancellation Policy | startbiz.in',
      description:
        'Startbiz.in refund and cancellation terms for business registration, licensing, certification and related professional assistance services.',
      priority: '0.4',
    },
    {
      path: '/terms-and-conditions',
      title: 'Terms & Conditions | startbiz.in',
      description:
        'Terms governing access to and use of the Startbiz.in website and business registration, compliance and related professional assistance services.',
      priority: '0.4',
    },
  ].map((route) => ({
    ...route,
    ogType: 'website',
    jsonLd: route.jsonLd || webPageLd(route),
  }));

  const categoryBlocks = [
    ...catalog.matchAll(
      /id:\s*'([^']+)'[\s\S]*?label:\s*'([^']+)'[\s\S]*?path:\s*'([^']+)'[\s\S]*?seoTitle:\s*\n?\s*'([^']+)'[\s\S]*?seoDescription:\s*\n?\s*'([^']+)'/g
    ),
  ];
  const menuById = new Map();
  categoryBlocks.forEach((m) => {
    const menu = { id: m[1], label: m[2], path: m[3], items: [] };
    menuById.set(menu.id, menu);
    const route = {
      path: menu.path,
      title: m[4],
      description: m[5],
      priority: '0.9',
      ogType: 'website',
    };
    route.jsonLd = breadcrumbLd([
      { name: 'Home', path: '/' },
      { name: menu.label, path: menu.path },
    ]);
    routes.push(route);
  });

  function pushService(title, categoryName, categoryPath, options = {}) {
    const slug = options.slug || slugify(title);
    const canonicalSlug = options.canonicalSlug || slug;
    const path = `/services/${slug}`;
    const canonicalPath = `/services/${canonicalSlug}`;
    if (routes.some((r) => r.path === path)) return;
    const description = serviceDescription(title);
    const route = {
      path,
      canonicalPath: canonicalPath === path ? undefined : canonicalPath,
      title: `${title} | startbiz.in Business Consulting Services`,
      description,
      keywords: [
        title.toLowerCase(),
        'business consulting services',
        'startbiz.in',
        categoryName ? categoryName.toLowerCase() : '',
        'Maharashtra',
        'India',
      ]
        .filter(Boolean)
        .join(', '),
      priority: options.priority || '0.8',
      includeInSitemap: canonicalPath === path,
      ogType: 'website',
    };
    route.jsonLd = [
      breadcrumbLd([
        { name: 'Home', path: '/' },
        ...(categoryPath ? [{ name: categoryName, path: categoryPath }] : []),
        { name: title, path: canonicalPath },
      ]),
      serviceLd(title, canonicalPath, description, categoryName),
    ];
    routes.push(route);
  }

  const menuStarts = [...categoryBlocks];
  menuStarts.forEach((m, index) => {
    const start = m.index + m[0].length;
    const end = index + 1 < menuStarts.length ? menuStarts[index + 1].index : catalog.length;
    const chunk = catalog.slice(start, end);
    const menu = menuById.get(m[1]);
    for (const block of chunk.matchAll(/items:\s*\[([\s\S]*?)\]/g)) {
      extractQuoted(/'([^']+)'/g, block[1]).forEach((title) => {
        menu.items.push(title);
        pushService(title, menu.label, menu.path);
      });
    }
  });

  categoryBlocks.forEach((m) => {
    const menu = menuById.get(m[1]);
    const route = routes.find((r) => r.path === menu.path);
    if (!route) return;
    route.keywords = [
      menu.label,
      'business consulting services',
      'startbiz.in',
      ...menu.items.slice(0, 8),
    ].join(', ');
  });

  for (const extra of catalog.matchAll(
    /\{\s*cat:\s*'([^']+)',\s*id:\s*'([^']+)',\s*title:\s*'([^']+)'\s*\}/g
  )) {
    const menu = menuById.get(extra[2]);
    pushService(extra[3], extra[1], menu ? menu.path : '', { priority: '0.7' });
  }

  const aliasBlock = catalog.match(/const slugAliases = \{([\s\S]*?)\};/);
  if (aliasBlock) {
    for (const pair of aliasBlock[1].matchAll(/'([^']+)':\s*'([^']+)'/g)) {
      const target = routes.find((r) => r.path === `/services/${pair[2]}`);
      if (!target) continue;
      pushService(target.title.split(' | ')[0], '', '', {
        slug: pair[1],
        canonicalSlug: pair[2],
        priority: '0.3',
      });
      const alias = routes.find((r) => r.path === `/services/${pair[1]}`);
      if (!alias) continue;
      alias.title = target.title;
      alias.description = target.description;
      alias.keywords = target.keywords;
      alias.jsonLd = target.jsonLd;
    }
  }

  extractQuoted(/slug:\s*'([^']+)'/g, knowledge).forEach((slug) => {
    const titleMatch = knowledge.match(
      new RegExp(`slug:\\s*'${slug}'[\\s\\S]*?title:\\s*'([^']+)'`)
    );
    const excerptMatch = knowledge.match(
      new RegExp(`slug:\\s*'${slug}'[\\s\\S]*?excerpt:\\s*\\n?\\s*'([^']+)'`)
    );
    const title = titleMatch ? titleMatch[1] : slug;
    const description =
      excerptMatch?.[1] ||
      'Business registration and compliance guidance from startbiz.in.';
    const path = `/knowledge/${slug}`;
    routes.push({
      path,
      title: `${title} | startbiz.in`,
      description,
      priority: '0.7',
      ogType: 'article',
      jsonLd: [
        breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Knowledge', path: '/knowledge' },
          { name: title, path },
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: title,
          description,
          author: { '@type': 'Organization', name: 'startbiz.in' },
          publisher: { '@type': 'Organization', name: 'startbiz.in' },
          mainEntityOfPage: pageUrl(path),
        },
      ],
    });
  });

  extractQuoted(/slug:\s*'([^']+)'/g, industries).forEach((slug) => {
    const titleMatch = industries.match(
      new RegExp(`slug:\\s*'${slug}'[\\s\\S]*?title:\\s*'([^']+)'`)
    );
    const summaryMatch = industries.match(
      new RegExp(`slug:\\s*'${slug}'[\\s\\S]*?summary:\\s*\\n?\\s*'([^']+)'`)
    );
    const name = titleMatch ? titleMatch[1] : slug;
    const description =
      summaryMatch?.[1] ||
      'Industry-specific business registration guidance from startbiz.in.';
    const path = `/industries/${slug}`;
    const route = {
      path,
      title: `${name} Registrations | startbiz.in`,
      description,
      priority: '0.7',
      ogType: 'website',
    };
    route.jsonLd = breadcrumbLd([
      { name: 'Home', path: '/' },
      { name: 'Industries', path: '/industries' },
      { name, path },
    ]);
    routes.push(route);
  });

  // Dedupe by path
  const seen = new Set();
  return routes.filter((r) => {
    if (seen.has(r.path)) return false;
    seen.add(r.path);
    return true;
  });
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function writeSitemap(routes) {
  const listed = routes.filter((r) => r.includeInSitemap !== false);
  const body = listed
    .map(
      (r) => `  <url>
    <loc>${SITE}${r.path === '/' ? '/' : r.path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${r.priority}</priority>
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
  fs.writeFileSync(path.join(PUBLIC, 'sitemap.xml'), xml);
  if (fs.existsSync(BUILD)) {
    fs.writeFileSync(path.join(BUILD, 'sitemap.xml'), xml);
  }
  return listed.length;
}

function jsonLdTag(data) {
  const json = JSON.stringify(data, null, 2).replace(/</g, '\\u003c');
  return `<script type="application/ld+json" id="startbiz-jsonld">\n${json}\n    </script>`;
}

function injectMeta(html, route) {
  const url = pageUrl(route.canonicalPath || route.path);
  const image = `${SITE}/images/cover.webp`;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);

  let out = html;
  out = out.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`);
  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/i,
    `<meta name="description" content="${description}" />`
  );
  if (route.keywords) {
    out = out.replace(
      /<meta\s+name="keywords"\s+content="[^"]*"\s*\/>/i,
      `<meta name="keywords" content="${escapeHtml(route.keywords)}" />`
    );
  }
  out = out.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/i,
    `<link rel="canonical" href="${url}" />`
  );
  out = out.replace(
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:type" content="${escapeHtml(route.ogType || 'website')}" />`
  );
  out = out.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:title" content="${title}" />`
  );
  out = out.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:description" content="${description}" />`
  );
  out = out.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:url" content="${url}" />`
  );
  out = out.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:image" content="${image}" />`
  );
  out = out.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/i,
    `<meta name="twitter:title" content="${title}" />`
  );
  out = out.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/i,
    `<meta name="twitter:description" content="${description}" />`
  );
  out = out.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/i,
    `<meta name="twitter:image" content="${image}" />`
  );
  if (route.jsonLd) {
    out = out.replace(
      /<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/i,
      jsonLdTag(route.jsonLd)
    );
  }

  // Help non-JS agents: visible fallback text
  if (!out.includes('data-seo-fallback')) {
    out = out.replace(
      '<div id="root"></div>',
      `<div id="root"></div>
    <noscript data-seo-fallback>
      <main style="font-family:system-ui,sans-serif;max-width:40rem;margin:2rem auto;padding:0 1rem">
        <h1>${title}</h1>
        <p>${description}</p>
        <p><a href="${SITE}/">startbiz.in</a> · Business registrations &amp; solutions across Maharashtra.</p>
      </main>
    </noscript>`
    );
  }

  return out;
}

function prerender(routes) {
  const indexPath = path.join(BUILD, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.warn('seo-build: build/index.html missing — skip prerender');
    return 0;
  }
  const baseHtml = fs.readFileSync(indexPath, 'utf8');
  let count = 0;

  routes.forEach((route) => {
    const html = injectMeta(baseHtml, route);
    if (route.path === '/') {
      fs.writeFileSync(indexPath, html);
      count += 1;
      return;
    }
    const dir = path.join(BUILD, route.path.replace(/^\//, ''));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
    count += 1;
  });

  return count;
}

async function writeWhatsAppQr() {
  const phone = '917519221199';
  const message = 'I need a business solutions';
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  let QRCode;
  try {
    QRCode = require('qrcode');
  } catch {
    console.warn('seo-build: qrcode package missing — skip QR generation');
    return;
  }

  const outPublic = path.join(PUBLIC, 'images', 'whatsapp-qr.png');
  const outBuild = path.join(BUILD, 'images', 'whatsapp-qr.png');
  await QRCode.toFile(outPublic, waUrl, {
    width: 512,
    margin: 2,
    color: { dark: '#0B1F22', light: '#FFFFFF' },
  });
  if (fs.existsSync(path.join(BUILD, 'images'))) {
    fs.copyFileSync(outPublic, outBuild);
  }
  console.log('seo-build: wrote WhatsApp QR → public/images/whatsapp-qr.png');
}

async function main() {
  const routes = collectRoutes();
  const sitemapCount = writeSitemap(routes);
  console.log(`seo-build: sitemap URLs = ${sitemapCount}`);

  if (fs.existsSync(BUILD)) {
    const prerendered = prerender(routes);
    console.log(`seo-build: prerendered HTML shells = ${prerendered}`);
  }

  await writeWhatsAppQr();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
