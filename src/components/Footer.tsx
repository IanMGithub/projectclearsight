import { footer } from "../content/site.ts";
import { BrandLockup } from "./Brand.tsx";

const copyrightYear = new Date().getFullYear();

export function Footer() {
  const year = copyrightYear;

  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <BrandLockup />
        <p className="footer-tagline">{footer.tagline}</p>
        <p className="copyright">© {year} ClearSight</p>
      </div>
    </footer>
  );
}
