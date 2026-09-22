const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
function compile(path, context, transform = s => s) {
  const source = transform(fs.readFileSync(path, 'utf8'));
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, target: ts.ScriptTarget.ES2020 } }).outputText;
  const sandbox = { exports: {}, require, ...context };
  vm.runInNewContext(code, sandbox);
  return sandbox.exports;
}
const requests = [], cookieWrites = [];
const document = {
  createElement: () => ({ remove() { this.removed = true; } }),
  head: { appendChild: element => requests.push(element) },
  get cookie() { return '_ga=abc; _ga_TEST=123; essential=keep'; },
  set cookie(value) { cookieWrites.push(value); }
};
const window = {};
const location = { origin: 'https://example.com', pathname: '/contact', hostname: 'example.com' };
const api = compile('src/lib/analytics.ts', { window, document, location }, s => s.replace('import.meta.env.VITE_GA_MEASUREMENT_ID', "'G-TEST'"));
assert.equal(requests.length, 0, 'No tag requests at module import');
api.recordPageView('/contact');
assert.equal(window.dataLayer, undefined, 'No measurement before opt-in');
api.startAnalytics();
api.startAnalytics();
assert.equal(requests.length, 1, 'Only one tag inserted');
api.recordPageView('/contact');
const commands = window.dataLayer.map(a => Array.from(a));
const config = commands.find(c => c[0] === 'config')[2];
assert.equal(config.send_page_view, false);
assert.equal(config.allow_google_signals, false);
assert.equal(config.cookie_update, false);
assert.equal(config.cookie_expires, 15552000);
assert.equal(commands.find(c => c[0] === 'event')[2].page_location, 'https://example.com/contact');
api.stopAnalytics();
assert.equal(window['ga-disable-G-TEST'], true);
assert.equal(requests[0].removed, true);
assert(cookieWrites.some(v => v.startsWith('_ga=;')));
assert(cookieWrites.some(v => v.startsWith('_ga_TEST=;')));
assert(!cookieWrites.some(v => v.startsWith('essential=')));
const afterStop = window.dataLayer.length;
api.recordPageView('/privacy');
assert.equal(window.dataLayer.length, afterStop, 'Withdrawal prevents page events');
const absentRequests = [];
const disabled = compile('src/lib/analytics.ts', { window: {}, document: { ...document, head: { appendChild: e => absentRequests.push(e) } }, location }, s => s.replace('import.meta.env.VITE_GA_MEASUREMENT_ID', "''"));
disabled.startAnalytics();
assert.equal(absentRequests.length, 0, 'Missing ID fails closed');
let stored = null;
const consent = compile('src/components/privacy/CookieConsent.tsx', {
  localStorage: { getItem: () => stored },
  require: name => name.includes('lib/analytics') ? { ANALYTICS_ID: '' } : name.includes('ui/Button') ? {} : require(name)
});
assert.equal(consent.readPreference(), null);
for (const invalid of ['{', '{}', 'null', JSON.stringify({ version: 1 }), JSON.stringify({ version: 2, externalFonts: true, analytics: true, analyticsId: 'G-OLD', savedAt: Date.now() })]) {
  stored = invalid;
  assert.equal(consent.readPreference(), null);
}
const valid = { version: 2, externalFonts: false, analytics: false, analyticsId: '', savedAt: Date.now() };
stored = JSON.stringify(valid);
assert.equal(consent.readPreference().externalFonts, false);
stored = JSON.stringify({ ...valid, savedAt: Date.now() - 181 * 86400000 });
assert.equal(consent.readPreference(), null, 'Expired permission is rejected');
stored = JSON.stringify({ ...valid, savedAt: Date.now() + 86400000 });
assert.equal(consent.readPreference(), null, 'Future timestamp is rejected');
console.log('Privacy checks passed: default blocking, optional activation, withdrawal, cookie removal, missing ID, consent validation and expiry.');
