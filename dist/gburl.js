function u(t, e) {
  e = e || window.location.href;
  const r = new RegExp("[?&#]" + t + "=([^&#]*)", "i"), n = e.match(r);
  if (n)
    try {
      return decodeURIComponent(n[1]) || "";
    } catch {
      return "";
    }
  return "";
}
function c(t) {
  const e = window.location, r = t || e.href;
  let n = t.search;
  if (!r || r.indexOf("?") < 0 || !n && typeof n != "function")
    return "";
  let o = r.match(/(.*?)\?(.*)/), i = n && n.match(/^\?(.*)/)[1];
  return n = typeof n == "function" ? o && o : i, n = n.indexOf("#") > -1 ? n.match(/(.*?)#(.*)/)[1] : n, n;
}
function a(t) {
  t = t || window.location.href;
  let e = c(t) || "", r = {};
  return e.replace(
    /([^&]*?)\=(.*?)(&|$)/gi,
    function(n, o, i) {
      console.log("a", n), r[o] = i;
    }
  ), r;
}
function f(t) {
  t = t || {};
  var e = [];
  for (var r in t)
    t[r] && e.push(r + "=" + t[r]);
  return e.join("&");
}
function h(t, e) {
  t = t || {}, e = e || window.location.href;
  var r = a(e), n;
  for (var o in t)
    t[o] && (r[o] = t[o]);
  return n = f(r), e.split("?")[0] + (n ? "?" + n : "");
}
export {
  u as queryParam,
  h as setParams
};
