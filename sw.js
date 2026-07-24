// Service Worker:離線快取,讓安裝後的 App 不需伺服器也能完整運作。
// 版本號與快取清單兩個佔位符由 scripts/gen-sw.mjs 在 build 後注入
// (public/ 這份是模板,實際生效的是 out/sw.js)。

const CACHE_PREFIX = "langlearn-";
const CACHE = CACHE_PREFIX + "202607241952";
const PRECACHE = [
  "/404",
  "/confuse/__next.confuse/__PAGE__.txt",
  "/confuse/__next.confuse.txt",
  "/confuse/__next._full.txt",
  "/confuse/__next._head.txt",
  "/confuse/__next._index.txt",
  "/confuse/__next._tree.txt",
  "/confuse",
  "/confuse.txt",
  "/decks/__next.decks/__PAGE__.txt",
  "/decks/__next.decks.txt",
  "/decks/__next._full.txt",
  "/decks/__next._head.txt",
  "/decks/__next._index.txt",
  "/decks/__next._tree.txt",
  "/decks",
  "/decks.txt",
  "/exam/__next.exam/__PAGE__.txt",
  "/exam/__next.exam.txt",
  "/exam/__next._full.txt",
  "/exam/__next._head.txt",
  "/exam/__next._index.txt",
  "/exam/__next._tree.txt",
  "/exam-part1/part1-01.jpg",
  "/exam-part1/part1-02.jpg",
  "/exam-part1/part1-03.jpg",
  "/exam-part1/part1-04.jpg",
  "/exam-part1/part1-05.jpg",
  "/exam-part1/part1-06.jpg",
  "/exam-part1/part1-07.jpg",
  "/exam-part1/part1-08.jpg",
  "/exam-part1/part1-09.jpg",
  "/exam-part1/part1-10.jpg",
  "/exam-part1/part1-11.jpg",
  "/exam-part1/part1-12.jpg",
  "/exam",
  "/exam.txt",
  "/favicon.ico",
  "/grammar/__next.grammar/__PAGE__.txt",
  "/grammar/__next.grammar.txt",
  "/grammar/__next._full.txt",
  "/grammar/__next._head.txt",
  "/grammar/__next._index.txt",
  "/grammar/__next._tree.txt",
  "/grammar",
  "/grammar.txt",
  "/guide/__next.guide/__PAGE__.txt",
  "/guide/__next.guide.txt",
  "/guide/__next._full.txt",
  "/guide/__next._head.txt",
  "/guide/__next._index.txt",
  "/guide/__next._tree.txt",
  "/guide",
  "/guide.txt",
  "/icons/apple-touch-icon.png",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-maskable-512.png",
  "/",
  "/index.txt",
  "/kana/__next.kana/__PAGE__.txt",
  "/kana/__next.kana.txt",
  "/kana/__next._full.txt",
  "/kana/__next._head.txt",
  "/kana/__next._index.txt",
  "/kana/__next._tree.txt",
  "/kana",
  "/kana.txt",
  "/manifest.webmanifest",
  "/quiz/__next.quiz/__PAGE__.txt",
  "/quiz/__next.quiz.txt",
  "/quiz/__next._full.txt",
  "/quiz/__next._head.txt",
  "/quiz/__next._index.txt",
  "/quiz/__next._tree.txt",
  "/quiz",
  "/quiz.txt",
  "/reading/__next.reading/__PAGE__.txt",
  "/reading/__next.reading.txt",
  "/reading/__next._full.txt",
  "/reading/__next._head.txt",
  "/reading/__next._index.txt",
  "/reading/__next._tree.txt",
  "/reading",
  "/reading.txt",
  "/stats/__next.stats/__PAGE__.txt",
  "/stats/__next.stats.txt",
  "/stats/__next._full.txt",
  "/stats/__next._head.txt",
  "/stats/__next._index.txt",
  "/stats/__next._tree.txt",
  "/stats",
  "/stats.txt",
  "/study/__next.study/__PAGE__.txt",
  "/study/__next.study.txt",
  "/study/__next._full.txt",
  "/study/__next._head.txt",
  "/study/__next._index.txt",
  "/study/__next._tree.txt",
  "/study",
  "/study.txt",
  "/talks/__next.talks/__PAGE__.txt",
  "/talks/__next.talks.txt",
  "/talks/__next._full.txt",
  "/talks/__next._head.txt",
  "/talks/__next._index.txt",
  "/talks/__next._tree.txt",
  "/talks",
  "/talks.txt",
  "/_next/static/5Vn2lbtM879k9ia665a20/_buildManifest.js",
  "/_next/static/5Vn2lbtM879k9ia665a20/_clientMiddlewareManifest.js",
  "/_next/static/5Vn2lbtM879k9ia665a20/_ssgManifest.js",
  "/_next/static/chunks/05-c3ty_6dwfk.js",
  "/_next/static/chunks/082obv3v03b-9.js",
  "/_next/static/chunks/098xg6_l_u7i1.js",
  "/_next/static/chunks/0cz1d0mv5g_q7.js",
  "/_next/static/chunks/0jlli6pq24dmd.js",
  "/_next/static/chunks/0l64foqwqu9er.css",
  "/_next/static/chunks/0wtmbqllmit6_.js",
  "/_next/static/chunks/0xcj4d343kspb.js",
  "/_next/static/chunks/10lwj3goece0q.js",
  "/_next/static/chunks/10qk6v6416kh8.js",
  "/_next/static/chunks/140hqxzcwhz25.js",
  "/_next/static/chunks/14mrh2-p_w84d.js",
  "/_next/static/chunks/187a-whggi9t8.js",
  "/_next/static/chunks/1f3e_i8k5uomv.js",
  "/_next/static/chunks/1fnq4yit2j_r6.js",
  "/_next/static/chunks/1ot408er-e7ff.js",
  "/_next/static/chunks/1vhg-2xso7hmf.js",
  "/_next/static/chunks/27jktro2p5rq9.js",
  "/_next/static/chunks/29-m92_q-q7hc.js",
  "/_next/static/chunks/2c7umsfhzbmub.js",
  "/_next/static/chunks/2nykiepra7i1k.js",
  "/_next/static/chunks/2q6pgkwqfp5bt.js",
  "/_next/static/chunks/34-pnotw26sd7.js",
  "/_next/static/chunks/3dqwrc-3xfwuy.js",
  "/_next/static/chunks/3m11a54-grnrc.js",
  "/_next/static/chunks/3_jmaoxldo6h7.js",
  "/_next/static/chunks/turbopack-1srmeewbkltcr.js",
  "/_next/static/media/4fa387ec64143e14-s.2tuy5pz7dlieh.woff2",
  "/_next/static/media/53b9e256198e5412-s.390ncx5urfkfu.woff2",
  "/_next/static/media/5ce348bf30bf5439-s.31988l_ccedte.woff2",
  "/_next/static/media/6306c77e7c8268e4-s.2dbetqa9o8jxf.woff2",
  "/_next/static/media/7178b3e590c64307-s.21jp631_3pja2.woff2",
  "/_next/static/media/797e433ab948586e-s.p.0r6juujl39pe6.woff2",
  "/_next/static/media/7d817b4c03b0c5f1-s.1uyisp29ctx0d.woff2",
  "/_next/static/media/8a480f0b521d4e75-s.1qq4vpdcun5oj.woff2",
  "/_next/static/media/bbc41e54d2fcbd21-s.1rgnod-3esatf.woff2",
  "/_next/static/media/caa3a2e1cccd8315-s.p.0wgildi0cnwt9.woff2",
  "/_next/static/media/favicon.2vob68tjqpejf.ico",
  "/_next/static/media/fef07dbb0973bf53-s.3p2_lha1f2xer.woff2",
  "/_not-found/__next._full.txt",
  "/_not-found/__next._head.txt",
  "/_not-found/__next._index.txt",
  "/_not-found/__next._not-found/__PAGE__.txt",
  "/_not-found/__next._not-found.txt",
  "/_not-found/__next._tree.txt",
  "/_not-found",
  "/_not-found.txt",
  "/__next._full.txt",
  "/__next._head.txt",
  "/__next._index.txt",
  "/__next._tree.txt",
  "/__next.__PAGE__.txt"
];

