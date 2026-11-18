// Checks the rules in README.md that a machine can check, then lists the
// documents waiting for acceptance. Run it with: node scripts/check.mjs
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const fail = (file, message) => errors.push(`${file}: ${message}`);

const read = (file) => readFileSync(join(root, file), 'utf8').replace(/\r\n/g, '\n');
const list = (dir, keep) => readdirSync(join(root, dir)).filter(keep).sort().map((name) => `${dir}/${name}`);
const field = (text, name) => text.match(new RegExp(`^- \\*\\*${name}:\\*\\* (.+)$`, 'm'))?.[1].trim();
const isDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value ?? '');

const ADR_STATUS = /^(Proposed|Accepted|Rejected|Deprecated|Superseded( by \d{4})?)$/;
const BLUEPRINT_STATUS = /^(Draft|Accepted|Implemented|Superseded( by .+)?)$/;

const adrFiles = list('adrs', (n) => /^\d{4}-.+\.md$/.test(n));
const blueprintFiles = list('blueprints', (n) => n.endsWith('.md') && n !== 'README.md' && n !== '_template.md');
const docs = [
  'README.md', 'glossary.md', 'architecture_blueprint.md', 'adrs/README.md', 'adrs/_template.md',
  'blueprints/README.md', 'blueprints/_template.md', ...list('schemas', (n) => n.endsWith('.md')),
  ...adrFiles, ...blueprintFiles,
];

// Dashes and labels are checked in prose only. Code blocks and inline code keep their line count.
const prose = (text) => text.replace(/^```[\s\S]*?^```/gm, (m) => m.replace(/[^\n]/g, '')).replace(/`[^`\n]*`/g, '');

for (const file of docs) {
  prose(read(file)).split('\n').forEach((line, i) => {
    const at = (message) => fail(`${file}:${i + 1}`, message);
    if (/^\s*\|[\s:|-]+\|\s*$/.test(line)) return;
    if (/[–—]/.test(line)) at('em or en dash');
    if (/\S -{1,2} \S/.test(line)) at('hyphen standing in for a dash');
    if (/^#{1,6} .*[:;]/.test(line)) at('colon or semicolon in a heading');
    if (/\b(phase|stage|milestone) ?\d+\b|\b(phase|stage|milestone) [a-d]\b|\bstep \d+ of \d+\b/i.test(line) || /\bM\d+\b/.test(line)) at('plan label');
  });
}

const indexRows = (file) => new Map([...read(file).matchAll(/^\| \[`([^`]+)`\]\([^)]*\) \| ([^|]+) \|/gm)].map((m) => [m[1], m[2].trim()]));

