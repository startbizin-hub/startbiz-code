import { asset } from '../utils/asset';
/** Mega-nav + service catalogue aligned to LegalWiz.in structure (no prices / competitor stats) */

export function slugify(title) {
  return title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Four primary navbar dropdown tabs */
export const megaMenus = [
  {
    id: 'start-business',
    label: 'Start a Business',
    shortLabel: 'Start',
    path: '/category/start-business',
    description:
      'Company registration and business formation services for startups and MSMEs across India.',
    seoTitle:
      'Start a Business in India | Company Registration Services | startbiz.in',
    seoDescription:
      'Register Private Limited Company, LLP, OPC, Partnership, Sole Proprietorship and more with startbiz.in business consulting services in Maharashtra and India.',
    groups: [
      {
        label: 'Popular Options',
        items: [
          'Private Limited Company Registration',
          'Limited Liability Partnership Registration',
          'One Person Company Registration',
          'Partnership Firm Registration',
          'Sole Proprietorship Firm Registration',
        ],
      },
      {
        label: 'Special Business Entities',
        items: [
          'Register an Indian Subsidiary',
          'Section 8 Company Registration',
          'Producer Company Registration',
        ],
      },
    ],
  },
  {
    id: 'intellectual-property',
    label: 'Protect Your Business',
    shortLabel: 'Protect',
    path: '/category/intellectual-property',
    description:
      'Protect your brand, inventions, and creative works with trademark, patent, and copyright support.',
    seoTitle:
      'Intellectual Property Services | Trademark, Patent & Copyright | startbiz.in',
    seoDescription:
      'Trademark registration, patent filing, copyright and IP protection services from startbiz.in — expert business consulting across India.',
    groups: [
      {
        label: 'Trademark',
        items: [
          'Trademark Registration',
          'Trademark Objection Reply',
          'Trademark Opposition',
          'Trademark Assignment',
          'Trademark Renewal',
        ],
      },
      {
        label: 'Patent',
        items: ['Patent Search', 'Provisional Patent', 'Permanent Patent'],
      },
      {
        label: 'Copyright',
        items: ['Copyright Registration'],
      },
    ],
  },
  {
    id: 'business-change',
    label: 'Change in Business',
    hideFromNav: true,
    path: '/category/business-change',
    description:
      'Convert, update, or close your business structure with guided compliance support.',
    seoTitle:
      'Change in Business | Conversion, Updates & Closure | startbiz.in',
    seoDescription:
      'Business conversion, director changes, registered office updates, and closure services with startbiz.in business consulting experts.',
    groups: [
      {
        label: 'Select Conversion Type',
        items: [
          'Proprietorship to Partnership',
          'Proprietorship to LLP',
          'Proprietorship to Private Limited Company',
          'Proprietorship to OPC',
          'Partnership to LLP',
          'Partnership to Private Limited Company',
          'LLP to Private Limited Company',
          'OPC to Private Limited Company',
          'Private Limited Company to LLP',
          'Private Company to Public Company',
        ],
      },
      {
        label: 'Update Corporate Information',
        items: [
          'Add or Remove a Director',
          'Add or Remove a Partner (LLP)',
          'Change Business Activity',
          'Change Registered Office',
          'Change Company Name',
          'Change LLP Agreement',
          'Change Partnership Deed',
          'Increase Authorised Share Capital',
        ],
      },
      {
        label: 'Close a Business',
        items: [
          'Close a Private Limited Company',
          'Close a Limited Liability Partnership',
          'Close a One Person Company',
          'Dissolve a Partnership Firm',
        ],
      },
    ],
  },
  {
    id: 'registrations-filings',
    label: 'Registrations & Licences',
    shortLabel: 'Registrations',
    path: '/category/registrations-filings',
    description:
      'GST, MSME, licences, tax filings and government registrations for compliant business growth.',
    seoTitle:
      'Registrations & Filings | GST, MSME, Licences & Tax | startbiz.in',
    seoDescription:
      'GST registration, MSME, FSSAI, IEC, Shop Act, DSC and tax filing support from startbiz.in business consulting services across Maharashtra.',
    groups: [
      {
        label: 'Government Registrations',
        items: [
          'GST Registration',
          'Udyam MSME Registration',
          'Shop & Establishment Registration',
          'Professional Tax Registration',
          'PAN Application',
          'TAN Application',
          'Startup India Registration',
          'LUT under GST',
          'ESI Registration',
          'DSC Registration',
        ],
      },
      {
        label: 'Business Licences',
        items: [
          'FSSAI Registration',
          'Import Export Code Registration',
          'Trade License',
          'ISO Certification',
          'Drug License',
          'EPF Registration',
        ],
      },
      {
        label: 'Tax & Compliance',
        items: [
          'GST Return Filing',
          'ITR Filing',
          'e-Way Bill',
          'TDS Return Filing',
        ],
      },
    ],
  },
  {
    id: 'grow-your-business',
    label: 'Grow Your Business',
    shortLabel: 'Grow',
    path: '/category/grow-your-business',
    description:
      'Advisory, funding, branding and expansion support after the right registrations are in place.',
    seoTitle: 'Grow Your Business | Consultancy, Funding & Expansion | startbiz.in',
    seoDescription:
      'Business consultancy, plans, funding assistance, branding and expansion support from startbiz.in — after you know which registrations actually apply.',
    groups: [
      {
        label: 'Advisory & Expansion',
        items: [
          'Business Consultancy',
          'Business Plan Preparation',
          'Funding Assistance',
          'Branding & Digital Marketing',
          'Business Process Support',
          'Franchise & Business Expansion',
        ],
      },
    ],
  },
];

const imageMap = {
  'gst-registration': asset('/images/services/gst-registration.png'),
  'limited-liability-partnership-registration': asset(
    '/images/services/limited-liability-partnership-registration.png'
  ),
  'shop-and-establishment-registration': asset(
    '/images/services/shop-and-establishment-registration.png'
  ),
  'fssai-registration': asset('/images/services/fssai-registration.png'),
  'partnership-firm-registration': asset(
    '/images/services/partnership-firm-registration.png'
  ),
  'udyam-msme-registration': asset('/images/services/udyam-msme-registration.png'),
  'one-person-company-registration': asset(
    '/images/services/one-person-company-registration.png'
  ),
  'private-limited-company-registration': asset(
    '/images/services/private-limited-company-registration.png'
  ),
  'trademark-registration': asset('/images/services/trademark-registration.png'),
  'import-export-code-registration': asset(
    '/images/services/import-export-code-registration.png'
  ),
  'iso-certification': asset('/images/services/iso-certification.png'),
};

const featuredSlugs = new Set(Object.keys(imageMap));

const contentTemplates = {
  'start-business': {
    about: (title) =>
      `${title} is a formal way to establish your venture in India with the right legal structure. startbiz.in helps entrepreneurs complete documentation, filings, and compliance so you can launch with clarity and confidence.`,
    points: [
      'Limited liability / clear ownership structure (as applicable)',
      'Separate legal identity for the business',
      'Improved credibility with banks, clients & partners',
      'Expert documentation and filing support',
      'Guidance on post-registration compliance',
    ],
    whoCanApply: [
      'Startups and first-time founders',
      'MSMEs and growing businesses',
      'Professionals forming a firm',
      'Entrepreneurs expanding operations',
    ],
    documents: [
      'PAN Card of promoters / partners',
      'Aadhaar Card',
      'Passport-size photographs',
      'Address proof of registered office',
      'Identity proof (Voter ID / Passport / Driving Licence)',
      'NOC / rent agreement (if applicable)',
    ],
    process: [
      'Share business details & preferred structure',
      'Document collection & verification',
      'Name / application preparation',
      'Government filing & follow-up',
      'Certificate / approval issuance',
      'Post-registration guidance',
    ],
  },
  'intellectual-property': {
    about: (title) =>
      `${title} helps protect your brand, invention, or creative work under Indian IP laws. startbiz.in provides end-to-end business consulting support for search, filing, and follow-ups.`,
    points: [
      'Legal protection for your brand or creation',
      'Stronger market credibility and trust',
      'Support against misuse and copying',
      'Expert filing and documentation help',
      'Clear process guidance till completion',
    ],
    whoCanApply: [
      'Startups and brand owners',
      'Individuals and freelancers',
      'MSMEs and manufacturers',
      'Companies and LLPs',
    ],
    documents: [
      'Applicant PAN & Aadhaar',
      'Brand / logo / work samples (as applicable)',
      'Business registration proof (if any)',
      'Address proof',
      'Power of Attorney (if required)',
    ],
    process: [
      'Requirement discussion & eligibility check',
      'Search / assessment (where applicable)',
      'Application drafting & filing',
      'Examination / response support',
      'Registration / grant follow-up',
    ],
  },
  'business-change': {
    about: (title) =>
      `${title} involves updating your business structure or records with the relevant authorities. startbiz.in guides you through documentation, filings, and compliance so changes stay accurate and timely.`,
    points: [
      'Structured conversion or update process',
      'Compliance with MCA / local regulations',
      'Documentation checklist and filing support',
      'Reduced risk of incomplete applications',
      'Clear guidance for next compliance steps',
    ],
    whoCanApply: [
      'Existing proprietorships and partnerships',
      'LLPs and private limited companies',
      'Directors and partners seeking updates',
      'Businesses planning restructuring',
    ],
    documents: [
      'Existing registration certificates',
      'PAN / Aadhaar of stakeholders',
      'Board / partner resolutions (as applicable)',
      'Updated address / identity proofs',
      'Supporting agreements or deeds',
    ],
    process: [
      'Assess current structure & required change',
      'Prepare documents and resolutions',
      'File applications with authorities',
      'Track status and respond to queries',
      'Receive updated approvals / records',
    ],
  },
  'registrations-filings': {
    about: (title) =>
      `${title} is an important compliance step for businesses operating in India. startbiz.in assists with documentation, online filings, and follow-up so your registrations and returns stay on track.`,
    points: [
      'Hassle-free application / filing support',
      'Checklist-based documentation help',
      'Faster turnaround with expert guidance',
      'Suitable for startups and MSMEs',
      'Ongoing compliance support when needed',
    ],
    whoCanApply: [
      'New and existing businesses',
      'Traders, manufacturers and service providers',
      'Professionals and freelancers (as applicable)',
      'Exporters / importers (for relevant services)',
    ],
    documents: [
      'PAN Card',
      'Aadhaar Card',
      'Business address proof',
      'Bank details / cancelled cheque (if required)',
      'GST / registration proofs (if already available)',
      'Photographs and authorisation letters (as needed)',
    ],
    process: [
      'Understand eligibility and requirements',
      'Collect and verify documents',
      'Prepare and submit application / return',
      'Track status with the department',
      'Share approval / acknowledgement',
    ],
  },
  'grow-your-business': {
    about: (title) =>
      `${title} supports businesses after the core structure and registrations are clear. startbiz.in helps with practical next steps — planning, visibility, funding conversations and expansion — subject to your stage and goals.`,
    points: [
      'Advice based on your current registrations and goals',
      'Clearer next-step planning',
      'Support beyond a one-time filing',
      'Useful after the essential licences are mapped',
      'Conversation-led, not a generic add-on bundle',
    ],
    whoCanApply: [
      'Registered businesses planning to grow',
      'Founders who already know their structure',
      'Owners exploring funding or expansion',
      'Operators who want process or brand support',
    ],
    documents: [
      'Existing registration certificates (as available)',
      'PAN / Aadhaar of stakeholders',
      'Brief note on current activity and goals',
      'Financial summary if funding is discussed',
    ],
    process: [
      'Understand your current setup and goal',
      'Identify gaps versus the growth plan',
      'Recommend relevant next steps only',
      'Support documentation where filing is needed',
      'Review progress and compliance calendar',
    ],
  },
};

function enrichService(title, menuId, menuLabel, groupLabel) {
  const slug = slugify(title);
  const tpl = contentTemplates[menuId] || contentTemplates['registrations-filings'];
  return {
    slug,
    title,
    category: menuLabel,
    categoryId: menuId,
    group: groupLabel,
    summary: `${title} with startbiz.in — expert business consulting services for startups and MSMEs across Maharashtra and India.`,
    about: tpl.about(title),
    points: tpl.points,
    whoCanApply: tpl.whoCanApply,
    documents: tpl.documents,
    process: tpl.process,
    whyNeeded: [
      'Legal compliance for business operations',
      'Stronger credibility with customers and partners',
      'Access to formal banking and growth opportunities',
      'Clear records for future expansion',
    ],
    featured: featuredSlugs.has(slug),
    image: imageMap[slug],
    seoTitle: `${title} | startbiz.in Business Consulting Services`,
    seoDescription: `Get expert help for ${title} from startbiz.in. Business consulting services for company registration, compliance and filings across Maharashtra, India.`,
    keywords: [
      title.toLowerCase(),
      'business consulting services',
      'startbiz.in',
      menuLabel.toLowerCase(),
      'Maharashtra',
      'India',
    ],
  };
}

let nextId = 1;
const catalogServices = [];

megaMenus.forEach((menu) => {
  menu.groups.forEach((group) => {
    group.items.forEach((title) => {
      catalogServices.push({
        id: nextId++,
        ...enrichService(title, menu.id, menu.label, group.label),
      });
    });
  });
});

/** Extra catalogue services (search / home) beyond the 4 nav tabs */
const extraServices = [
  { cat: 'Intellectual Property', id: 'intellectual-property', title: 'Design Registration' },
  { cat: 'Registrations & Filings', id: 'registrations-filings', title: 'ISO Certification' },
  { cat: 'Registrations & Filings', id: 'registrations-filings', title: 'EPF Registration' },
  { cat: 'Registrations & Filings', id: 'registrations-filings', title: 'Trade License' },
  { cat: 'Registrations & Filings', id: 'registrations-filings', title: 'Drug License' },
];

extraServices.forEach(({ cat, id, title }) => {
  const slug = slugify(title);
  if (!catalogServices.some((s) => s.slug === slug)) {
    catalogServices.push({
      id: nextId++,
      ...enrichService(title, id, cat, 'Additional Services'),
      image: title === 'ISO Certification' ? asset('/images/services/iso-certification.png') : undefined,
      featured: title === 'ISO Certification',
    });
  }
});

const slugAliases = {
  'llp-registration': 'limited-liability-partnership-registration',
  'shop-act-registration': 'shop-and-establishment-registration',
  'fssai-food-license': 'fssai-registration',
  'msme-registration': 'udyam-msme-registration',
  'import-export-registration': 'import-export-code-registration',
};

Object.entries(slugAliases).forEach(([alias, target]) => {
  const targetService = catalogServices.find((s) => s.slug === target);
  if (targetService && !catalogServices.some((s) => s.slug === alias)) {
    catalogServices.push({
      ...targetService,
      id: nextId++,
      slug: alias,
      aliasOf: target,
    });
  }
});

export const allServices = catalogServices;

export const serviceCategories = megaMenus.map((menu) => ({
  id: menu.id,
  label: menu.label,
  path: menu.path,
  description: menu.description,
  items: menu.groups.flatMap((g) => g.items),
  groups: menu.groups,
}));

export const featuredServices = allServices.filter((s) => s.featured && !s.aliasOf);

export const serviceCount = allServices.filter((s) => !s.aliasOf).length;

export function getMegaMenuById(id) {
  return megaMenus.find((m) => m.id === id);
}

export function getServicesByCategoryId(categoryId) {
  return allServices.filter((s) => s.categoryId === categoryId && !s.aliasOf);
}

export function searchServices(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return allServices
    .filter((s) => !s.aliasOf)
    .filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.group?.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q)
    )
    .slice(0, 12);
}

export function getCatalogServiceBySlug(slug) {
  const resolved = slugAliases[slug] || slug;
  return (
    allServices.find((s) => s.slug === slug && !s.aliasOf) ||
    allServices.find((s) => s.slug === resolved && !s.aliasOf) ||
    allServices.find((s) => s.slug === slug)
  );
}

export function getRelatedByCategory(slug, limit = 3) {
  const current = getCatalogServiceBySlug(slug);
  if (!current) {
    return allServices.filter((s) => !s.aliasOf && s.slug !== slug).slice(0, limit);
  }
  const same = allServices.filter(
    (s) => !s.aliasOf && s.categoryId === current.categoryId && s.slug !== current.slug
  );
  if (same.length >= limit) return same.slice(0, limit);
  const extra = allServices
    .filter((s) => !s.aliasOf && s.slug !== current.slug && !same.some((x) => x.slug === s.slug))
    .slice(0, limit - same.length);
  return [...same, ...extra];
}
