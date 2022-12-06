const i = typeof window < "u", c = typeof globalThis < "u" ? globalThis : window;
function h(e, n) {
  n = n || i ? c.location.href : "";
  const t = new RegExp("[?&#]" + e + "=([^&#]*)", "i"), r = n.match(t);
  if (r)
    try {
      return decodeURIComponent(r[1]) || "";
    } catch {
      return "";
    }
  return "";
}
function f(e) {
  const n = e || (i ? c.location.href : "");
  let t = e.search;
  if (!n || n.indexOf("?") < 0 || !t && typeof t != "function")
    return "";
  let r = n.match(/(.*?)\?(.*)/), o = t && t.match(/^\?(.*)/)[1];
  return t = typeof t == "function" ? r && r : o, t = t.indexOf("#") > -1 ? t.match(/(.*?)#(.*)/)[1] : t, t;
}
function u(e) {
  e = e || i ? c.location.href : "";
  let n = f(e) || "", t = {};
  return n.replace(
    /([^&]*?)\=(.*?)(&|$)/gi,
    function(r, o, a) {
      console.log("a", r), t[o] = a;
    }
  ), t;
}
function l(e) {
  e = e || {};
  var n = [];
  for (var t in e)
    e[t] && n.push(t + "=" + e[t]);
  return n.join("&");
}
function s(e, n) {
  e = e || {}, n = n || i ? c.location.href : "";
  var t = u(n), r;
  for (var o in e)
    e[o] && (t[o] = e[o]);
  return r = l(t), n.split("?")[0] + (r ? "?" + r : "");
}
export {
  h as queryParam,
  s as setParams
};
