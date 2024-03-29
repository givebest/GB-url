/**
 * GB-url.js
 * @see https://github.com/givebest/GB-url
 * @author givenlovs[at]msn.com
 * @(c) 2022
 **/
export type Params = Record<string, string>;
type LocationHref = () => string;

const isBrowser = typeof window !== "undefined";
const global = typeof globalThis !== "undefined" ? globalThis : window;

const locationHref: LocationHref = () => {
  return isBrowser ? global.location.href : "";
};

/**
 * 获取 url 参数值
 */
function queryParam(key: string, url?: string) {
  url = url || locationHref();
  const reg = new RegExp("[?&#]" + key + "=([^&#]*)", "i"),
    match = url.match(reg);
  if (match) {
    try {
      return decodeURIComponent(match[1]) || "";
    } catch (e) {
      return "";
    }
  }
  return "";
}

/**
 * [urlQuery description]
 */
function urlQuery(uri: any) {
  // const url: string = uri ? uri : locationHref();
  uri = !uri ? (isBrowser ? global.location : "") : uri;

  const url = typeof uri === "object" ? locationHref() : uri;

  let uriQuery: any = isBrowser ? uri.search : "";

  if (
    !url ||
    url.indexOf("?") < 0 ||
    (!uriQuery && typeof uriQuery !== "function")
  ) {
    return "";
  }

  console.log("uriQuery", uriQuery, typeof uriQuery);

  let urlMatch: RegExpMatchArray | null = url.match(/(.*?)\?(.*)/);

  let uriQueryMatch: RegExpMatchArray | null =
    uriQuery && uriQuery.match(/^\?(.*)/)[1];

  uriQuery =
    typeof uriQuery === "function" ? urlMatch && urlMatch : uriQueryMatch;

  console.log("uriQuery2", uriQuery, typeof uriQuery);

  uriQuery =
    uriQuery.indexOf("#") > -1 ? uriQuery.match(/(.*?)#(.*)/)[1] : uriQuery;
  return uriQuery;
}

/**
 * 获取URL参数组装成JSON
 */
function getAllParams(url: string) {
  url = url || locationHref();
  let s = urlQuery(url) || "",
    map: Params = {};
  //console.log(s)
  s.replace(
    /([^&]*?)\=(.*?)(&|$)/gi,
    function (a: string, key: string, value: string) {
      console.log("a", a);
      map[key] = value;
    }
  );
  //console.log(map);
  return map;
}

/**
 * 解析JSON为URL
 */
function serializer(json: Params) {
  json = json || {};
  var str = [];
  for (var key in json) {
    !!json[key] && str.push(key + "=" + json[key]);
  }
  return str.join("&");
}

/**
 * 设置URL参数
 */
function setParams(params: Params, url: string) {
  params = params || {};
  url = url || locationHref();
  var oriParams = getAllParams(url);
  var query;
  for (var key in params) {
    if (params[key]) {
      oriParams[key] = params[key];
    }
  }
  query = serializer(oriParams);
  // console.log(url.split('?')[0] + query ? '?' + query : '');
  // return url.split("?")[0] + query && "?" + query;
  return url.split("?")[0] + (query ? "?" + query : "");
}

export { setParams, queryParam };