const adrs = adrFiles.map((file) => {
  const text = read(file);
  const heading = text.match(/^# (\d{4}) (.+)$/m);
  return {
    file, text, name: file.slice(5), number: file.slice(5, 9), title: heading?.[2] ?? '', headingNumber: heading?.[1],
    status: field(text, 'Status'), created: field(text, 'Created'), ruled: field(text, 'Ruled'), accepted: field(text, 'Accepted'), amended: field(text, 'Amended'),
  };
});
const adrByNumber = new Map(adrs.map((a) => [a.number, a]));
const adrIndex = indexRows('adrs/README.md');

for (const adr of adrs) {
  const { file } = adr;
  if (adrs.filter((a) => a.number === adr.number).length > 1) fail(file, 'number used twice');
  if (adr.headingNumber !== adr.number) fail(file, 'heading number does not match the file name');
  if (!ADR_STATUS.test(adr.status ?? '')) fail(file, `status "${adr.status}" is not allowed`);
  if (!isDate(adr.created)) fail(file, 'needs a Created date');
  if (!adr.ruled) fail(file, 'needs a Ruled line');
  if (adr.status === 'Accepted' && !isDate(adr.accepted)) fail(file, 'is Accepted but has no Accepted date');
  if (adr.amended !== undefined) {
    if (adr.status === 'Proposed') fail(file, 'is Proposed, so it needs no Amended line');
    else if (!isDate(adr.amended)) fail(file, 'Amended must be a date');
    else if (adr.accepted && adr.amended < adr.accepted) fail(file, 'is Amended before it was Accepted');
  }
  if (!adrIndex.has(adr.name)) fail(file, 'has no row in adrs/README.md');
  else if (adrIndex.get(adr.name) !== adr.status) fail(file, `index says "${adrIndex.get(adr.name)}" but the header says "${adr.status}"`);

  const cited = new Set([...adr.text.matchAll(/\bADR (\d{4})\b|\b(\d{4})-[a-z0-9-]+\.md\b/g)].map((m) => m[1] ?? m[2]));
  cited.delete(adr.number);
  for (const number of cited) {
    if (number > adr.number) fail(file, `cites ADR ${number}, which is newer`);
    else if (!adrByNumber.has(number)) fail(file, `cites ADR ${number}, which does not exist`);
    else if (adr.status === 'Accepted' && adrByNumber.get(number).status === 'Proposed') fail(file, `is Accepted but cites Proposed ADR ${number}`);
  }
}
for (const name of adrIndex.keys()) if (!adrFiles.includes(`adrs/${name}`)) fail('adrs/README.md', `lists ${name}, which does not exist`);

const blueprintIndex = indexRows('blueprints/README.md');
const blueprints = blueprintFiles.map((file) => {
  const text = read(file);
  const undecided = text.split(/^## /m).find((s) => s.startsWith('Not decided yet\n'))?.slice('Not decided yet'.length).trim();
  return { file, text, name: file.slice(11), title: text.match(/^# (.+)$/m)?.[1] ?? '', status: field(text, 'Status'), created: field(text, 'Created'), restsOn: field(text, 'Rests on'), undecided };
});

// A blueprint keeps the template's headings in order. "Not decided yet" may be left out once it is empty.
const headingsOf = (text) => [...prose(text).matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
const templateHeadings = headingsOf(read('blueprints/_template.md'));

for (const bp of blueprints) {
  const { file } = bp;
  const headings = headingsOf(bp.text);
  const expected = headings.includes('Not decided yet') ? templateHeadings : templateHeadings.filter((h) => h !== 'Not decided yet');
  if (headings.join('|') !== expected.join('|')) fail(file, `headings are "${headings.join('", "')}" but the template has "${expected.join('", "')}"`);

  // Criterion ids are a letter and a number in the first cell of a table row. Every id a blueprint cites must be one of its rows.
  const rowIds = [...bp.text.matchAll(/^\|\s*([A-Z]\d+)\s*\|/gm)].map((m) => m[1]);
  for (const id of new Set(rowIds)) if (rowIds.filter((r) => r === id).length > 1) fail(file, `id ${id} is used twice`);
  const cited = new Set([...bp.text.matchAll(/\(([A-Z]\d+(?:, [A-Z]\d+)*)\)/g)].flatMap((m) => m[1].split(', ')));
  for (const m of prose(bp.text).matchAll(/\b[A-Z]\d+\b/g)) cited.add(m[0]);
  for (const id of cited) if (!rowIds.includes(id)) fail(file, `cites id ${id}, which has no row`);

  if (!/^[a-z0-9_]+\.md$/.test(bp.name)) fail(file, 'file name must be lowercase with underscores');
  if (!BLUEPRINT_STATUS.test(bp.status ?? '')) fail(file, `status "${bp.status}" is not allowed`);
  if (!isDate(bp.created)) fail(file, 'needs a Created date');
  if (bp.restsOn === undefined) fail(file, 'needs a Rests on line');
  for (const number of (bp.restsOn ?? '').match(/\d{4}/g) ?? []) {
    const adr = adrByNumber.get(number);
    if (!adr) fail(file, `rests on ADR ${number}, which does not exist`);
    else if (['Accepted', 'Implemented'].includes(bp.status) && adr.status !== 'Accepted') fail(file, `is ${bp.status} but rests on ADR ${number}, which is ${adr.status}`);
  }
  if (['Accepted', 'Implemented'].includes(bp.status) && bp.undecided) fail(file, `is ${bp.status} but still has items under "Not decided yet"`);
  if (!blueprintIndex.has(bp.name)) fail(file, 'has no row in blueprints/README.md');
  else if (blueprintIndex.get(bp.name) !== bp.status) fail(file, `index says "${blueprintIndex.get(bp.name)}" but the header says "${bp.status}"`);
}
for (const name of blueprintIndex.keys()) if (!blueprintFiles.includes(`blueprints/${name}`)) fail('blueprints/README.md', `lists ${name}, which does not exist`);

// The lists of what is still to be written. A ruling carries its date, and a feature leaves its list once its blueprint exists.
const section = (file, heading) => read(file).split(/^## /m).find((s) => s.startsWith(`${heading}\n`)) ?? '';
const tableRows = (text) => text.split('\n').filter((l) => l.startsWith('|') && !/^\|[\s:|-]+\|$/.test(l)).slice(1).map((l) => l.split('|').slice(1, -1).map((c) => c.trim()));

for (const [ruled, decision, home] of tableRows(section('adrs/README.md', 'Ruled and waiting to be written'))) {
  if (!/^\d{4}-\d{2}-\d{2}( and \d{4}-\d{2}-\d{2})*$/.test(ruled)) fail('adrs/README.md', `the ruling "${decision.slice(0, 40)}" needs the date it was ruled`);
  if (!home) fail('adrs/README.md', `the ruling "${decision.slice(0, 40)}" does not say where it will be recorded`);
}
for (const [feature, , restsOn] of tableRows(section('blueprints/README.md', 'Blueprints to come'))) {
  if (blueprints.some((b) => b.title.toLowerCase() === feature.toLowerCase())) fail('blueprints/README.md', `"${feature}" has a blueprint, so it leaves "Blueprints to come"`);
  for (const [, number] of (restsOn ?? '').matchAll(/ADR (\d{4})/g)) if (!adrByNumber.has(number)) fail('blueprints/README.md', `"${feature}" rests on ADR ${number}, which does not exist`);
}

const terms = [...read('glossary.md').matchAll(/^### (.+)$/gm)].map((m) => m[1]);
terms.forEach((term, i) => {
  if (i > 0 && terms[i - 1].toLowerCase().localeCompare(term.toLowerCase(), 'en') > 0) fail('glossary.md', `"${term}" is out of alphabetical order`);
});

if (errors.length) {
  console.error(errors.join('\n'));
  console.error(`\n${errors.length} problem${errors.length === 1 ? '' : 's'} found.`);
} else {
  console.log('No problems found.');
}

const waiting = [
  ...adrs.filter((a) => a.status === 'Proposed').map((a) => ({ created: a.created, name: `ADR ${a.number}`, status: a.status, title: a.title })),
  ...blueprints.filter((b) => b.status === 'Draft').map((b) => ({ created: b.created, name: b.name, status: b.status, title: b.title })),
].sort((a, b) => `${a.created}${a.name}`.localeCompare(`${b.created}${b.name}`));

console.log('\nWaiting for acceptance, oldest first');
for (const w of waiting) console.log(`  ${w.created}  ${w.name}  ${w.status}  ${w.title}`);
if (!waiting.length) console.log('  nothing');

const proposed = adrs.filter((a) => a.status === 'Proposed').length;
if (proposed >= 5) console.log(`\n${proposed} ADRs are Proposed, so draft no new ADR unless the owner asks for one.`);

process.exit(errors.length ? 1 : 0);
