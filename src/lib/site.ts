import settings from '../../content/release.json';

interface Release {
  version: string;
  minimumMacOS: number;
  appStoreUrl: string | null;
  directDownloadUrl: string | null;
  price: number | null;
  currency: string | null;
  contact: string;
}
export const release: Release = settings;
export const sitePath = (path = '') => import.meta.env.BASE_URL.replace(/\/?$/, '/') + path;
export const media = (file: string) => sitePath('media/' + file);
export const support = 'mailto:' + release.contact;
export const download = {
  direct: release.directDownloadUrl?.replace('{version}', release.version) || sitePath('#buy-direct'),
  store: release.appStoreUrl || sitePath('#mac-app-store'),
};
export const niceDate = (value: string | Date) => new Intl.DateTimeFormat('en', {
  year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
}).format(new Date(value));

export interface Question { q: string; a: string | (string | { text: string; href: string })[] }
export function faqSchema(items: Question[]) {
  return {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question', name: q, acceptedAnswer: {
        '@type': 'Answer', text: Array.isArray(a) ? a.map(part => typeof part === 'string' ? part : part.text).join('') : a,
      },
    })),
  };
}
