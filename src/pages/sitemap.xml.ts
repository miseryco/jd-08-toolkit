import type { APIRoute } from 'astro';
import guides from '../../content/guides.json';
import { sitePath } from '../lib/site';
import { xml } from '../lib/xml';
export const GET: APIRoute = ({ site }) => {
  const paths = ['', ...guides.map(guide => guide.slug + '/'), 'changelog/', 'support/', 'privacy/'];
  const urls = paths.map(path => '<url><loc>' + xml(new URL(sitePath(path), site).href) + '</loc></url>').join('\n');
  return new Response('<?xml version="1.0" encoding="utf-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + urls + '</urlset>', { headers: { 'Content-Type': 'application/xml' } });
};
