/**
 * GB-url.js
 * @see https://github.com/givebest/GB-url
 * @author givenlovs[at]msn.com
 * @(c) 2022
 **/

export type Params = Record<string, string>

/**
 * 获取 url 参数值
 */
function queryParam(key: string, url?: string) {
  url = url || window.location.href
  const reg = new RegExp('[?&#]' + key + '=([^&#]*)', 'i'),
    match = url.match(reg)
  if (match) {
    try {
      return decodeURIComponent(match[1]) || ''
    } catch (e) {
      return ''
    }
  }
  return ''
}

/**
 * [urlQuery description]
 */
function urlQuery(uri: string) {
  const windowLocation = window.location
  const url: string = uri ? uri : windowLocation.href

  let uriQuery: any = uri.search

  if (
    !url ||
    url.indexOf('?') < 0 ||
    (!uriQuery && typeof uriQuery !== 'function')
  ) {
    return ''
  }

  let urlMatch: RegExpMatchArray | null = url.match(/(.*?)\?(.*)/)
  let uriQueryMatch: RegExpMatchArray | null =
    uriQuery && uriQuery.match(/^\?(.*)/)[1]

  uriQuery =
    typeof uriQuery === 'function' ? urlMatch && urlMatch : uriQueryMatch

  uriQuery =
    uriQuery.indexOf('#') > -1 ? uriQuery.match(/(.*?)#(.*)/)[1] : uriQuery
  return uriQuery
}

/**
 * 获取URL参数组装成JSON
 */
function getAllParams(url: string) {
  url = url || window.location.href
  let s = urlQuery(url) || '',
    map: Params = {}
  //console.log(s)
  s.replace(
    /([^&]*?)\=(.*?)(&|$)/gi,
    function (a: string, key: string, value: string) {
      console.log('a', a)
      map[key] = value
    }
  )
  //console.log(map);
  return map
}

/**
 * 解析JSON为URL
 */
function serializer(json: Params) {
  json = json || {}
  var str = []
  for (var key in json) {
    !!json[key] && str.push(key + '=' + json[key])
  }
  return str.join('&')
}

/**
 * 设置URL参数
 */
function setParams(params: Params, url: string) {
  params = params || {}
  url = url || window.location.href
  var oriParams = getAllParams(url)
  var query
  for (var key in params) {
    if (params[key]) {
      oriParams[key] = params[key]
    }
  }
  query = serializer(oriParams)
  // console.log(url.split('?')[0] + query ? '?' + query : '');
  // return url.split("?")[0] + query && "?" + query;
  return url.split('?')[0] + (query ? '?' + query : '')
}

export { setParams, queryParam }
