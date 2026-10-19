const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const baseline = fs.readFileSync(path.join(__dirname, '../verification/baseline-gburl.umd.cjs'), 'utf8');
const current = fs.readFileSync(path.join(__dirname, '../dist/gburl.umd.cjs'), 'utf8');
function load(code, browser) {
  const context = { console: { log() {} } };
  if (browser) { context.window = context; context.location = { href: 'https://example.test/page?a=1&b=two#part', search: '?a=1&b=two' }; }
  else { context.module = { exports: {} }; context.exports = context.module.exports; }
  vm.runInNewContext(code, context);
  return browser ? context.gbUrl : context.module.exports;
}
const queries = [
  ['a', 'a.html?a=1&b=2'], ['b', 'a.html?a=1&b=2'],
  ['a', '?a=%E4%B8%AD%E6%96%87'], ['a', '?a=%ZZ'], ['a', '?a='],
  ['a', '?A=upper'], ['a', '?a=first&a=second'], ['a', '#a=hash'],
  ['missing', '?a=1'], ['a', '?a=a+b'], ['a'], ['a', '']
];
const updates = [
  [{a:'11111'}, 'a.html?a=1&b=2&c=3'],
  [{b:'2222',c:'3333',d:'4444'}, 'a.html?a=1&b=2&c=3'],
  [{a:'new'}, 'a.html'], [{a:''}, '?a=old'], [{}, '?a=1'],
  [{x:'a&b=c'}, 'https://example.test/?a=1#hash'], [{a:'中文'}, ''], [{a:'2'}]
];
function outcome(api, method, args) {
  try { return { value: api[method](...args) }; }
  catch (e) { return { error: e.name, message: e.message }; }
}
for (const browser of [false, true]) test(`${browser ? 'browser global' : 'CommonJS'} API preserves baseline outcomes`, () => {
  const before = load(baseline, browser), after = load(current, browser);
  assert.deepEqual(Object.keys(after).sort(), ['queryParam','setParams']);
  assert.equal(after.__esModule, before.__esModule);
  assert.equal(after[Symbol.toStringTag], before[Symbol.toStringTag]);
  for (const args of queries) assert.deepEqual(outcome(after,'queryParam',args),outcome(before,'queryParam',args),JSON.stringify(args));
  for (const args of updates) assert.deepEqual(outcome(after,'setParams',args),outcome(before,'setParams',args),JSON.stringify(args));
});
test('queryParam documented decoding and malformed-input handling', () => {
  const api = load(current, false);
  assert.equal(api.queryParam('a','a.html?a=1&b=2'), '1');
  assert.equal(api.queryParam('a','?a=%E4%B8%AD%E6%96%87'), '中文');
  assert.equal(api.queryParam('a','?a=%ZZ'), '');
  assert.equal(api.queryParam('missing','?a=1'), '');
});
test('ESM and CommonJS named exports agree', async () => {
  const esm = await import(pathToFileURL(path.join(__dirname,'../dist/gburl.js')));
  const cjs = load(current, false);
  assert.deepEqual(Object.keys(esm).sort(), ['queryParam','setParams']);
  for (const args of queries) assert.deepEqual(outcome(esm,'queryParam',args),outcome(cjs,'queryParam',args));
  for (const args of updates) assert.deepEqual(outcome(esm,'setParams',args),outcome(cjs,'setParams',args));
});
test('package entry points and declarations remain available', () => {
  const p = JSON.parse(fs.readFileSync(path.join(__dirname,'../package.json')));
  assert.equal(p.main,'./dist/gburl.umd.cjs'); assert.equal(p.module,'./dist/gburl.js');
  assert.equal(p.exports.require,p.main); assert.equal(p.exports.import,p.module);
  for (const file of [p.main,p.module,p.types]) assert(fs.existsSync(path.join(__dirname,'..',file)));
});