// 安裝:抓齊全部檔案(整個 App 約 1.3MB)。
//
// ⚠️ 逐檔快取、容忍個別失敗——不用 cache.addAll。addAll 是「全有全無」:145 個檔案
// 只要有一個回非 2xx(例如某次 build 改了路由、或 GitHub Pages 對單一檔案短暫 502),
// 整個 install 就失敗,使用者會安靜地拿到「零離線能力」的空殼。逐檔 allSettled 後,
// 就算少數檔案失敗,其餘照樣快取,App 仍能離線運作(缺的檔第一次上線時會自動補快取)。
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) =>
        Promise.allSettled(
          PRECACHE.map((url) =>
            fetch(url, { cache: "no-cache" }).then((res) => {
              if (!res.ok) throw new Error(`${res.status} ${url}`);
              return cache.put(url, res);
            }),
          ),
        ),
      )
      .then(() => self.skipWaiting()),
  );
});

// 啟用:清掉「自己的」舊版快取。
//
// ⚠️ 一定要用前綴過濾,絕不能刪掉「所有不是自己的」快取。CacheStorage 是整個網域共用的,
// 而 zaker353.github.io 上還有番茄鐘(pomo-*)與塔羅(tarot-*)。刪掉所有「不是我的」快取
// 等於把另外兩個 App 的離線功能清空;反過來它們也會清掉英文學習的——使用者開過番茄鐘之後,
// 英文學習就離線打不開了(2026-07-15 稽核抓到,三支 sw.js 都犯同一個錯)。
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k.startsWith(CACHE_PREFIX) && k !== CACHE)
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

// ---- 每日提醒(Periodic Background Sync;Android/桌面 Chrome、Edge 支援)----

