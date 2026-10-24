// Service Worker:離線快取,讓安裝後的 App 不需伺服器也能完整運作。
// 版本號與快取清單兩個佔位符由 scripts/gen-sw.mjs 在 build 後注入
// (public/ 這份是模板,實際生效的是 out/sw.js)。

const CACHE_PREFIX = "langlearn-";
const CACHE = CACHE_PREFIX + "20261024123001";
const PRECACHE = [
  "/404",
  "/confuse/__next.confuse/__PAGE__.txt",
  "/confuse/__next._full.txt",
  "/confuse/__next._tree.txt",
  "/confuse",
  "/confuse.txt",
  "/decks/__next.decks/__PAGE__.txt",
  "/decks/__next._full.txt",
  "/decks/__next._tree.txt",
  "/decks",
  "/decks.txt",
  "/exam/__next.exam/__PAGE__.txt",
  "/exam/__next._full.txt",
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
  "/exam-part1/part1-13.jpg",
  "/exam-part1/part1-14.jpg",
  "/exam-part1/part1-15.jpg",
  "/exam-part1/part1-16.jpg",
  "/exam-part1/part1-17.jpg",
  "/exam-part1/part1-18.jpg",
  "/exam",
  "/exam.txt",
  "/favicon.ico",
  "/grammar/__next.grammar/__PAGE__.txt",
  "/grammar/__next._full.txt",
  "/grammar/__next._tree.txt",
  "/grammar",
  "/grammar.txt",
  "/guide/__next.guide/__PAGE__.txt",
  "/guide/__next._full.txt",
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
  "/kana/__next._full.txt",
  "/kana/__next._tree.txt",
  "/kana",
  "/kana.txt",
  "/manifest.webmanifest",
  "/quiz/__next.quiz/__PAGE__.txt",
  "/quiz/__next._full.txt",
  "/quiz/__next._tree.txt",
  "/quiz",
  "/quiz.txt",
  "/reading/__next.reading/__PAGE__.txt",
  "/reading/__next._full.txt",
  "/reading/__next._tree.txt",
  "/reading",
  "/reading.txt",
  "/stats/__next.stats/__PAGE__.txt",
  "/stats/__next._full.txt",
  "/stats/__next._tree.txt",
  "/stats",
  "/stats.txt",
  "/study/__next.study/__PAGE__.txt",
  "/study/__next._full.txt",
  "/study/__next._tree.txt",
  "/study",
  "/study.txt",
  "/talks/__next.talks/__PAGE__.txt",
  "/talks/__next._full.txt",
  "/talks/__next._tree.txt",
  "/talks",
  "/talks.txt",
  "/_next/static/-sSiRAs5FCilPqO0hP7WZ/_buildManifest.js",
  "/_next/static/-sSiRAs5FCilPqO0hP7WZ/_clientMiddlewareManifest.js",
  "/_next/static/-sSiRAs5FCilPqO0hP7WZ/_ssgManifest.js",
  "/_next/static/chunks/0a4builppc-a0.js",
  "/_next/static/chunks/0cz1d0mv5g_q7.js",
  "/_next/static/chunks/0umf92h1sb77c.js",
  "/_next/static/chunks/1-9dyrc39prri.js",
  "/_next/static/chunks/139tbmiw6f49i.js",
  "/_next/static/chunks/15efzkd2q3fdq.js",
  "/_next/static/chunks/19-4hq2jsc_26.js",
  "/_next/static/chunks/1h8ir3jftsfor.js",
  "/_next/static/chunks/1je8iysmf5j-y.js",
  "/_next/static/chunks/1kluq1iq4ibsz.js",
  "/_next/static/chunks/1mqh1yn-ku2mz.js",
  "/_next/static/chunks/1n6kqqdinvz2q.css",
  "/_next/static/chunks/1vze810ud7kx3.js",
  "/_next/static/chunks/1x6obpmlu1_c2.js",
  "/_next/static/chunks/2-a2qe0cd0kvk.js",
  "/_next/static/chunks/24gwi263hlt6z.js",
  "/_next/static/chunks/266sz6-2-jp5_.js",
  "/_next/static/chunks/2b6kf7qwqu9lf.js",
  "/_next/static/chunks/2iv39zyaf-b51.js",
  "/_next/static/chunks/2khxl0v1q4i6n.js",
  "/_next/static/chunks/2r4s4h5xul1n-.js",
  "/_next/static/chunks/2ucxwilcds2zu.js",
  "/_next/static/chunks/3258b52i9mqtx.js",
  "/_next/static/chunks/38aoe8auy_e76.js",
  "/_next/static/chunks/3h5qcgaea-6jr.js",
  "/_next/static/chunks/3q2iganbsf99v.js",
  "/_next/static/chunks/3rvvngg5qk79w.js",
  "/_next/static/chunks/turbopack-3-ry682tkyiqk.js",
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
  "/_not-found/__next._not-found/__PAGE__.txt",
  "/_not-found/__next._tree.txt",
  "/_not-found",
  "/_not-found.txt",
  "/__next._full.txt",
  "/__next._tree.txt",
  "/__next.__PAGE__.txt"
];

