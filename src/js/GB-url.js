/**
* GB-url.js
* @see https://github.com/givebest/GB-url
* @author givenlovs[at]msn.com
* @(c) 2017
**/
;(function (window) {
  /**
   * 获取 url 参数值
   * @param  {[type]} key [description]
   * @param  {[type]} url [description]
   * @return {[type]}     [description]
   */
  function queryParam(key, url) {
      url = url || window.location.href;
      var reg = new RegExp('[?&#]' + key + '=([^&#]*)', 'i'),
          match = url.match(reg);
      if (match) {
          try {
              return decodeURIComponent(match[1]) || '';
          } catch (e) {

          }
      }
      return '';
  }


  /**
   * [urlQuery description]
   * @param  {[type]} uri [description]
   * @return {[type]}     [description]
   */
   function urlQuery(uri) {
      uri = !uri ? window.location : uri;
      var url = typeof uri === 'object' ? uri.href : uri;
      var uriQuery = uri.search;  
      if(url.indexOf('?') < 0 || (!uriQuery && typeof uriQuery !== 'function')){
          return '';
      }
      uriQuery = typeof uriQuery === 'function' ? url.match(/(.*?)\?(.*)/)[2] : uriQuery.match(/^\?(.*)/)[1];
      uriQuery = uriQuery.indexOf('#') > -1 ? uriQuery.match(/(.*?)#(.*)/)[1] : uriQuery;
      return uriQuery;
  }

  /**
   * 获取URL参数组装成JSON
   * @param  {[type]} url [description]
   * @return {[type]}     [description]
   */
  function getAllParams(url) {
      url = url || window.location.href;
      var s = urlQuery(url) || '',
          map = {};
      //console.log(s)
      s.replace(/([^&]*?)\=(.*?)(&|$)/ig, function(a, key, value){
          map[key] = value;
      });
      //console.log(map);
      return map;
  }

  /**
   * 解析JSON为URL
   * @param  {[type]} json [description]
   * @return {[type]}      [description]
   */
  function serializer(json) {
      json = json || {};
      var str = [];
      for(var key in json){
          !!json[key] && str.push(key + '=' + json[key]);
      }
      return str.join('&');
  }

  /**
   * 设置URL参数
   * @param {[type]} params [description]
   * @param {[type]} url    [description]
   */
  function setParams(params, url) {
      params = params || {};
      url = url || window.location.href;
      var oriParams = getAllParams(url);
      var query;
      for(var key in params){
          if(params[key]){
              oriParams[key] = params[key];
          }
      }
      query = serializer(oriParams);
      // console.log(url.split('?')[0] + query ? '?' + query : '');
      return (url.split('?')[0] + query) && '?' + query;
  }

  var gbUrl = {
    setParams: setParams,
    queryParam: queryParam
  }

  // AMD (@see https://github.com/jashkenas/underscore/blob/master/underscore.js)
  if (typeof define == 'function' && define.amd) {
    define('GB-url', [], function () {
      return gbUrl;
    });
  } else {
    // (@see https://github.com/madrobby/zepto/blob/master/src/zepto.js)
    window.gbUrl === undefined && (window.gbUrl = gbUrl);
  } 

})(window);