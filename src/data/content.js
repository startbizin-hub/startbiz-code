import {
  allServices as catalogAll,
  getCatalogServiceBySlug,
  getRelatedByCategory,
} from './serviceCatalog';
import { asset } from '../utils/asset';
import { needPrompts } from './finder';
import { STANDARD_PROCESS, pricingNote, serviceGuides } from './serviceGuides';

export {
  allServices,
  featuredServices,
  searchServices,
  serviceCategories,
  serviceCount,
  getCatalogServiceBySlug,
  megaMenus,
  getMegaMenuById,
  getServicesByCategoryId,
  getRelatedByCategory,
  slugify,
} from './serviceCatalog';

export const brand = {
  name: 'startbiz.in',
  shortName: 'StartBiz',
  domain: 'startbiz.in',
  tagline: "From Idea to Business Growth — We're With You",
  supportLine:
    "Tell us what you want to achieve. We'll help you understand what you need and what to do next.",
  seoTitle:
    'startbiz.in | Business Registrations, Licences & Solutions in Maharashtra',
  seoDescription:
    "Don't know what your business needs? Startbiz helps you understand which registrations, licences and business services may be relevant — GST, MSME, Shop Act, company registration, FSSAI, trademark and more across Maharashtra.",
  keywords: [
    'business consulting services',
    'business consulting India',
    'startup consulting',
    'company registration',
    'GST registration',
    'MSME registration',
    'Udyam registration',
    'trademark registration',
    'private limited company registration',
    'LLP registration',
    'FSSAI food license',
    'Shop Act registration',
    'Import Export Code',
    'GeM registration',
    'business compliance Maharashtra',
    'start a business Maharashtra',
    'startbiz.in',
  ],
  phone: '+91 75192 21199',
  phoneHref: 'tel:+917519221199',
  whatsapp: '917519221199',
  whatsappMessage:
    'Hello Startbiz, I need help with my business.\nMy business type is ________.\nI want to ________.',
  email: 'startbiz.in@gmail.com',
  emailHref: 'mailto:startbiz.in@gmail.com',
  contactPerson: 'Amol Ghoderao',
  logo: asset('/images/logo-transparent.png'),
  logoDark: asset('/images/logo-transparent.png'),
  cover: asset('/images/cover.webp'),
  texture: asset('/textures/asfalt-dark.png'),
  textureAlt: asset('/textures/debut-dark.png'),
  textureLight: asset('/textures/light-paper-fibers.png'),
  hours: [
    { day: 'Monday', time: '09:00 – 18:00' },
    { day: 'Tuesday', time: '09:00 – 18:00' },
    { day: 'Wednesday', time: '09:00 – 18:00' },
    { day: 'Thursday', time: '09:00 – 18:00' },
    { day: 'Friday', time: '09:00 – 18:00' },
    { day: 'Saturday', time: '09:00 – 18:00' },
    { day: 'Sunday', time: 'Closed' },
  ],
};

