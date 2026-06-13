/**
 * Comprueba enlaces http(s) en archivos Markdown bajo docs/ (HEAD, con reintento GET si hace falta).
 * Uso desde la carpeta web: npm run check:links
 *
 * Variables opcionales:
 *   LINK_CHECK_DELAY_MS=300   pausa entre peticiones
 *   LINK_CHECK_TIMEOUT_MS=12000
 */

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsDir = path.join(__dirname, '..', 'docs');
const delayMs = Number(process.env.LINK_CHECK_DELAY_MS || 300);
const timeoutMs = Number(process.env.LINK_CHECK_TIMEOUT_MS || 12000);

/** Captura URLs en markdown / texto plano (no perfecto, suficiente para docs). */
const URL_RE = /https?:\/\/[^\s\])>'"<]+/g;

const SKIP_HOSTS = new Set([
  'localhost',
  '127.0.0.1',
  '0.0.0.0',
  'example.com',
]);

function walkMarkdownFiles(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, {withFileTypes: true})) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkMarkdownFiles(p, acc);
    else if (ent.isFile() && ent.name.endsWith('.md')) acc.push(p);
  }
  return acc;
}

function isPlaceholderUrl(url) {
  try {
    const u = new URL(url);
    if (u.hostname !== 'github.com') return false;
    const parts = u.pathname.split('/').filter(Boolean);
    if (parts.length < 2) return false;
    const owner = parts[0].toLowerCase();
    return ['usuario', 'original', 'tu-usuario'].includes(owner);
  } catch {
    return false;
  }
}

function cleanUrl(raw) {
  return raw
    .replace(/[),.;:]+$/g, '')
    .replace(/%29$/g, '');
}

function extractUrlsFromFile(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const urls = new Set();
  let m;
  const re = new RegExp(URL_RE.source, 'g');
  while ((m = re.exec(text)) !== null) {
    const u = cleanUrl(m[0]);
    try {
      const host = new URL(u).hostname.toLowerCase();
      if (SKIP_HOSTS.has(host)) continue;
      if (isPlaceholderUrl(u)) continue;
    } catch {
      continue;
    }
    urls.add(u);
  }
  return urls;
}

async function checkOne(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const headers = {
    'User-Agent': 'Biblioteca-docs-link-check/1.0 (+local CI)',
    Accept: '*/*',
  };
  try {
    let res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
      headers,
    });
    if (res.status === 405 || res.status === 501) {
      res = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers: {...headers, Range: 'bytes=0-0'},
      });
    }
    return {url, status: res.status, ok: res.ok};
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return {url, status: 0, ok: false, error: msg};
  } finally {
    clearTimeout(timer);
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  if (!fs.existsSync(docsDir)) {
    console.error('No existe la carpeta docs:', docsDir);
    process.exit(1);
  }

  const files = walkMarkdownFiles(docsDir);
  const urlToFiles = new Map();

  for (const file of files) {
    for (const url of extractUrlsFromFile(file)) {
      if (!urlToFiles.has(url)) urlToFiles.set(url, new Set());
      urlToFiles.get(url).add(path.relative(path.join(__dirname, '..'), file));
    }
  }

  const urls = [...urlToFiles.keys()].sort();
  console.log(`Archivos .md: ${files.length} | URLs únicas: ${urls.length}\n`);

  const failures = [];
  const warnings = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    process.stdout.write(`[${i + 1}/${urls.length}] ${url.slice(0, 72)}… `);
    const result = await checkOne(url);
    if (result.ok) {
      console.log(result.status);
    } else if (result.status === 401 || result.status === 403) {
      console.log(`${result.status} (advertencia)`);
      warnings.push({...result, files: [...urlToFiles.get(url)]});
    } else {
      console.log(`FALLO ${result.status || ''} ${result.error || ''}`.trim());
      failures.push({...result, files: [...urlToFiles.get(url)]});
    }
    if (i < urls.length - 1) await sleep(delayMs);
  }

  console.log('\n--- Resumen ---');
  console.log(`Advertencias (401/403): ${warnings.length}`);
  console.log(`Fallos: ${failures.length}`);

  if (warnings.length) {
    console.log('\nAdvertencias:');
    for (const w of warnings) {
      console.log(`  ${w.status} ${w.url}`);
      for (const f of w.files) console.log(`    en ${f}`);
    }
  }

  if (failures.length) {
    console.log('\nFallos:');
    for (const f of failures) {
      console.log(`  ${f.status || 'ERR'} ${f.url} ${f.error || ''}`);
      for (const file of f.files) console.log(`    en ${file}`);
    }
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
