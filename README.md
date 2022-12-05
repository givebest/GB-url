# GB-url

Parse and set url search parameters.

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
