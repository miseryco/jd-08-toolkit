// Run from the marketing site after Theme.swift changes.
import { readFile, writeFile } from 'node:fs/promises';

const source = new URL(process.argv[2] || '../../desktop/Sources/JD08Toolkit/Views/Theme.swift', import.meta.url);
const theme = await readFile(source, 'utf8');
const colors = [...theme.matchAll(/static let (\w+) = Color\(hex: 0x([0-9a-f]{6})\)/gi)];
if (!colors.some(([, name]) => name === 'panelAmber')) throw new Error('Expected Toolkit colors in ' + source.pathname);
const declarations = colors.map(([, name, value]) => {
  const property = name.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2').toLowerCase();
  return '  --' + property + ': #' + value.toLowerCase() + ';';
});
const geometry = [
  '  --system-font: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;',
  '  --readout-font: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;',
  '  --control-radius: 3px;',
  '  --control-gap: 6px;',
  '  --panel-seam: 1.5px;',
];
const css = '/* From Theme.swift: panel inks, LED colors, system text and control geometry. */\n:root {\n'
  + [...declarations, ...geometry].join('\n') + '\n}\n';
await writeFile(new URL('../src/styles/tokens.css', import.meta.url), css);
