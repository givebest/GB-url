const i = typeof window < "u", f = typeof globalThis < "u" ? globalThis : window, c = () => i ? f.location.href : "";
function h(e, n) {
  n = n || c();
  const t = new RegExp("[?&#]" + e + "=([^&#]*)", "i"), o = n.match(t);
  if (o)
    try {
      return decodeURIComponent(o[1]) || "";
    } catch {
      return "";
    }
  return "";
}
function u(e) {
  e = e || (i ? f.location : "");
  const n = typeof e == "object" ? c() : e;
  let t = i ? e.search : "";
  if (!n || n.indexOf("?") < 0 || !t && typeof t != "function")
    return "";
  console.log("uriQuery", t, typeof t);
  let o = n.match(/(.*?)\?(.*)/), r = t && t.match(/^\?(.*)/)[1];
  return t = typeof t == "function" ? o && o : r, console.log("uriQuery2", t, typeof t), t = t.indexOf("#") > -1 ? t.match(/(.*?)#(.*)/)[1] : t, t;
}
function l(e) {
  e = e || c();
  let n = u(e) || "", t = {};
  return n.replace(
    /([^&]*?)\=(.*?)(&|$)/gi,
    function(o, r, a) {
      console.log("a", o), t[r] = a;
    }
  ), t;
}
function s(e) {
  e = e || {};
  var n = [];
  for (var t in e)
    e[t] && n.push(t + "=" + e[t]);
  return n.join("&");
}
function y(e, n) {
  e = e || {}, n = n || c();
  var t = l(n), o;
  for (var r in e)
    e[r] && (t[r] = e[r]);
  return o = s(t), n.split("?")[0] + (o ? "?" + o : "");
}
export {
  h as queryParam,
  y as setParams
};
