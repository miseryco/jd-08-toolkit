import type { APIRoute } from 'astro';
import { updates } from '../../lib/updates';
import { sitePath } from '../../lib/site';
import { xml } from '../../lib/xml';

export const GET: APIRoute = ({ site }) => {
  const page = new URL(sitePath('changelog/'), site).href;
  const body = updates.map(note => {
    const url = xml(page + '#' + note.id);
    return `<entry><title>${xml(note.title)}</title><id>${url}</id><link href="${url}"/><updated>${note.date}T00:00:00Z</updated><summary>${xml(note.summary)}</summary></entry>`;
  }).join('\n');
  return new Response(`<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom"><title>JD-08 Toolkit changelog</title><id>${page}</id><author><name>Misery &amp; Co.</name></author><link href="${page}"/><link rel="self" href="${page}feed.xml"/><updated>${updates[0].date}T00:00:00Z</updated>${body}</feed>`, { headers: { 'Content-Type': 'application/atom+xml' } });
};
