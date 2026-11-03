import { useEffect, useId, useRef, useState } from "react";
import { currentPage, navigation } from "../content/site.ts";
import { BrandLockup } from "./Brand.tsx";

export function Header() {
  const [open, setOpen] = useState(false);
  const navId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape" || !open) return;
      setOpen(false);
      buttonRef.current?.focus();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 801px)");

    function onChange() {
      if (media.matches) setOpen(false);
    }

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="wrap header-bar">
        <BrandLockup />
        <button
          ref={buttonRef}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls={navId}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav id={navId} className={open ? "site-nav is-open" : "site-nav"} aria-label="Primary">
          {navigation.map((item) => {
            const current = item.id === currentPage(window.location.pathname);
            return (
              <a
                key={item.id}
                href={item.href}
                aria-current={current ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
