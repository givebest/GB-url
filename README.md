# GB-url

Parse and set url search parameters.

English | [简体中文](./README.zh-CN.md)

---

## Introduction

`queryParam` gets the value of a parameter in `window.location.search` or a string that matches the rule.  
`setParams` sets the value of one or more parameters in `window.location.search` or a string that matches the rule, and returns `[url]?p1=1&p2=2&p3=3`.

## Use

```bash
npm i gb-url
```

```js
import { setParams, queryParam } from "gb-url";
```

### Get URL parameter

```javascript
/**
 * gbUrl.queryParam(key, url);
 * @param  key [Name of the parameter to get]
 * @param  url [The URL to be resolved or a string that matches the rule, default is window.location.href]
 **/

const url = "a.html?a=1&b=2&c=3";
queryParam("a", url); // 1
queryParam("b", url); // 2
```

### Set URL parameters

```javascript
/**
 * gbUrl.setParams(params, url);
 * @param  params [Object to be set, assigned (key,value)]
 * @param  url [The URL to be resolved or a string that matches the rule, default is window.location.href]
 **/

const url = "a.html?a=1&b=2&c=3";
setParams(
  {
    a: "11111",
  },
  url
); // "a.html?a=11111&b=2&c=3"

setParams(
  {
    b: "2222",
    c: "3333",
    d: "4444",
  },
  url
); // "a.html?a=1&b=2222&c=3333&d=4444"
```

## License

[MIT](./LICENSE) © 2022 [givebest](https://github.com/givebest)

## Development

Use the pinned package manager (`pnpm@10.34.7`) with Node.js 18.12+ on an even-numbered supported release (CI uses Node.js 22):

```sh
pnpm install --frozen-lockfile --ignore-scripts
pnpm build
pnpm test
```

`pnpm dev` binds to `127.0.0.1`. The build continues to publish the same ESM and UMD/CommonJS entry points and browser targets. Compatibility tests compare the rebuilt library with the pre-upgrade bundle, including existing behavior and errors; they do not certify that every pre-existing API bug is fixed. See `verification/REPORT.md` for the dependency repair evidence and limitations.

## CI and publishing

Pushes and pull requests to `main` install the pinned pnpm dependencies with the frozen lockfile, build, and run regression tests on Node.js 22. They do not publish to npm.

To publish intentionally, run the **Build and publish** workflow manually on `main` and enable its **publish** input. It defaults to false. First confirm the package version is ready and has not already been published; npm versions cannot be overwritten. Publishing requires the repository’s `NPM_TOKEN` secret. The workflow does not bump versions or create releases automatically.
