import { brand } from "../content/site.ts";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export function Logo({ className, priority = false }: LogoProps) {
  return (
    <img
      className={className ? `logo ${className}` : "logo"}
      src={brand.logo.src}
      width={brand.logo.width}
      height={brand.logo.height}
      alt=""
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}

export function BrandLockup() {
  return (
    <a className="brand" href="/" aria-label="ClearSight">
      <Logo />
      <span className="brand-name">
        Clear<span className="brand-sight">Sight</span>
      </span>
    </a>
  );
}
