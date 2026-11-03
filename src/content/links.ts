const HTTP_PROTOCOLS = new Set(["http:", "https:"]);

export function isHttpUrl(value: string | null | undefined): value is string {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed === "#") return false;

  try {
    const url = new URL(trimmed);
    return HTTP_PROTOCOLS.has(url.protocol);
  } catch {
    return false;
  }
}

export function openDestination(offering: {
  available: boolean;
  url: string | null;
}): string | null {
  if (!offering.available || !isHttpUrl(offering.url)) return null;
  return offering.url;
}