// 安裝:抓齊全部檔案(清單與數量由 scripts/gen-sw.mjs 掃 out/ 後注入,別在這裡寫死數字)。
//
// ⚠️ 逐檔快取、容忍個別失敗——不用 cache.addAll。addAll 是「全有全無」:整份清單
// 只要有一個回非 2xx(例如某次 build 改了路由、或 GitHub Pages 對單一檔案短暫 502),
// 整個 install 就失敗,使用者會安靜地拿到「零離線能力」的空殼。逐檔 allSettled 後,
// 就算少數檔案失敗,其餘照樣快取,App 仍能離線運作(缺的檔第一次上線時會自動補快取)。
// ⚠️ 但「容忍個別失敗」不能變成「幾乎全失敗也算成功」(2026-07-26 全面稽核修):
// 安裝成功會 skipWaiting → activate 無條件刪掉上一版那份「內容完整」的快取。
// 若使用者剛好在走出 Wi-Fi 範圍時更新,新快取只抓到零星幾個檔案、舊快取又被刪掉,
// 此刻離線 = App 完全打不開。所以成功率太低就讓 install 失敗——install 失敗時
// 舊 SW 與舊快取都會原封不動保留,下次再試。
const INSTALL_MIN_RATIO = 0.9;
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
        ).then(async (results) => {
          const ok = results.filter((r) => r.status === "fulfilled").length;
          if (ok >= PRECACHE.length * INSTALL_MIN_RATIO) return;
          // 只有「已經有舊版快取要保護」時才放棄安裝。第一次安裝沒有舊快取,
          // 抓到多少算多少總比整包放棄好(驗收抓到:否則慢速網路下的首次安裝
          // 會拿到零離線能力,而且畫面上完全無聲)。
          const keys = await caches.keys();
          const hasOld = keys.some((k) => k.startsWith(CACHE_PREFIX) && k !== CACHE);
          if (hasOld) {
            throw new Error(`precache 只成功 ${ok}/${PRECACHE.length},保留舊版快取`);
          }
        }),
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

/**
 * 直接從 IndexedDB 讀出某個資料庫的 kv 值(App 沒開也讀得到)。
 * ⚠️ 資料庫名稱規則必須與 src/lib/local-db.ts 的 dbName() 一致:
 * 「預設」使用者 = langlearn,其他人 = langlearn-u-<名字>。
 */