// ⚠️ 必須與 src/lib/local-db.ts 的 DB_VERSION 相同。
// 用比現存版本「小」的版本號呼叫 indexedDB.open() 會直接 VersionError 失敗,
// 導致每日提醒永遠讀不到資料、靜靜地不發通知(2026-07-15 稽核抓到:這裡卡在 1,
// App 端早已升到 2)。sw.test.ts 會自動比對這兩個數字,不一致就讓測試失敗。
const DB_VERSION = 2;

/** 直接從 IndexedDB 讀出 AppState(App 沒開也讀得到)。 */
function loadStateFromIdb() {
  return new Promise((resolve) => {
    const req = indexedDB.open("langlearn", DB_VERSION);
    req.onsuccess = () => {
      try {
        const tx = req.result.transaction("kv", "readonly");
        const get = tx.objectStore("kv").get("state");
        get.onsuccess = () => resolve(get.result);
        get.onerror = () => resolve(undefined);
      } catch {
        resolve(undefined);
      }
    };
    req.onerror = () => resolve(undefined);
    // 資料庫還不存在時別憑空建一個空的(會讓 App 端之後拿到沒有 store 的 DB)
    req.onupgradeneeded = () => {
      try {
        req.transaction.abort();
      } catch {
        /* 忽略 */
      }
      resolve(undefined);
    };
  });
}

// 單字難度標籤 → 證照分級(需與 src/lib/state-ops.ts 的 LEVEL_RANK / TIER_TARGET_RANK 一致)
const SW_LEVEL_RANK = { 基礎: 1, 核心: 2, 進階: 3 };
const SW_TIER_RANK = { 綠: 1, 藍: 2, 金: 3 };

/**
 * 今日待複習數。規則必須與 App 的 studyQueueFor / buildStudyQueue 一致,
 * 否則通知的數字會跟畫面對不上(稽核抓到過:漏了「今天不學新字」與「目標證照分級」)。
 */
async function countDueToday() {
  const state = await loadStateFromIdb();
  if (!state || !state.cards) return 0;
  const lang = state.currentLanguage;
  const deckIds = new Set(
    (state.decks || []).filter((d) => d.language === lang).map((d) => d.id),
  );
  const now = Date.now();
  const due = state.cards.filter(
    (c) => deckIds.has(c.deckId) && !c.suspended && c.due <= now,
  );
  const d = new Date();
  const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const newToday =
    state.progressByLang?.[lang]?.daily?.[today]?.newCards ?? 0;
  // 「今天不學新字」:新卡上限視為 0(與 isNewPausedToday 一致)
  const paused = state.newPausedDate === today;
  const perDay = paused ? 0 : (state.newPerDay ?? 20);
  const cap = Math.max(0, perDay - newToday);
  // 目標證照分級只套用在多益模式(與 studyQueueFor 一致)
  const targetRank = lang === "多益" ? (SW_TIER_RANK[state.targetTier] ?? 3) : 3;
  const review = due.filter((c) => c.state !== 0).length;
  const fresh = Math.min(
    cap,
    due.filter(
      (c) => c.state === 0 && (SW_LEVEL_RANK[c.level] ?? 1) <= targetRank,
    ).length,
  );
  return review + fresh;
}

self.addEventListener("periodicsync", (event) => {
  if (event.tag !== "daily-reminder") return;
  event.waitUntil(
    countDueToday().then((n) => {
      if (n <= 0) return;
      return self.registration.showNotification("英文學習", {
        body: `今天有 ${n} 張卡片到期,花幾分鐘複習一下吧!`,
        icon: "/icons/icon-192.png",
        badge: "/icons/icon-192.png",
        tag: "daily-reminder", // 同 tag 覆蓋舊通知,不會疊一堆
      });
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((list) =>
        list.length ? list[0].focus() : self.clients.openWindow("/"),
      ),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // 頁面導覽:先走網路(能拿到新版就拿),斷線退回快取。
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          // 只快取成功的回應。少了 res.ok 這道關卡,公用 Wi-Fi 的登入攔截頁(回 200)
          // 或伺服器錯誤頁會覆蓋掉正確的離線版本,而且會一直錯下去。
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() =>
          caches
            .match(req)
            .then((hit) => hit ?? caches.match("/"))
            // 快取也落空時要自己回一個頁面:respondWith(undefined) 會拋錯,
            // 使用者只會看到瀏覽器的「無法連線」,連發生什麼事都不知道。
            .then(
              (hit) =>
                hit ??
                new Response(
                  "<!doctype html><meta charset=utf-8><title>離線中</title>" +
                    "<div style='font-family:sans-serif;padding:2rem;line-height:1.8'>" +
                    "<h1>目前離線,而且這一頁還沒存到手機裡</h1>" +
                    "<p>請連上網路後重新整理一次,之後就能離線使用了。</p></div>",
                  { headers: { "Content-Type": "text/html; charset=utf-8" } },
                ),
            ),
        ),
    );
    return;
  }

  // 其他資源(JS/CSS/圖示;檔名帶雜湊,內容不變):快取優先,沒有才抓網路。
  event.respondWith(
    caches.match(req).then(
      (hit) =>
        hit ??
        fetch(req).then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
          return res;
        }),
    ),
  );
});
