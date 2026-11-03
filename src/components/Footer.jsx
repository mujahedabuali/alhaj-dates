import { company, navItems } from "../data/company";
import { useLocale } from "../i18n/LocaleContext";
import LocaleLink from "./LocaleLink";

const Footer = () => {
  const { t, isAr } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="surface-chrome text-cream">
      <div className="container-narrow grid gap-10 px-4 py-12 sm:px-5 md:grid-cols-2 md:gap-8 md:px-6 md:py-16 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="mb-4">
            <LocaleLink to="/" className="brand-lockup" aria-label={t.brand}>
              <img src="/al-haj.png" alt="" />
              <div className="brand-lockup-text">
                <p className="brand-lockup-title">{t.brand}</p>
                <p className="brand-lockup-sub">{t.brandArShort}</p>
              </div>
            </LocaleLink>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-cream/80">
            {isAr ? company.companyNameAr : company.companyName}. {t.footer.blurb}
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold tracking-[0.16em] text-primary-light uppercase">
            {t.footer.explore}
          </h2>
          <ul className="space-y-2 text-sm text-cream/85">
            {navItems.map((item) => (
              <li key={item.path}>
                <LocaleLink to={item.path} className="hover:text-white transition-colors">
                  {t.nav[item.key]}
                </LocaleLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold tracking-[0.16em] text-primary-light uppercase">
            {t.footer.contact}
          </h2>
          <address className="space-y-2 text-sm leading-relaxed text-cream/85 not-italic">
            <p>{isAr ? company.addressAr : company.address}</p>
            <p dir="ltr" className="text-left">
              <a href={company.phoneHref} className="hover:text-white transition-colors">
                {company.phone}
              </a>
            </p>
            <p>
              <a href={company.emailHref} className="hover:text-white transition-colors break-all">
                {company.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-narrow flex flex-col gap-2 px-4 py-5 text-xs text-cream/70 sm:px-5 md:flex-row md:items-center md:justify-between md:px-6">
          <p>
            © {year} {isAr ? company.companyNameAr : company.companyName}. {t.footer.rights}
          </p>
          <p>{t.footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
