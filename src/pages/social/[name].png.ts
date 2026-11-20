import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { resolve } from 'node:path';
import guides from '../../../content/guides.json';
import { xml } from '../../lib/xml';

export function getStaticPaths() {
  const cards = [
    { name: 'overview', title: 'JD-08 editor & librarian for Mac', image: 'hero-1600.webp' },
    ...guides.map(guide => ({ name: guide.slug, title: guide.title, image: guide.image })),
    { name: 'changelog', title: 'Changelog', image: 'feature-matrix-960.webp' },
    { name: 'support', title: 'Support', image: 'help-connect-900.webp' },
    { name: 'privacy', title: 'Privacy policy', image: 'hero-1600.webp' },
  ];
  return cards.map(card => ({ params: { name: card.name }, props: card }));
}

export const GET: APIRoute = async ({ props }) => {
  const { title, image } = props as { title: string; image: string };
  // Sharp's text renderer also needs a fontconfig file on a bare build machine.
  process.env.FONTCONFIG_FILE ??= resolve('scripts/share-fonts.conf');
  const mediaDir = resolve('public/media');
  const screenshot = await sharp(resolve(mediaDir, image)).resize(1088, 412, { fit: 'cover', position: 'top' }).png().toBuffer();
  const lettering = (value: string, size: number, color: string) => sharp({ text: {
    text: `<span foreground="${color}">${xml(value)}</span>`,
    font: 'HEX Franklin v0.3 Tyght Variable ' + size,
    fontfile: resolve('src/assets/fonts/hex-franklin-tyght.woff2'),
    rgba: true,
  } }).resize({ width: 1088, withoutEnlargement: true }).png().toBuffer();
  const masthead = await lettering('JD-08 Toolkit', 34, '#ff683d');
  const headline = await lettering(title, 66, '#f2f1e7');
  const png = await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#181a17' } })
    .composite([
      { input: masthead, top: 32, left: 56 },
      { input: { create: { width: 1088, height: 2, channels: 3, background: '#f2f1e7' } }, top: 81, left: 56 },
      { input: headline, top: 113, left: 56 },
      { input: screenshot, top: 218, left: 56 },
    ])
    .png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
