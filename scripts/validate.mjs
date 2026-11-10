// Run from any directory: node scripts/validate.mjs
// Checks static structure and local references; no network or app access.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = ['keydog-index.html', 'purerec-index.html', 'zipfox-index.html', 'terms.html'];
const errors = [];
const idsByPath = new Map();
const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
const read = file => fs.readFileSync(file, 'utf8');
const relative = file => path.relative(root, file).replaceAll('\\', '/');

for (const name of pages) {
    const file = path.join(root, name);
    const html = read(file);
    const stack = [];
    const ids = new Set();
    for (const match of html.matchAll(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi)) {
        const [raw, originalTag] = match;
        const tag = originalTag.toLowerCase();
        if (raw.startsWith('</')) {
            const opening = stack.pop();
            if (opening !== tag) errors.push(`${name}: mismatched ${raw}, expected closing ${opening}`);
        } else if (!voidTags.has(tag) && !raw.endsWith('/>')) stack.push(tag);
    }
    if (stack.length) errors.push(`${name}: unclosed tags: ${stack.join(', ')}`);
    for (const [, id] of html.matchAll(/\bid="([^"]+)"/g)) {
        if (ids.has(id)) errors.push(`${name}: duplicate id ${id}`);
        ids.add(id);
    }
    idsByPath.set(file, ids);
    if (!/charset="UTF-8"/i.test(html) || html.includes('\uFFFD')) errors.push(`${name}: check UTF-8 encoding`);
    if (!html.includes('lang="en"')) errors.push(`${name}: missing English language declaration`);
    if (!html.includes('lang="zh-CN"')) errors.push(`${name}: missing Chinese language declaration`);
    if (!/<time\b[^>]*datetime="\d{4}-\d{2}-\d{2}"/.test(html)) errors.push(`${name}: missing policy date`);
    if (!html.includes('mailto:kong5664246@gmail.com')) errors.push(`${name}: missing contact link`);
}

function checkLink(file, raw) {
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(raw)) return;
    const [location, fragment] = raw.split('#');
    let target;
    try { target = path.resolve(path.dirname(file), decodeURIComponent(location.split('?')[0] || path.basename(file))); }
    catch { errors.push(`${relative(file)}: invalid link ${raw}`); return; }
    const rel = path.relative(root, target);
    if (rel.startsWith('..') || path.isAbsolute(rel)) {
        errors.push(`${relative(file)}: link leaves repository: ${raw}`); return;
    }
    if (!fs.existsSync(target)) { errors.push(`${relative(file)}: missing link ${raw}`); return; }
    // Markdown heading slugs are renderer-specific; HTML IDs are exact.
    if (fragment && idsByPath.has(target) && !idsByPath.get(target).has(fragment)) {
        errors.push(`${relative(file)}: missing HTML fragment ${raw}`);
    }
}

for (const name of pages) {
    const file = path.join(root, name);
    for (const [, href] of read(file).matchAll(/href="([^"]+)"/g)) checkLink(file, href);
}
function markdownFiles(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
        if (entry.name.startsWith('.')) return [];
        const file = path.join(dir, entry.name);
        return entry.isDirectory() ? markdownFiles(file) : entry.name.endsWith('.md') ? [file] : [];
    });
}
const markdown = markdownFiles(root);
for (const file of markdown) {
    const text = read(file).replace(/```[\s\S]*?```/g, '').replace(/`[^`]+`/g, '');
    for (const [, href] of text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) checkLink(file, href);
}
if (errors.length) {
    console.error(errors.join('\n'));
    process.exitCode = 1;
} else console.log(`PASS: ${pages.length} policy HTML files and ${markdown.length} Markdown files; tags, IDs, language declarations, dates, contact and local links verified.`);