export function getWhatsAppUrl(message = brand.whatsappMessage) {
  return `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const whatsappHref = getWhatsAppUrl();


export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Start a Business', to: '/category/start-business' },
  { label: 'Business Services', to: '/#services' },
  { label: 'Find Requirements', to: '/finder' },
  { label: 'About Startbiz', to: '/#about' },
  { label: 'Contact', to: '/#contact' },
];

export const features = [
  {
    title: 'We Start With Your Business',
    description:
      'We understand your business situation before suggesting relevant services.',
  },
  {
    title: 'Get a Clear Business Roadmap',
    description:
      'What you may need → Why → Documents → Process → Next Step',
  },
  {
    title: 'Multiple Requirements. One Place.',
    description:
      'Business registrations, licences, certifications, brand protection and growth support.',
  },
  {
    title: 'Solutions Based on Your Situation',
    description:
      'Different businesses have different requirements. We help you identify what may be relevant to yours.',
  },
  {
    title: 'Transparent Before You Proceed',
    description:
      'Understand requirements, documents, process and expected charges before proceeding.',
  },
  {
    title: 'Support Beyond Registration',
    description:
      'Return to Startbiz as your business changes and grows.',
  },
  {
    title: 'Maharashtra-Wide Support',
    description:
      'Support for entrepreneurs and businesses across Maharashtra.',
  },
];

export const trustStats = [
  { value: '500+', label: 'Businesses Served' },
  { value: 'MH', label: 'Maharashtra-Wide Support' },
  { value: '66+', label: 'Business Services' },
  { value: '1', label: 'Clear Next Step' },
];

export const aboutText = `Starting or running a business can involve registrations, licences, compliance, documentation and many decisions. Startbiz helps you understand your business requirements and find the right next step. Whether you're starting a new business, running an existing business or planning to grow, tell us what you want to achieve and explore the registrations, licences, certifications and business solutions that may be relevant. From proprietorship, partnership, LLP, OPC and Private Limited company registration to GST, Shop & Establishment, Udyam/MSME, FSSAI, Trademark, Import Export and government business support, Startbiz brings multiple business requirements together in one place. Our approach is simple: Understand your business → Identify your requirements → Explain your options → Help you take the next step.`;

export const aboutDifferentiators = [
  {
    title: 'Start With Your Requirement',
    text: "You don't have to know the name of the registration or licence you need. Tell us what you're trying to achieve.",
  },
  {
    title: 'Get a Clear Direction',
    text: 'We help you understand relevant requirements, documents, processes and possible next steps.',
  },
  {
    title: 'Multiple Business Solutions',
    text: 'Access support across business setup, registrations, licences, brand protection, certifications and growth.',
  },
  {
    title: 'Support as Your Business Grows',
    text: 'Your requirements can change as your business changes. Startbiz is designed to support you beyond the first registration.',
  },
];

export const exploreSolutions = [
  {
    title: 'Starting a new business?',
    text: 'Understand your structure and initial registrations.',
    to: '/category/start-business',
    image: asset('/images/solutions/start-business.jpg'),
  },
  {
    title: 'Starting a food business?',
    text: 'Explore FSSAI and other potentially relevant requirements.',
    to: '/services/fssai-registration',
    image: asset('/images/solutions/food-business.jpg'),
  },
  {
    title: 'Selling products online?',
    text: 'Check GST and other requirements for your sales model.',
    to: '/finder?stage=running',
    image: asset('/images/solutions/online-business.jpg'),
  },
  {
    title: 'Planning to grow?',
    text: 'Explore MSME, certification and business expansion support.',
    to: '/category/grow-your-business',
    image: asset('/images/solutions/grow-business.jpg'),
  },
];

export const services = [
  {
    id: 1,
    slug: 'gst-registration',
    title: 'GST Registration',
    image: asset('/images/services/gst-registration.png'),
    summary:
      'GST registration is essential for businesses operating in India. startbiz.in business consulting services help you complete GST registration quickly, accurately, and with full documentation support.',
    points: [
      'Expert guidance through the registration process',
      'Quick and hassle-free service',
      'Assistance with required documentation',
      'Support for GST compliance and filing',
      'Affordable pricing for all business sizes',
    ],
  },
  {
    id: 2,
    slug: 'llp-registration',
    title: 'LLP Registration',
    image: asset('/images/services/limited-liability-partnership-registration.png'),
    summary:
      'LLP registration made easy with startbiz.in. Our business consulting services guide you through Limited Liability Partnership registration with full compliance support.',
    points: [
      'Seamless online registration process',
      'Expert assistance in documentation',
      'Quick turnaround time for approvals',
      'Cost-effective service packages',
      'Post-registration support and guidance',
    ],
  },
  {
    id: 3,
    slug: 'shop-act-registration',
    title: 'Shop Act Registration',
    image: asset('/images/services/shop-and-establishment-registration.png'),
    summary:
      'Shop Act registration is required for businesses to operate legally in their state. startbiz.in simplifies Shop Act registration with expert documentation and compliance guidance.',
    points: [
      'Quick and easy registration process',
      'Assistance with required documentation',
      'Guidance on legal compliance and regulations',
      'Dedicated support from experienced professionals',
      'Affordable pricing for all business types',
    ],
  },
  {
    id: 4,
    slug: 'fssai-food-license',
    title: 'FSSAI Food License',
    image: asset('/images/services/fssai-registration.png'),
    summary:
      'FSSAI food license is essential for food businesses in India. Get fast FSSAI registration and renewal support through startbiz.in business consulting services.',
    points: [
      'Expert guidance throughout the application process',
      'Quick processing time for license acquisition',
      'Assistance with documentation and compliance',
      'Affordable service fees for small and large businesses',
      'Ongoing support for license renewal and updates',
    ],
  },
  {
    id: 5,
    slug: 'partnership-firm-registration',
    title: 'Partnership Firm Registration',
    image: asset('/images/services/partnership-firm-registration.png'),
    summary:
      'Partnership firm registration establishes a formal business structure. startbiz.in handles partnership registration paperwork and legal compliance for entrepreneurs across India.',
    points: [
      'Expert guidance through the registration process',
      'Assistance with required documentation and compliance',
      'Quick turnaround time for registration completion',
      'Affordable pricing tailored to your business needs',
      'Ongoing support for future legal requirements',
    ],
  },
  {
    id: 6,
    slug: 'msme-registration',
    title: 'MSME Registration',
    image: asset('/images/services/udyam-msme-registration.png'),
    summary:
      'MSME registration helps small and medium enterprises unlock government schemes and benefits. startbiz.in streamlines MSME registration for startups and growing businesses across India.',
    points: [
      'Quick and hassle-free registration process',
      'Access to government schemes and financial support',
      'Eligibility for subsidies and grants',
      'Enhanced credibility and visibility in the market',
      'Expert assistance and guidance throughout the process',
    ],
  },
  {
    id: 7,
    slug: 'one-person-company-registration',
    title: 'One Person Company Registration',
    image: asset('/images/services/one-person-company-registration.png'),
    summary:
      'One Person Company (OPC) registration lets sole founders enjoy limited liability. startbiz.in provides startup consulting for fast, compliant OPC registration in India.',
    points: [
      'Quick and hassle-free registration process',
      'Expert assistance for all required documentation',
      'Compliance with regulatory norms and guidelines',
      'Affordable packages tailored for individual entrepreneurs',
      'Ongoing support for business growth and management',
    ],
  },
  {
    id: 8,
    slug: 'private-limited-company-registration',
    title: 'Private Limited Company Registration',
    image: asset('/images/services/private-limited-company-registration.png'),
    summary:
      'Private limited company registration made simple with startbiz.in. Our business consulting experts handle documentation, compliance, and filings so you can launch faster.',
    points: [
      'Quick and hassle-free registration process',
      'Expert guidance on legal requirements',
      'Assistance with required documentation',
      'Support for obtaining necessary licenses',
      'Dedicated customer service throughout the process',
    ],
  },
  {
    id: 9,
    slug: 'trademark-registration',
    title: 'Trademark Registration',
    image: asset('/images/services/trademark-registration.png'),
    summary:
      'Trademark registration protects your business name, logo, brand name, and tagline. Get expert trademark registration support from startbiz.in business consulting services.',
    about:
      'Trademark म्हणजे काय? Trademark (TM) हे तुमच्या व्यवसायाचे नाव, लोगो, ब्रँड नाव, टॅगलाइन किंवा चिन्ह यांचे कायदेशीर संरक्षण करते. त्यामुळे इतर कोणीही तुमचा ब्रँड वापरू शकत नाही.',
    points: [
      'Brand Protection',
      'Exclusive Legal Rights',
      'Brand Value वाढते',
      'Copying पासून संरक्षण',
      'Customer Trust वाढतो',
      '® Symbol वापरण्याचा अधिकार',
      'Business Expansion साठी उपयुक्त',
    ],
    whoCanApply: [
      'Proprietorship Firm',
      'Partnership Firm',
      'LLP',
      'Private Limited Company',
      'One Person Company (OPC)',
      'Startups',
      'Individuals',
    ],
    documents: [
      'PAN Card',
      'Aadhaar Card',
      'Logo (असल्यास)',
      'Business Registration Proof',
      'Address Proof',
      'MSME Certificate (असल्यास)',
    ],
    process: [
      'Trademark Search',
      'Application Filing',
      'Government Examination',
      'Objection Reply (असल्यास)',
      'Journal Publication',
      'Trademark Registration Certificate',
    ],
  },
  {
    id: 10,
    slug: 'iso-certification',
    title: 'ISO Certification',
    image: asset('/images/services/iso-certification.png'),
    summary:
      'ISO certification demonstrates your business quality and reliability. startbiz.in helps startups and MSMEs obtain ISO certification for tenders, trust, and market growth.',
    about:
      'ISO Certification म्हणजे काय? ISO (International Organization for Standardization) Certification हे तुमच्या व्यवसायाच्या गुणवत्ता, कार्यपद्धती आणि विश्वासार्हतेचे आंतरराष्ट्रीय प्रमाणपत्र आहे. यामुळे ग्राहकांचा विश्वास वाढतो आणि व्यवसायाची प्रतिमा मजबूत होते.',
    points: [
      'International Recognition',
      'Customer Trust वाढतो',
      'Business Credibility वाढते',
      'Government & Private Tenders साठी उपयुक्त',
      'Better Quality Management',
      'Risk Management सुधारते',
      'Market Expansion साठी मदत',
      'Competitive Advantage मिळतो',
    ],
    types: [
      'ISO 9001 – Quality Management System',
      'ISO 14001 – Environmental Management',
      'ISO 45001 – Occupational Health & Safety',
      'ISO 22000 – Food Safety Management',
      'ISO 27001 – Information Security Management',
    ],
    whoCanApply: [
      'Startups',
      'MSMEs',
      'Manufacturers',
      'Traders',
      'Service Providers',
      'Educational Institutes',
      'Hospitals & Clinics',
      'Restaurants & Food Businesses',
    ],
    documents: [
      'PAN Card',
      'Aadhaar Card',
      'Business Registration Proof',
      'GST Certificate (असल्यास)',
      'Address Proof',
      'Company Profile / Business Details',
    ],
    process: [
      'Application Submission',
      'Document Verification',
      'Audit / Assessment',
      'Compliance Review',
      'Certificate Approval',
      'ISO Certificate Issued',
    ],
  },
  {
    id: 11,
    slug: 'import-export-registration',
    title: 'Import Export Registration (IEC)',
    image: asset('/images/services/import-export-code-registration.png'),
    summary:
      'IEC (Import Export Code) is required to import or export from India. Get Import Export registration with DGFT filing support from startbiz.in business consulting experts.',
    about:
      'IEC (Import Export Code) म्हणजे काय? IEC (Import Export Code) हा 10 अंकी युनिक कोड आहे जो भारतातून वस्तू किंवा सेवा Import (आयात) आणि Export (निर्यात) करण्यासाठी आवश्यक असतो. हा कोड DGFT (Directorate General of Foreign Trade) द्वारे जारी केला जातो.',
    points: [
      'जागतिक बाजारपेठेत व्यवसाय विस्तार',
      'Import & Export करण्याचा कायदेशीर अधिकार',
      'आंतरराष्ट्रीय ग्राहक मिळवण्याची संधी',
      'Government Export Benefits मिळतात',
      'Online Selling (Amazon, Alibaba, eBay) साठी उपयुक्त',
      'Business Credibility वाढते',
      'Foreign Currency Transactions साठी आवश्यक',
    ],
    whoCanApply: [
      'Proprietorship Firm',
      'Partnership Firm',
      'LLP',
      'Private Limited Company',
      'One Person Company (OPC)',
      'Manufacturers',
      'Traders',
      'Exporters & Importers',
    ],
    documents: [
      'PAN Card',
      'Aadhaar Card',
      'Passport Size Photo',
      'Business Address Proof',
      'Bank Cancelled Cheque / Bank Certificate',
      'GST Certificate (असल्यास)',
    ],
    process: [
      'Document Collection',
      'Application Filing',
      'DGFT Verification',
      'IEC Code Approval',
      'Certificate Issued',
    ],
    whyNeeded: [
      'International Business साठी',
      'Import-Export Operations साठी',
      'Foreign Payments Receive करण्यासाठी',
      'Business Growth आणि Global Expansion साठी',
    ],
  },
];

export const gallery = [
  {
    title: 'GST Registration',
    image: asset('/images/gallery/gallery-2.webp'),
    slug: 'gst-registration',
  },
  {
    title: 'LLP Registration',
    image: asset('/images/gallery/gallery-3.webp'),
    slug: 'llp-registration',
  },
  {
    title: 'Shop Act Registration',
    image: asset('/images/gallery/gallery-4.webp'),
    slug: 'shop-act-registration',
  },
  {
    title: 'FSSAI Food License',
    image: asset('/images/gallery/gallery-5.webp'),
    slug: 'fssai-food-license',
  },
  {
    title: 'Partnership Firm',
    image: asset('/images/gallery/gallery-6.webp'),
    slug: 'partnership-firm-registration',
  },
  {
    title: 'MSME Registration',
    image: asset('/images/gallery/gallery-7.webp'),
    slug: 'msme-registration',
  },
  {
    title: 'OPC Registration',
    image: asset('/images/gallery/gallery-8.webp'),
    slug: 'one-person-company-registration',
  },
  {
    title: 'Private Limited Company',
    image: asset('/images/gallery/gallery-9.webp'),
    slug: 'private-limited-company-registration',
  },
];

export function getServiceBySlug(slug) {
  const catalog = getCatalogServiceBySlug(slug);
  const detailed = services.find((service) => service.slug === slug);
  let base;
  if (detailed && catalog) {
    base = {
      ...catalog,
      ...detailed,
      category: catalog.category || detailed.category,
      categoryId: catalog.categoryId,
      group: catalog.group,
      seoTitle: catalog.seoTitle,
      seoDescription: catalog.seoDescription,
      keywords: catalog.keywords,
    };
  } else {
    base = detailed || catalog;
  }
  if (!base) return null;
  const guide = serviceGuides[base.slug] || {};
  return {
    process: STANDARD_PROCESS,
    ...base,
    ...guide,
    needPrompt: needPrompts[base.slug] || needPrompts[base.aliasOf],
    pricingNote: guide.pricingNote || pricingNote,
  };
}

export function getRelatedServices(slug, limit = 3) {
  const fromCategory = getRelatedByCategory(slug, limit);
  if (fromCategory.length) return fromCategory;

  const related = services.filter((service) => service.slug !== slug);
  if (related.length >= limit) return related.slice(0, limit);

  const extra = catalogAll
    .filter(
      (s) =>
        !s.aliasOf &&
        s.slug !== slug &&
        !related.some((r) => r.slug === s.slug)
    )
    .slice(0, limit - related.length);
  return [...related, ...extra].slice(0, limit);
}
