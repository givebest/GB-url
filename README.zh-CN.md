# GB-url

解析、设置 url search 参数。

简体中文 | [English](./README.md)

---

## 简介

`queryParam` 获取 `window.location.search` 或符合规则的字符串中某个参数的值。  
`setParams` 设置 `window.location.search` 或符合规则的字符串中一个或多个参数的值，并返回 `[url]?p1=1&p2=2&p3=3` 。

## 使用

```bash
npm i gb-url
```

```js
import { setParams, queryParam } from "gb-url";
```

### 获取 URL 参数值

```javascript
/**
 * gbUrl.queryParam(key, url);
 * @param  key [要获取的参数名]
 * @param  url [要解析的 URL 或者 符合规则的字符串，默认为 window.location.href]
 **/

const url = "a.html?a=1&b=2&c=3";
queryParam("a", url); // 1
queryParam("b", url); // 2
```

### 设置、赋值 URL 参数

```javascript
/**
 * gbUrl.setParams(params, url);
 * @param  params [要设置、赋值的对象（key,value）]
 * @param  url [要解析的 URL 或者 符合规则的字符串，默认为 window.location.href]
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
