import type { MarkdownInstance } from 'astro';

// `image` is the screenshot, or the poster when the update has a film in `video`.
type Update = { title: string; date: string | Date; image: string; alt: string; video?: string };
const files = import.meta.glob<MarkdownInstance<Update>>('../../content/changelog/*.md', { eager: true });
export const updates = Object.entries(files).map(([path, entry]) => ({
  id: path.split('/').at(-1)!.replace(/\.md$/, ''),
  ...entry.frontmatter,
  date: new Date(entry.frontmatter.date).toISOString().slice(0, 10),
  Content: entry.Content,
  summary: entry.rawContent().trim().split(/\n\s*\n/)[0],
})).sort((a, b) => b.date.localeCompare(a.date));
