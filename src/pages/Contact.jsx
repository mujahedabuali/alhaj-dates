import { useEffect, useState } from "react";
import { FaPhone, FaMapMarkerAlt, FaClock, FaEnvelope } from "react-icons/fa";
import Seo from "../components/Seo";
import { company } from "../data/company";
import { useLocale } from "../i18n/LocaleContext";

const Contact = () => {
  const { t, isAr } = useLocale();
  const [status, setStatus] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const items = [
    {
      icon: FaMapMarkerAlt,
      title: t.contact.address,
      content: isAr ? company.addressAr : company.address,
    },
    {
      icon: FaPhone,
      title: t.contact.phone,
      content: (
        <a href={company.phoneHref} className="hover:text-primary transition-colors">
          {company.phone}
        </a>
      ),
    },
    {
      icon: FaClock,
      title: t.contact.hours,
      content: isAr ? company.hoursAr : company.hours,
    },
    {
      icon: FaEnvelope,
      title: t.contact.email,
      content: (
        <a href={company.emailHref} className="hover:text-primary transition-colors break-all">
          {company.email}
        </a>
      ),
    },
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();

    if (!name || !email || !message) {
      setStatus(t.contact.fillAll);
      return;
    }

    const subject = encodeURIComponent(`Al-Haj Dates / ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `${company.emailHref}?subject=${subject}&body=${body}`;
    setStatus(t.contact.openingMail);
  };

  return (
    <div className="page-shell bg-cream-soft">
      <Seo
        title={t.contact.seoTitle}
        description={t.contact.seoDescription}
        path="/contact"
      />

      <section className="relative overflow-hidden pt-24 pb-14 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20">
        <img
          src="/alhaj-background.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 container-narrow px-4 text-center sm:px-5 md:px-6">
          <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-primary-light uppercase sm:mb-3">
            {t.contact.eyebrow}
          </p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
            {t.contact.title}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/85 sm:mt-4 sm:text-base">
            {t.contact.subtitle}
          </p>
        </div>
      </section>

      <section className="container-narrow -mt-6 grid gap-3 px-4 sm:-mt-8 sm:gap-4 sm:px-5 md:grid-cols-2 md:px-6 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.title}
              className="border border-primary-light/30 bg-white p-5 shadow-[0_10px_30px_rgba(161,125,35,0.08)] sm:p-6"
            >
              <Icon className="mb-3 text-lg text-primary" aria-hidden />
              <h2 className="text-sm font-semibold tracking-wide text-ink uppercase">
                {item.title}
              </h2>
              <div className="mt-2 text-sm leading-relaxed text-muted">{item.content}</div>
            </article>
          );
        })}
      </section>

      <section className="container-narrow mt-10 overflow-hidden border border-primary-light/30 bg-white sm:mt-14 md:mt-16 md:grid md:grid-cols-2">
        <div className="surface-primary p-6 text-cream sm:p-8 md:p-10">
          <h2 className="text-xl font-semibold sm:text-2xl">{t.contact.formTitle}</h2>
          <p className="mt-3 text-sm leading-relaxed text-cream/80">{t.contact.formHint}</p>
          <div className="mt-6 space-y-3 text-sm text-cream/85 sm:mt-8">
            <p className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 shrink-0 text-primary-light" />
              <span>{isAr ? company.addressAr : company.address}</span>
            </p>
            <p className="flex items-center gap-3">
              <FaPhone className="shrink-0 text-primary-light" />
              <a href={company.phoneHref}>{company.phone}</a>
            </p>
          </div>
        </div>

        <form className="p-6 sm:p-8 md:p-10" onSubmit={onSubmit} noValidate>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-ink" htmlFor="name">
              {t.contact.name}
            </label>
            <input
              className="input-field"
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-ink" htmlFor="email">
              {t.contact.email}
            </label>
            <input
              className="input-field"
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-ink" htmlFor="message">
              {t.contact.message}
            </label>
            <textarea className="input-field" id="message" name="message" rows="5" required />
          </div>
          <button
            type="submit"
            className="btn-primary w-full bg-primary text-cream hover:bg-primary-light hover:text-ink"
          >
            {t.contact.send}
          </button>
          {status && (
            <p className="mt-3 text-center text-sm text-muted" role="status">
              {status}
            </p>
          )}
        </form>
      </section>

      <section className="container-narrow mt-10 mb-14 overflow-hidden border border-primary-light/30 sm:mt-14 sm:mb-16 md:mt-16 md:mb-20">
        <div className="bg-primary px-4 py-3">
          <h2 className="text-center text-sm font-semibold tracking-wide text-cream uppercase">
            {t.contact.findUs}
          </h2>
        </div>
        <iframe
          src={company.mapEmbed}
          width="100%"
          height="360"
          className="block sm:h-[420px]"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={t.contact.mapTitle}
        />
      </section>
    </div>
  );
};

export default Contact;
