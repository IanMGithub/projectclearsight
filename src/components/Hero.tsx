import { brand, heroActions } from "../content/site.ts";
import { Logo } from "./Brand.tsx";

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="site-title">
      <div className="wrap">
        <Logo className="hero-logo" priority />
        <h1 id="site-title">{brand.name}</h1>
        <p className="hero-catch">{brand.catchphrase}</p>
        <p className="hero-support">{brand.heroSupport}</p>
        <div className="hero-actions">
          <a className="button" href={heroActions.primary.href}>
            {heroActions.primary.label}
          </a>
          <a className="text-link" href={heroActions.secondary.href}>
            {heroActions.secondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}
