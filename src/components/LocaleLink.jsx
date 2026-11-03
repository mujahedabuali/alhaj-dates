import { Link } from "react-router-dom";
import { useLocale } from "../i18n/LocaleContext";

/** Link that prefixes the current language (`/ar` when Arabic). */
const LocaleLink = ({ to, ...props }) => {
  const { path } = useLocale();
  const href = typeof to === "string" ? path(to) : to;
  return <Link to={href} {...props} />;
};

export default LocaleLink;
