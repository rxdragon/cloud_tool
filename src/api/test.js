!function (e) { var t = {}; function n(r) { if (t[r]) return t[r].exports; var s = t[r] = { i: r, l: !1, exports: {} }; return e[r].call(s.exports, s, s.exports, n), s.l = !0, s.exports } n.m = e, n.c = t, n.d = function (e, t, r) { n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r }) }, n.r = function (e) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }) }, n.t = function (e, t) { if (1 & t && (e = n(e)), 8 & t) return e; if (4 & t && "object" == typeof e && e && e.__esModule) return e; var r = Object.create(null); if (n.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e) for (var s in e) n.d(r, s, function (t) { return e[t] }.bind(null, s)); return r }, n.n = function (e) { var t = e && e.__esModule ? function () { return e.default } : function () { return e }; return n.d(t, "a", t), t }, n.o = function (e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, n.p = "//s1.hdslb.com/bfs/static/jinkela/video/", n(n.s = 3) }([function (e, t, n) { "use strict"; try { self["workbox:precaching:5.1.3"] && _() } catch (e) { } }, function (e, t, n) { "use strict"; try { self["workbox:core:5.1.3"] && _() } catch (e) { } }, function (e, t) { e.exports = function (e, t, n) { return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e } }, function (e, t, n) { "use strict"; n.r(t); var r = n(2), s = n.n(r); n(0); const c = [], a = { get: () => c, add(e) { c.push(...e) } }; n(1); const o = { googleAnalytics: "googleAnalytics", precache: "precache-v2", prefix: "workbox", runtime: "runtime", suffix: "undefined" != typeof registration ? registration.scope : "" }, i = e => [o.prefix, e, o.suffix].filter(e => e && e.length > 0).join("-"), l = e => e || i(o.precache), h = (e, ...t) => { let n = e; return t.length > 0 && (n += " :: " + JSON.stringify(t)), n }; class u extends Error { constructor(e, t) { super(h(e, t)), this.name = e, this.details = t } } const f = new Set; const d = (e, t) => e.filter(e => t in e), p = async ({ request: e, mode: t, plugins: n = [] }) => { const r = d(n, "cacheKeyWillBeUsed"); let s = e; for (const e of r) s = await e.cacheKeyWillBeUsed.call(e, { mode: t, request: s }), "string" == typeof s && (s = new Request(s)); return s }, y = async ({ cacheName: e, request: t, event: n, matchOptions: r, plugins: s = [] }) => { const c = await self.caches.open(e), a = await p({ plugins: s, request: t, mode: "read" }); let o = await c.match(a, r); for (const t of s) if ("cachedResponseWillBeUsed" in t) { const s = t.cachedResponseWillBeUsed; o = await s.call(t, { cacheName: e, event: n, matchOptions: r, cachedResponse: o, request: a }) } return o }, w = async ({ cacheName: e, request: t, response: n, event: r, plugins: s = [], matchOptions: c }) => { const a = await p({ plugins: s, request: t, mode: "write" }); if (!n) throw new u("cache-put-with-no-response", { url: (o = a.url, new URL(String(o), location.href).href.replace(new RegExp("^" + location.origin), "")) }); var o; const i = await (async ({ request: e, response: t, event: n, plugins: r = [] }) => { let s = t, c = !1; for (const t of r) if ("cacheWillUpdate" in t) { c = !0; const r = t.cacheWillUpdate; if (s = await r.call(t, { request: e, response: s, event: n }), !s) break } return c || (s = s && 200 === s.status ? s : void 0), s || null })({ event: r, plugins: s, response: n, request: a }); if (!i) return void 0; const l = await self.caches.open(e), h = d(s, "cacheDidUpdate"), w = h.length > 0 ? await y({ cacheName: e, matchOptions: c, request: a }) : null; try { await l.put(a, i) } catch (e) { throw "QuotaExceededError" === e.name && await async function () { for (const e of f) await e() }(), e } for (const t of h) await t.cacheDidUpdate.call(t, { cacheName: e, event: r, oldResponse: w, newResponse: i, request: a }) }, g = async ({ request: e, fetchOptions: t, event: n, plugins: r = [] }) => { if ("string" == typeof e && (e = new Request(e)), n instanceof FetchEvent && n.preloadResponse) { const e = await n.preloadResponse; if (e) return e } const s = d(r, "fetchDidFail"), c = s.length > 0 ? e.clone() : null; try { for (const t of r) if ("requestWillFetch" in t) { const r = t.requestWillFetch, s = e.clone(); e = await r.call(t, { request: s, event: n }) } } catch (e) { throw new u("plugin-error-request-will-fetch", { thrownError: e }) } const a = e.clone(); try { let s; s = "navigate" === e.mode ? await fetch(e) : await fetch(e, t); for (const e of r) "fetchDidSucceed" in e && (s = await e.fetchDidSucceed.call(e, { event: n, request: a, response: s })); return s } catch (e) { 0; for (const t of s) await t.fetchDidFail.call(t, { error: e, event: n, originalRequest: c.clone(), request: a.clone() }); throw e } }; let m; async function v(e, t) { const n = e.clone(), r = { headers: new Headers(n.headers), status: n.status, statusText: n.statusText }, s = t ? t(r) : r, c = function () { if (void 0 === m) { const e = new Response(""); if ("body" in e) try { new Response(e.body), m = !0 } catch (e) { m = !1 } m = !1 } return m }() ? n.body : await n.blob(); return new Response(c, s) } function b(e) { if (!e) throw new u("add-to-cache-list-unexpected-type", { entry: e }); if ("string" == typeof e) { const t = new URL(e, location.href); return { cacheKey: t.href, url: t.href } } const { revision: t, url: n } = e; if (!n) throw new u("add-to-cache-list-unexpected-type", { entry: e }); if (!t) { const e = new URL(n, location.href); return { cacheKey: e.href, url: e.href } } const r = new URL(n, location.href), s = new URL(n, location.href); return r.searchParams.set("__WB_REVISION__", t), { cacheKey: r.href, url: s.href } } class R { constructor(e) { this._cacheName = l(e), this._urlsToCacheKeys = new Map, this._urlsToCacheModes = new Map, this._cacheKeysToIntegrities = new Map } addToCacheList(e) { const t = []; for (const n of e) { "string" == typeof n ? t.push(n) : n && void 0 === n.revision && t.push(n.url); const { cacheKey: e, url: r } = b(n), s = "string" != typeof n && n.revision ? "reload" : "default"; if (this._urlsToCacheKeys.has(r) && this._urlsToCacheKeys.get(r) !== e) throw new u("add-to-cache-list-conflicting-entries", { firstEntry: this._urlsToCacheKeys.get(r), secondEntry: e }); if ("string" != typeof n && n.integrity) { if (this._cacheKeysToIntegrities.has(e) && this._cacheKeysToIntegrities.get(e) !== n.integrity) throw new u("add-to-cache-list-conflicting-integrities", { url: r }); this._cacheKeysToIntegrities.set(e, n.integrity) } if (this._urlsToCacheKeys.set(r, e), this._urlsToCacheModes.set(r, s), t.length > 0) { const e = `Workbox is precaching URLs without revision info: ${t.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`; console.warn(e) } } } async install({ event: e, plugins: t } = {}) { const n = [], r = [], s = await self.caches.open(this._cacheName), c = await s.keys(), a = new Set(c.map(e => e.url)); for (const [e, t] of this._urlsToCacheKeys) a.has(t) ? r.push(e) : n.push({ cacheKey: t, url: e }); const o = n.map(({ cacheKey: n, url: r }) => { const s = this._cacheKeysToIntegrities.get(n), c = this._urlsToCacheModes.get(r); return this._addURLToCache({ cacheKey: n, cacheMode: c, event: e, integrity: s, plugins: t, url: r }) }); await Promise.all(o); return { updatedURLs: n.map(e => e.url), notUpdatedURLs: r } } async activate() { const e = await self.caches.open(this._cacheName), t = await e.keys(), n = new Set(this._urlsToCacheKeys.values()), r = []; for (const s of t) n.has(s.url) || (await e.delete(s), r.push(s.url)); return { deletedURLs: r } } async _addURLToCache({ cacheKey: e, url: t, cacheMode: n, event: r, plugins: s, integrity: c }) { const a = new Request(t, { integrity: c, cache: n, credentials: "same-origin" }); let o, i = await g({ event: r, plugins: s, request: a }); for (const e of s || []) "cacheWillUpdate" in e && (o = e); if (!(o ? await o.cacheWillUpdate({ event: r, request: a, response: i }) : i.status < 400)) throw new u("bad-precaching-response", { url: t, status: i.status }); i.redirected && (i = await v(i)), await w({ event: r, plugins: s, response: i, request: e === t ? a : new Request(e), cacheName: this._cacheName, matchOptions: { ignoreSearch: !0 } }) } getURLsToCacheKeys() { return this._urlsToCacheKeys } getCachedURLs() { return [...this._urlsToCacheKeys.keys()] } getCacheKeyForURL(e) { const t = new URL(e, location.href); return this._urlsToCacheKeys.get(t.href) } async matchPrecache(e) { const t = e instanceof Request ? e.url : e, n = this.getCacheKeyForURL(t); if (n) { return (await self.caches.open(this._cacheName)).match(n) } } createHandler(e = !0) { return async ({ request: t }) => { try { const e = await this.matchPrecache(t); if (e) return e; throw new u("missing-precache-entry", { cacheName: this._cacheName, url: t instanceof Request ? t.url : t }) } catch (n) { if (e) return fetch(t); throw n } } } createHandlerBoundToURL(e, t = !0) { if (!this.getCacheKeyForURL(e)) throw new u("non-precached-url", { url: e }); const n = this.createHandler(t), r = new Request(e); return () => n({ request: r }) } } let _; const U = () => (_ || (_ = new R), _); const L = (e, t) => { const n = U().getURLsToCacheKeys(); for (const r of function* (e, { ignoreURLParametersMatching: t, directoryIndex: n, cleanURLs: r, urlManipulation: s } = {}) { const c = new URL(e, location.href); c.hash = "", yield c.href; const a = function (e, t = []) { for (const n of [...e.searchParams.keys()]) t.some(e => e.test(n)) && e.searchParams.delete(n); return e }(c, t); if (yield a.href, n && a.pathname.endsWith("/")) { const e = new URL(a.href); e.pathname += n, yield e.href } if (r) { const e = new URL(a.href); e.pathname += ".html", yield e.href } if (s) { const e = s({ url: c }); for (const t of e) yield t.href } }(e, t)) { const e = n.get(r); if (e) return e } }; let O = !1; function q(e) { O || ((({ ignoreURLParametersMatching: e = [/^utm_/], directoryIndex: t = "index.html", cleanURLs: n = !0, urlManipulation: r } = {}) => { const s = l(); self.addEventListener("fetch", c => { const a = L(c.request.url, { cleanURLs: n, directoryIndex: t, ignoreURLParametersMatching: e, urlManipulation: r }); if (!a) return void 0; let o = self.caches.open(s).then(e => e.match(a)).then(e => e || fetch(a)); c.respondWith(o) }) })(e), O = !0) } const T = e => { const t = U(), n = a.get(); e.waitUntil(t.install({ event: e, plugins: n }).catch(e => { throw e })) }, K = e => { const t = U(); e.waitUntil(t.activate()) }; function x(e, t) { var n = Object.keys(e); if (Object.getOwnPropertySymbols) { var r = Object.getOwnPropertySymbols(e); t && (r = r.filter((function (t) { return Object.getOwnPropertyDescriptor(e, t).enumerable }))), n.push.apply(n, r) } return n } function j(e) { for (var t = 1; t < arguments.length; t++) { var n = null != arguments[t] ? arguments[t] : {}; t % 2 ? x(Object(n), !0).forEach((function (t) { s()(e, t, n[t]) })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : x(Object(n)).forEach((function (t) { Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t)) })) } return e } var C; (function (e) { U().addToCacheList(e), e.length > 0 && (self.addEventListener("install", T), self.addEventListener("activate", K)) })([{ 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/asserts/22-gray.png' }, { 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/asserts/22.gif' }, { 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/asserts/2233_1080p.png' }, { 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/asserts/33-gray.png' }, { 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/asserts/33.gif' }, { 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/asserts/channel-pgc-tag.png' }, { 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/asserts/checkbox_selected.svg' }, { 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/asserts/cm_2.png' }, { 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/asserts/empty-icon.png' }, { 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/asserts/have_rest.png' }, { 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/asserts/icon_gold.png' }, { 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/asserts/icon_silver.png' }, { 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/asserts/iconfont.5899803.svg' }, { 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/asserts/iconfont.6401a86.ttf' }, { 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/asserts/iconfont.ae48418.eot' }, { 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/asserts/icons-comment.png' }, { 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/asserts/interact-dialog.png' }, { 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/asserts/live-eye.png' }, { 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/asserts/loading.gif' }, { 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/asserts/no_video.png' }, { 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/asserts/no_video_login.png' }, { 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/asserts/not_fang.png' }, { 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/asserts/user-auth.png' }, { 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/asserts/video_conflict.png' }, { 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/asserts/wait_for_release.png' }, { 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/asserts/wait_for_review.png' }, { 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/css/stardust-video.0.544fedcdb8153f48b28c6057331e300299ed98c2.css' }, { 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/index.html' }, { 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/manifest.544fedcdb8153f48b28c6057331e300299ed98c2.json' }, { 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/stardust-video.544fedcdb8153f48b28c6057331e300299ed98c2.degrade.html' }, { 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/stardust-video.544fedcdb8153f48b28c6057331e300299ed98c2.js' }, { 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/stardust-video.544fedcdb8153f48b28c6057331e300299ed98c2.template.html' }, { 'revision': '544fedcdb8153f48b28c6057331e300299ed98c2', 'url': '//s1.hdslb.com/bfs/static/jinkela/video/stardust-video.client.544fedcdb8153f48b28c6057331e300299ed98c2.json' }]), q(C); var P, M = {}; function N(e) { var t = Date.now(), n = e.url, r = e.uuid, s = [n, "333.788.selfDef.crash", "", t, "", "", e.bodyWidth + "x" + e.bodyHeight, 1, "", "", e.refer, r, "", ""], c = "//data.bilibili.com/log/web?000017".concat(t).concat(s.join("|")); fetch(c, { credentials: "include" }) } self.addEventListener("message", (function (e) { var t = e.data; "heartbeat" === t.type ? (M[t.id] = j(j({}, t.data), {}, { t: Date.now() }), P || (P = setInterval((function () { !function () { var e = Date.now(); for (var t in M) { e - M[t].t > 15e3 && (N(M[t]), delete M[t]) } 0 === Object.keys(M).length && (clearInterval(P), P = null) }() }), 1e4))) : "unload" === t.type && delete M[t.id] })) }]);