function readKv(dbName, key) {
  return new Promise((resolve) => {
    const req = indexedDB.open(dbName, DB_VERSION);
    req.onsuccess = () => {
      try {
        const tx = req.result.transaction("kv", "readonly");
        const get = tx.objectStore("kv").get(key);
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

/**
 * 讀出「目前使用者」的 AppState。
 *
 * 先從預設資料庫拿 activeProfile 指標(App 每次載入時由 local-db.ts 的
 * writeActiveProfilePointer 寫入),再決定要開哪一個資料庫——否則切換使用者後,
 * 通知顯示的會是「預設」使用者的待複習數(2026-07-26 全面稽核抓到)。
 */
async function loadStateFromIdb() {
  const profile = await readKv("langlearn", "activeProfile");
  const dbName =
    typeof profile === "string" && profile && profile !== "預設"
      ? `langlearn-u-${profile}`
      : "langlearn";
  return readKv(dbName, "state");
}

// 單字難度標籤 → 證照分級(需與 src/lib/state-ops.ts 的 LEVEL_RANK / TIER_TARGET_RANK 一致)
const SW_LEVEL_RANK = { 基礎: 1, 核心: 2, 進階: 3 };
const SW_TIER_RANK = { 綠: 1, 藍: 2, 金: 3 };

// 模式代號 → 給使用者看的名稱(手抄 src/lib/modes.ts 的 MODE_LABELS;sw.test.ts 比對兩邊一致)
const SW_MODE_LABELS = { English: "英文(日常)", 多益: "多益", 日本語: "日文" };

/**
 * 各模式今天「打開那個模式會看到的張數」:{ 模式代號: 張數 }(沒有牌組的模式不列)。
 * 每個模式的規則必須與 App 的 studyQueueFor / buildStudyQueue 一致,否則通知的數字會跟
 * 畫面對不上(稽核抓到過:漏了「今天不學新字」與「目標證照分級」)——sw.test.ts 把這支
 * 拿出來跟 studyQueueFor 逐模式比對。
 */
function dueByMode(state, now) {
  const out = {};
  for (const [lang, d] of Object.entries(dueParts(state, now)))
    out[lang] = d.review + Math.min(d.cap, d.fresh);
  return out;
}

/**
 * 每日提醒要報的內容:三個模式合計(2026-10-23 他定:原本只算「目前模式」、通知又沒寫是哪個模式,
 * 在日文模式關掉 App 的話,多益到期一百張也只會說「今天有 3 張」)。
 *
 * ⚠️ 不可以把 dueByMode 三個模式直接加起來:新字額度是三個模式**共用一份**,每個模式各自都能
 * 發滿額度,直接相加會把新字算三次(驗收用他 10-23 的資料算:會寫 229 張,實際最多 81 張)。
 * 所以複習卡逐模式列,新字合起來只算一次:min(共用額度, 三個模式可發的新字合計)。
 */
function reminderSummary(state, now) {
  const parts = dueParts(state, now);
  const reviewByMode = {};
  let freshAvail = 0;
  let cap = 0;
  for (const [lang, d] of Object.entries(parts)) {
    reviewByMode[lang] = d.review;
    freshAvail += d.fresh;
    cap = d.cap; // 三個模式算出來的額度相同(共用一份)
  }
  return { reviewByMode, fresh: Math.min(cap, freshAvail) };
}

/** 每個模式的到期複習張數、可發的新字數(還沒套額度)、今天剩下的共用新字額度。 */
function dueParts(state, now) {
  if (!state || !state.cards) return {};
  const langs = [...new Set((state.decks || []).map((d) => d.language))];
  const out = {};
  for (const lang of langs) out[lang] = countDueFor(state, lang, now);
  return out;
}

/** 某一個模式今天的到期複習與新字(新字受目標證照限制;額度另外回傳,由呼叫端套)。 */
function countDueFor(state, lang, now) {
  const deckIds = new Set(
    (state.decks || []).filter((d) => d.language === lang).map((d) => d.id),
  );
  // 「到期日是今天就算到期」——必須與 srs.ts 的 isDue 同一把尺(2026-07-26 全面稽核修:
  // 這裡只留 `due <= now`,而內建詞庫新卡的到期日是「第一次開 App 的鐘點 + N 天」,
  // 幾乎一定落在當天的某個時刻。所以早上跑每日提醒時算出 0 張 → 整個通知不發,
  // 使用者只覺得「提醒好像不準」。三個獨立稽核都抓到同一條。)
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);
  const dueBy = endOfDay.getTime();
  const due = state.cards.filter(
    (c) =>
      deckIds.has(c.deckId) &&
      !c.suspended &&
      // State.New = 0、State.Review = 2(與 ts-fsrs 一致);學習中的卡仍按精確時刻
      (c.due <= now || ((c.state === 0 || c.state === 2) && c.due <= dueBy)),
  );
  const d = new Date(now);
  const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  // 今天已學的新卡數是**三個模式合計**(與 store.tsx 的 newCardsStudiedToday 一致)。
  // 2026-07-31 全面稽核:每日新字上限原本每個模式各算一份,一天會吃進三倍新字,
  // 已改成共用同一份額度;這裡漏改的話通知數字就會比實際佇列多。
  let newToday = 0;
  for (const p of Object.values(state.progressByLang || {}))
    newToday += p?.daily?.[today]?.newCards ?? 0;
  // 「今天不學新字」:新卡上限視為 0(與 isNewPausedToday 一致)
  const paused = state.newPausedDate === today;
  const perDay = paused ? 0 : (state.newPerDay ?? 20);
  const cap = Math.max(0, perDay - newToday);
  // 目標證照分級只套用在多益模式(與 studyQueueFor 一致)
  const targetRank = lang === "多益" ? (SW_TIER_RANK[state.targetTier] ?? 3) : 3;
  const review = due.filter((c) => c.state !== 0).length;
  const fresh = due.filter(
    (c) => c.state === 0 && (SW_LEVEL_RANK[c.level] ?? 1) <= targetRank,
  ).length;
  return { review, fresh, cap };
}

/**
 * 每日提醒的通知內文(收 reminderSummary 的結果):合計張數,括號裡逐模式列複習卡(0 張的不列),
 * 新字合起來列一次;全部 0 張回 null(不發通知)。
 * 例:「今天有 81 張卡片要複習(複習 多益 3・日文 4;新字 74),花幾分鐘複習一下吧!」
 */
function reminderBody(summary) {
  const byMode = summary.reviewByMode || {};
  const reviews = Object.keys(SW_MODE_LABELS)
    .concat(Object.keys(byMode).filter((k) => !(k in SW_MODE_LABELS)))
    .filter((k) => (byMode[k] || 0) > 0)
    .map((k) => `${SW_MODE_LABELS[k] || k} ${byMode[k]}`);
  const parts = [];
  if (reviews.length) parts.push(`複習 ${reviews.join("・")}`);
  if (summary.fresh > 0) parts.push(`新字 ${summary.fresh}`);
  const total =
    Object.values(byMode).reduce((a, n) => a + (n || 0), 0) + (summary.fresh || 0);
  if (total <= 0) return null;
  return `今天有 ${total} 張卡片要複習(${parts.join(";")}),花幾分鐘複習一下吧!`;
}

self.addEventListener("periodicsync", (event) => {
  if (event.tag !== "daily-reminder") return;
  event.waitUntil(
    loadStateFromIdb().then((state) => {
      const body = reminderBody(reminderSummary(state, Date.now()));
      if (!body) return;
      return self.registration.showNotification("英文學習", {
        body,
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

/**
 * 這個網址是不是「英文學習」自己的?
 *
 * ⚠️ 本 App 裝在網域根目錄,所以 SW 的 scope 是 `/`——同網域的番茄鐘(/pomodoro/)
 * 與塔羅(/tarot/)在「它們自己的 SW 還沒註冊起來」的空窗期,請求會落到這裡:
 *  ① 會被「快取優先」那條寫進 langlearn 的快取(番茄鐘有 24 個白噪音音檔,
 *     而配額是跟學習資料的 IndexedDB 共用的);
 *  ② 離線時導覽到 /pomodoro/ 會退回 cache.match("/"),看到英文學習的首頁。
 * 判斷方式是拿 PRECACHE 的第一層路徑當白名單,不寫死路由——gen-sw.mjs 掃 out/
 * 產生清單,新增頁面會自動被涵蓋。(2026-07-31 全面稽核)
 */
const OWN_SEGMENTS = new Set(
  PRECACHE.map((u) => u.split("/")[1] || "").filter(Boolean),
);
function isOurs(pathname) {
  const seg = pathname.split("/")[1] || "";
  return seg === "" || OWN_SEGMENTS.has(seg);
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  if (!isOurs(url.pathname)) return; // 同網域別的 App,交給瀏覽器/它自己的 SW

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
          // 只查自己的快取(見下面「其他資源」分支的說明):裸用 caches.match("/")
          // 有機會拿到同網域別的 App 快取起來的首頁,離線時會看到不相干的畫面。
          caches
            .open(CACHE)
            .then((cache) => cache.match(req).then((hit) => hit ?? cache.match("/")))
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
  //
  // ⚠️ 兩個坑(2026-07-26 全面稽核修):
  // ①只查自己的快取:裸用 caches.match() 會掃過整個網域的全部快取(番茄鐘/塔羅也在
  //   zaker353.github.io),可能回傳別的 App 快取裡的同名資源。
  // ②一定要 res.ok 才寫入:這條分支是「快取優先」,把 404 或公用 Wi-Fi 登入攔截頁
  //   (回 200)寫進快取,之後每次都直接回那個壞回應,一路錯到下次換版本號為止。
  //   導覽分支早就修過同一個坑,這裡當初漏了(同一個教訓只修一半)。
  event.respondWith(
    caches.open(CACHE).then((cache) =>
      cache.match(req).then(
        (hit) =>
          hit ??
          fetch(req).then((res) => {
            if (res.ok) cache.put(req, res.clone());
            return res;
          }),
      ),
    ),
  );
});
