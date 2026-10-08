import { Link, Navigate, useParams } from 'react-router-dom';
import Seo, { breadcrumbSchema, serviceSchema } from '../components/Seo';
import {
  brand,
  getRelatedServices,
  getServiceBySlug,
  getWhatsAppUrl,
  megaMenus,
  serviceCount,
  whatsappHref,
} from '../data/content';
import { STANDARD_PROCESS } from '../data/serviceGuides';

function IncludedTable({ points, title }) {
  if (!points?.length) return null;

  return (
    <section className="py-12 sm:py-16">
      <div className="section-wrap">
        <p className="section-label">What&apos;s included</p>
        <h2 className="heading mt-2 text-2xl sm:text-3xl">
          Why choose {brand.name} for {title}?
        </h2>
        <div className="mt-6 overflow-x-auto rounded-xl border border-[#dbdbdb] bg-white shadow-soft">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-brand-primary text-white">
              <tr>
                <th className="px-4 py-3 font-semibold sm:px-5">Feature</th>
                <th className="px-4 py-3 font-semibold sm:px-5">
                  With {brand.name}
                </th>
              </tr>
            </thead>
            <tbody>
              {points.map((point, index) => (
                <tr
                  key={point}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-brand-surface'}
                >
                  <td className="px-4 py-3 text-brand-text sm:px-5">{point}</td>
                  <td className="px-4 py-3 font-semibold text-brand-green sm:px-5">
                    ✔ Included
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function ProcessSteps({ process, title }) {
  if (!process?.length) return null;

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="section-wrap">
        <p className="section-label">Process</p>
        <h2 className="heading mt-2 text-2xl sm:text-3xl">
          How {title} works with {brand.name}
        </h2>
        <p className="body-muted mt-3 max-w-2xl text-sm sm:text-base">
          A clear, guided process from enquiry to completion.
        </p>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {process.map((step, index) => (
            <li
              key={step}
              className="relative rounded-xl border border-[#dbdbdb] bg-brand-surface p-5"
            >
              <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white">
                {index + 1}
              </span>
              <p className="text-sm font-semibold text-brand-text sm:text-base">
                {step}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ChecklistSection({ label, title, items }) {
  if (!items?.length) return null;

  return (
    <section className="py-12 sm:py-16">
      <div className="section-wrap">
        <p className="section-label">{label}</p>
        <h2 className="heading mt-2 text-2xl sm:text-3xl">{title}</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-xl border border-[#dbdbdb] bg-white px-4 py-3 text-sm text-brand-text"
            >
              <span className="mt-0.5 shrink-0 text-brand-green">✔</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const related = getRelatedServices(service.slug, 3);
  const categoryPath =
    megaMenus.find((m) => m.id === service.categoryId)?.path || '/';

  const pageTitle =
    service.seoTitle ||
    `${service.title} | ${brand.name} Business Consulting Services`;
  const pageDescription =
    service.seoDescription ||
    `${service.summary} Expert business consulting services from ${brand.name} across Maharashtra, India.`;
  const pageKeywords = Array.isArray(service.keywords)
    ? service.keywords.join(', ')
    : undefined;

  const servicePath = `/services/${service.slug}`;
  const crumbs = [
    { name: 'Home', path: '/' },
    ...(service.categoryId
      ? [{ name: service.category, path: categoryPath }]
      : []),
    { name: service.title, path: servicePath },
  ];
  const jsonLd = [
    breadcrumbSchema(crumbs),
    serviceSchema({
      name: service.title,
      description: pageDescription,
      path: servicePath,
      category: service.category,
    }),
  ];

  return (
    <div className="bg-brand-surface">
      <Seo
        title={pageTitle}
        description={pageDescription}
        keywords={pageKeywords}
        path={servicePath}
        jsonLd={jsonLd}
      />

      <section className="border-b border-[#dbdbdb] bg-white pt-[72px] sm:pt-20">
        <div className="section-wrap py-8 sm:py-12 lg:py-14">
          <nav className="mb-5 flex flex-wrap items-center text-sm text-brand-text-soft">
            <Link to="/" className="hover:text-brand-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            {service.categoryId ? (
              <>
                <Link to={categoryPath} className="hover:text-brand-primary">
                  {service.category}
                </Link>
                <span className="mx-2">/</span>
              </>
            ) : null}
            <span className="text-brand-text">{service.title}</span>
          </nav>

          <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            <div>
              {service.group && (
                <p className="section-label">{service.group}</p>
              )}
              <h1 className="heading mt-2 break-words text-2xl sm:text-3xl lg:text-4xl">
                {service.title}
              </h1>
              {service.needPrompt && (
                <p className="mt-3 text-sm font-semibold text-brand-accent">
                  {service.needPrompt.question}
                </p>
              )}
              <p className="mt-4 text-sm leading-relaxed text-brand-text-soft sm:text-base">
                {service.summary}
              </p>
              <ul className="mt-6 space-y-2">
                {service.points.slice(0, 5).map((point) => (
                  <li
                    key={point}
                    className="flex gap-2 text-sm text-brand-text sm:text-base"
                  >
                    <span className="text-brand-green">✔</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  to={`/finder?need=${service.slug}`}
                  className="btn-primary w-full sm:w-auto"
                >
                  Check if I need this
                </Link>
                <a href="#contact" className="btn-outline w-full sm:w-auto">
                  Talk to an expert
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline w-full sm:w-auto"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            {service.image ? (
              <div className="overflow-hidden rounded-xl border border-[#dbdbdb] bg-white p-2 shadow-soft">
                <img
                  src={service.image}
                  alt={`${service.title} — ${brand.name}`}
                  className="h-auto w-full object-contain"
                  loading="lazy"
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="section-wrap max-w-3xl">
          <p className="section-label">Introduction</p>
          <h2 className="heading mt-2 text-2xl sm:text-3xl">
            What is {service.title}?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-brand-text-soft sm:text-base">
            {service.whatIsIt || service.about || service.summary}
          </p>
        </div>
      </section>

      <IncludedTable points={service.points} title={service.title} />

      <ChecklistSection
        label="Benefits"
        title={`Benefits of ${service.title}`}
        items={service.benefits || service.points}
      />

      <ChecklistSection
        label="Who may need it"
        title={`Who may need ${service.title}?`}
        items={service.whoNeedsIt || service.whoCanApply}
      />

      <ChecklistSection
        label="Documents"
        title={`Documents required for ${service.title}`}
        items={service.documents}
      />

      <ChecklistSection
        label="Types"
        title="Popular options"
        items={service.types}
      />

      <ChecklistSection
        label="Why it can matter"
        title={`Why ${service.title} can matter`}
        items={
          service.whyItMatters
            ? [service.whyItMatters]
            : service.whyNeeded
        }
      />

      {service.ifYouDont && (
        <section className="bg-white py-12 sm:py-16">
          <div className="section-wrap max-w-3xl">
            <p className="section-label">If you do not have it</p>
            <h2 className="heading mt-2 text-2xl sm:text-3xl">
              What can happen if you skip this?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-brand-text-soft sm:text-base">
              {service.ifYouDont}
            </p>
            <p className="mt-3 text-xs text-brand-text-soft">
              Applicable conditions may vary. This is general guidance, not a
              legal determination.
            </p>
          </div>
        </section>
      )}

      <ProcessSteps
        process={service.process?.length ? service.process : STANDARD_PROCESS}
        title={service.title}
      />

      <section className="bg-brand-surface py-12 sm:py-16">
        <div className="section-wrap max-w-3xl">
          <p className="section-label">Fees &amp; next step</p>
          <h2 className="heading mt-2 text-2xl sm:text-3xl">
            What should you do next?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-brand-text-soft sm:text-base">
            {service.nextStep ||
              'Check whether this actually applies to your activity, then talk to Startbiz before you file.'}
          </p>
          <p className="mt-3 text-sm text-brand-text-soft">{service.pricingNote}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link to={`/finder?need=${service.slug}`} className="btn-primary">
              Check my requirement
            </Link>
            <a href="#contact" className="btn-outline">
              Talk to an expert
            </a>
          </div>
        </div>
      </section>

      <section className="bg-brand-primary py-10 text-white sm:py-12">
        <div className="section-wrap flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              Need help with {service.title}?
            </h2>
            <p className="mt-2 text-sm text-white/80 sm:text-base">
              Contact {brand.contactPerson} for expert business consulting
              services across Maharashtra.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href={getWhatsAppUrl(`Get Started — ${service.title}`)}
              target="_blank"
              rel="noreferrer"
              className="btn-primary w-full sm:w-auto"
            >
              WhatsApp
            </a>
            <a href={brand.phoneHref} className="btn-ghost-light w-full sm:w-auto">
              Call {brand.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="section-wrap">
          <p className="section-label">Explore more</p>
          <h2 className="heading mt-2 text-2xl sm:text-3xl">
            Related services
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                to={`/services/${item.slug}`}
                className="rounded-xl border border-[#dbdbdb] bg-white p-4 transition hover:-translate-y-1 hover:shadow-soft"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="mb-3 h-auto w-full object-contain"
                    loading="lazy"
                  />
                ) : null}
                <h3 className="font-semibold text-brand-text">{item.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-brand-text-soft">
                  {item.summary}
                </p>
                <span className="mt-3 inline-flex text-sm font-semibold text-brand-primary">
                  View details →
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            {service.categoryId ? (
              <Link to={categoryPath} className="btn-outline">
                More in {service.category}
              </Link>
            ) : null}
            <Link to="/#services" className="btn-primary">
              Browse {serviceCount}+ services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
