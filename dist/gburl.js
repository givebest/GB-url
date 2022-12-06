const i = typeof window < "u";
function h(n, e) {
  e = e || i ? window.location.href : "";
  const t = new RegExp("[?&#]" + n + "=([^&#]*)", "i"), r = e.match(t);
  if (r)
    try {
      return decodeURIComponent(r[1]) || "";
    } catch {
      return "";
    }
  return "";
}
function f(n) {
  const e = n || (i ? window.location.href : "");
  let t = n.search;
  if (!e || e.indexOf("?") < 0 || !t && typeof t != "function")
    return "";
  let r = e.match(/(.*?)\?(.*)/), o = t && t.match(/^\?(.*)/)[1];
  return t = typeof t == "function" ? r && r : o, t = t.indexOf("#") > -1 ? t.match(/(.*?)#(.*)/)[1] : t, t;
}
function a(n) {
  n = n || i ? window.location.href : "";
  let e = f(n) || "", t = {};
  return e.replace(
    /([^&]*?)\=(.*?)(&|$)/gi,
    function(r, o, c) {
      console.log("a", r), t[o] = c;
    }
  ), t;
}
function u(n) {
  n = n || {};
  var e = [];
  for (var t in n)
    n[t] && e.push(t + "=" + n[t]);
  return e.join("&");
}
function w(n, e) {
  n = n || {}, e = e || i ? window.location.href : "";
  var t = a(e), r;
  for (var o in n)
    n[o] && (t[o] = n[o]);
  return r = u(t), e.split("?")[0] + (r ? "?" + r : "");
}
export {
  h as queryParam,
  w as setParams
};
