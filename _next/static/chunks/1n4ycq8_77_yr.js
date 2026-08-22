(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,48268,e=>{"use strict";var t=e.i(43476),s=e.i(61881);e.s(["SpeakButton",0,function({text:e,language:r,className:a="",sentence:i=!1,rate:l,label:n="🔊",title:d="播放發音"}){return(0,t.jsx)("button",{type:"button",onClick:t=>{t.stopPropagation(),i?(0,s.speakSentence)(e,r,l):(0,s.speak)(e,r,l)},className:`text-muted hover:text-primary transition-colors shrink-0 ${a}`,"aria-label":`${d}：${e}`,title:d,children:n})}])},83479,37998,e=>{"use strict";e.s(["AUDIT_INFO",0,{updatesSinceAudit:0,lastAuditDate:"2026-08-23"}],83479);let t=`請對整個英文學習 App(D:\\FORCLAUDE\\英文學習)做一次全面體檢(全面稽核)。

【範圍與準備】
0. **第一步先跑這兩個,不要一上來就派代理**(2026-07-31 訂,為了省時間與用量):
   \`\`\`
   npm test
   node scripts/audit-scan.mjs
   \`\`\`
   - \`npm test\` 綠燈 = 一大批規則(字族延伸格式、義項撞號、同義字違規、日文表外漢字、
     模考詳解字母、文章詳解引文、sw.js 與 App 一致…)當場全部驗完,**這些不必再派人查**。
   - \`audit-scan.mjs\` 會印一頁式報告:這次的改動範圍、撞號組數、答案分布、
     「一律選最長」的期望答對率、sw.js 手抄常數有沒有漂移、以及「要人判斷的可疑清單」。
   **看完這兩份輸出再決定要派幾個代理、各查什麼**——只針對它抓到的東西,
   以及它算不出來的語意判斷(這個中文譯得對不對、例句自不自然)派人。
1. 先讀 CLAUDE.md、ARCHITECTURE.md,並在 CHANGELOG.md 找出上一次「全面稽核」之後的所有改動——新改動是檢查重點,但不限於它們。
2. CHANGELOG 裡標了「已知不修」的項目不要重複稽核。
   ⚠️ 但標了「**給下次全面體檢的待辦**」的段落**要當成本次的必辦事項**,逐條處理或明說為什麼再延一次。
   (那種段落裡也會寫「本次刻意不修」六個字,很容易被上一句誤判成該跳過的——那是留給你的工作,不是已知不修。)

【檢查方式】不要自己一個人從頭看到尾,派多個獨立檢查同時進行,各查一個面向:
3. 資料安全:任何情況會不會弄丟或弄壞學習進度(匯出匯入/合併/雲端同步/重設/多使用者/內容升級)。
4. 功能正常與互相衝突:每個功能單獨用正常嗎?功能之間互相搭配會不會打架?
5. 內容正確性:單字/例句/題目/答案/詳解有沒有錯誤、重複、缺漏。特別查這三類(過去每次都抓到):
   ①**同一張卡自己前後矛盾**——中文字義與「顯示更多」裡的英文解釋(defEn)打對台、字義與例句中譯不一致、
     forms/altDef 的中文和 def 相反(2026-07-26 抓到 benchmark、underwrite、overhead;更早的 temper 是「回火」被寫成「強化金屬」)。
   ②**跨卡矛盾**——同一個概念在不同卡譯法不同,或兩張卡的中文字義+詞性完全相同(反向複習「看中文回想英文」會無法作答)。
   ③**答案不唯一**——選擇題有兩個選項都成立、或詳解在解釋一個不存在的選項;另外檢查各頁面的選項有沒有洗牌
     (正解集中在某個字母時,不洗牌就能靠猜答對)。
     ⚠️ **洗牌擋不住「選項長度」**:洗的是位置,長度跟著選項一起走。2026-08-01 抓到文章理解題
     111 題裡 59 題的正解是唯一最長的選項,「一律選最長」有 57% 答對率(隨機 25%)。
     \`audit-scan.mjs\` 每個題庫都會印這個數字,**明顯高於該題庫自己的隨機基準線**就要看。
     ⚠️ 基準線不是一律 25%:選項數不同基準就不同(3 選項 33%、2 選項 50%),
     模考 Part 2、詞形題、辨析題都不是 4 選項,拿 25% 去比會製造假警報。腳本已經按每題的實際選項數算好。
6. 規則與邏輯:各項規則之間有沒有矛盾、漏洞、沒涵蓋到的情況(邊界條件、狀態切換、日期跨日)。
7. 新舊一致性:新改動有沒有讓舊文案、舊流程、會產生內容的功能(產生指令/匯出格式/範本)過時——照 CLAUDE.md 的「連動更新規則」盤點。
7a. **體檢工具自己有沒有跟上**:檢查 \`audit-scan.mjs\` 有沒有涵蓋這段期間新增的題庫/資料來源。
    這一輪新增了什麼題庫(詞形、辨析、模考新的一回、新體裁的文章…),就到腳本裡確認它被算進去了;
    沒有的話當場補上,並用**該題庫真正的選項數**算隨機基準線。
    ⚠️ 這是 2026-08-02 稽核真正漏掉的東西:8/02 加了詞形題與辨析題兩個題庫,體檢指令卻宣稱
    「每個題庫都會印期望答對率」,腳本裡全檔 0 次提到它們——**工具沒跟上,漏洞就完全看不見**。
    同理也要看:報告裡的「N 筆」是不是母體數量(先截斷再報數會讓下一輪嚴重低估工作量,8/02 踩過)。
8. 離線 PWA:sw.js 快取版本、離線可用性、只清自己前綴(langlearn-)的快取;sw.js 手抄的那份
   「算待複習數」邏輯是否還與 App 一致(到期判定、每日上限、目標分級、資料庫名稱都漂移過)。
9. 檢查報告的每一條,你要親自到程式裡確認屬實才算數(獨立檢查會誤判)。
10. **派出去的每一個獨立檢查,指令裡都要放這句**:「如果你覺得這份指令或現有規格哪一條是錯的,一定要明說,
    不要為了配合它把原本正確的內容改成錯的。」——2026-07-29 踩過:規格把 「absenteeism」指定成「缺勤率」(錯),
    代理為了配合,連原本正確的英文解釋都改成比率。加了這句之後,接連三個牌組的代理各抓到 5/3/4 處規格本身的錯。
11. 如果**不同的獨立檢查對同一件事給出彼此不一致的判斷**,那通常代表**規格有洞**(例:CARD_SPEC 原本沒寫死
    「同字根否定形算不算反義字」,結果有人拿掉 incompatible、有人留著)。這時要回去把規格寫死再一致套用,
    不要只修眼前那一張。

【派代理的規矩(2026-07-31 訂,為了省時間與用量)】
上一輪體檢花掉了 5 小時額度的九成,絕大部分耗在「代理重複做腳本就能做的事」。派工單裡一定要放這四條:
11a. **不准整份讀 \`src/lib/seed-*.ts\`**(最大的 seed-toeic.ts 有 4.8 萬行、seed-daily.ts 1.6 萬行)。
     要看資料就寫 node 腳本抽需要的欄位。要改內容也是改 \`scripts/*-data/\` 的來源檔再重跑建置腳本。
11b. **明講「這些不用查」**:把 \`npm test\` 已經守住的清單(audit-scan 最後一段會列)貼進派工單,
     並附上 audit-scan 的輸出,叫代理不要重新統計一次。
11c. **回報最多 15 條、依嚴重度排序、每條 5 行內**。查證細節放進腳本輸出,不要寫成長篇散文——
     統籌者要把每一份回報完整讀進脈絡,回報越長成本越高。
11d. **修復與自我驗證合併成同一個代理**(「改完自己寫檢查腳本驗一遍,附上改前改後的數字」)。
     只有「跨檔案、跨面向」才另外派獨立驗收——那才是真正需要第二雙眼睛的地方。

【修復與驗收】
12. 確認的問題依嚴重程度修復:「會弄丟資料」>「功能壞掉」>「內容錯誤」>「小問題」,並老實說哪些是先前改動自己種下的。
13. 修完必須再派一輪獨立驗收,特別找「修復本身種下的新問題」。
14. 修掉的問題要寫成自動測試(vitest)把關:測試要 import 真正在用的那份程式,並故意改壞一次證明它會失敗。
    ⚠️ 用「檔案內容比對」的測試(例如檢查 sw.js 有沒有某種寫法)**一律要用 \`src/lib/strip-comments.ts\` 的 \`stripComments()\` 先去掉註解再比對**,否則把真正的程式碼註解掉、測試照樣是綠的(這個坑 2026-07-31 與 2026-08-02 各踩過一次,第二次是新加的守門測試自己犯的——原因是四個檔各寫各的去註解邏輯,所以已抽成共用工具,不要再自己寫一份);
    也不要寫「舉一個尚未完成的東西當例子」的測試(例如寫死某個牌組還沒改版),那種測試下次改動就會過期。

【收尾】
15. npm test 全過 + npx tsc --noEmit 通過 + npm run build 成功。
16. 用白話回報:檢查了哪些面向、抓到幾個問題、各是什麼等級、修了哪些、哪些列入「已知不修」。
17. 更新 CHANGELOG.md/ARCHITECTURE.md;收尾 commit 訊息必須包含「全面稽核」四個字(App 的體檢提醒計數靠它歸零)。照固定流程備份原始碼並上線。`;e.s(["AUDIT_PROMPT",0,t,"AUDIT_REMINDER_THRESHOLD",0,15],37998)},52683,e=>{"use strict";var t=e.i(43476),s=e.i(22016),r=e.i(77491),a=e.i(83944),i=e.i(71645);let l="langlearn-daily-reminder";function n(e=5e3){return Promise.race([navigator.serviceWorker.ready,new Promise((t,s)=>setTimeout(()=>s(Error("Service Worker 尚未就緒")),e))])}function d(){let[e,s]=(0,i.useState)(!1);async function r(){try{if(!("Notification"in window)||!("serviceWorker"in navigator))return void alert("這個瀏覽器不支援通知功能。");let e=await Notification.requestPermission();if("granted"!==e)return void alert("denied"===e?"通知已被封鎖。瀏覽器會記住這個選擇,再按幾次也不會跳出詢問——請到網址列旁的鎖頭圖示(或瀏覽器的網站設定)把「通知」改成允許,再回來開啟。":"你沒有允許通知,無法開啟提醒。");let t=(await n()).periodicSync;if(!t)return void alert("這個裝置的瀏覽器不支援排程提醒(iPhone 目前不支援)。通知權限已開啟,但無法自動定時提醒。");await t.register("daily-reminder",{minInterval:432e5}),localStorage.setItem(l,"on"),s(!0),alert("每日提醒已開啟!有到期卡片時會通知你(實際時間由系統安排)。")}catch{alert("開啟提醒失敗,請確認 App 已「安裝」到主畫面後再試一次。")}}async function a(){try{let e=(await n()).periodicSync;await e?.unregister("daily-reminder")}catch{}localStorage.removeItem(l),s(!1)}return(0,i.useEffect)(()=>{s("on"===localStorage.getItem(l))},[]),(0,t.jsxs)("button",{onClick:e?a:r,className:`rounded-2xl border p-5 text-left hover:opacity-90 transition-opacity ${e?"bg-surface border-primary":"bg-surface border-border"}`,children:[(0,t.jsxs)("div",{className:"font-semibold text-lg",children:["🔔 每日提醒",e?"(已開啟)":""]}),(0,t.jsx)("div",{className:"text-sm mt-1 text-muted",children:e?"有到期卡片時會通知你。點一下可關閉。":"每天提醒你有幾張卡到期(Android/電腦支援)"})]})}var c=e.i(48268),o=e.i(13966),m=e.i(83479),x=e.i(37998);let u=o.DAILY_THEMES.find(e=>"phrases"===e.key)?.words??[],p={English:"英文(日常)",多益:"多益",日本語:"日文"};function h({reviewed:e,goal:s,onEdit:r}){let a=Math.min(1,e/Math.max(1,s)),i=2*Math.PI*17;return(0,t.jsxs)("button",{onClick:r,className:"rounded-2xl border border-border bg-surface p-4 text-left hover:opacity-90",title:"點一下修改目標",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsxs)("svg",{viewBox:"0 0 44 44",className:"w-11 h-11 -rotate-90 shrink-0",children:[(0,t.jsx)("circle",{cx:"22",cy:"22",r:17,fill:"none",strokeWidth:"5",className:"stroke-border"}),(0,t.jsx)("circle",{cx:"22",cy:"22",r:17,fill:"none",strokeWidth:"5",strokeLinecap:"round",className:a>=1?"stroke-good":"stroke-primary",strokeDasharray:`${i*a} ${i}`})]}),a>=1&&(0,t.jsx)("span",{className:"text-xl",children:"🎉"})]}),(0,t.jsxs)("div",{className:"text-2xl font-bold mt-1",children:[e,(0,t.jsxs)("span",{className:"text-sm text-muted font-normal",children:["/",s]})]}),(0,t.jsx)("div",{className:"text-xs text-muted mt-0.5",children:"今日目標 ✏️"})]})}function b({label:e,value:s,icon:r,accent:a}){return(0,t.jsxs)("div",{className:"rounded-2xl border border-border bg-surface p-4",children:[(0,t.jsx)("div",{className:"text-2xl",children:r}),(0,t.jsx)("div",{className:`text-2xl font-bold mt-1 ${a?"text-accent":""}`,children:s}),(0,t.jsx)("div",{className:"text-xs text-muted mt-0.5",children:e})]})}function f({href:e,title:r,desc:a,tone:i}){return(0,t.jsxs)(s.default,{href:e,className:`rounded-2xl border p-5 hover:opacity-90 transition-opacity ${"primary"===i?"bg-primary text-primary-fg border-transparent":"accent"===i?"bg-accent text-white border-transparent":"bg-surface border-border"}`,children:[(0,t.jsx)("div",{className:"font-semibold text-lg",children:r}),(0,t.jsx)("div",{className:`text-sm mt-1 ${"plain"===i?"text-muted":"opacity-90"}`,children:a})]})}e.s(["default",0,function(){let e,i,l,{state:n,ready:o,setDailyGoal:g}=(0,r.useStore)();if(!o)return(0,t.jsx)("p",{className:"text-muted",children:"載入中…"});let j=n.currentLanguage,N=p[j]??j,v=(0,r.cardsForLanguage)(n,j),y=(0,r.studyQueueFor)(n,j).length,w=v.length,A=(0,r.progressFor)(n,j),{totalReviews:D,daily:E}=A,k=(0,r.effectiveStreak)(A),S=function(){let e=[];for(let t=6;t>=0;t--)e.push((0,a.localDateStr)(Date.now()-864e5*t));return e}(),T=Math.max(1,...S.map(e=>E[e]?.reviewed??0)),C=Object.values(n.progressByLang).some(e=>e.totalReviews>0),I=n.lastExportAt?Math.floor((Date.now()-n.lastExportAt)/864e5):null;return(0,t.jsxs)("div",{className:"space-y-8",children:[C&&(null===I||I>=7)&&(0,t.jsxs)(s.default,{href:"/decks",className:"block rounded-2xl border border-warn/40 bg-warn/10 px-4 py-3 text-sm hover:opacity-80",children:["💾"," ",null===I?"你還沒匯出過備份":`已經 ${I} 天沒有匯出備份了`,"——為了保護學習進度,點這裡到「牌組」頁按一下「匯出備份」吧。"]}),m.AUDIT_INFO.updatesSinceAudit>=x.AUDIT_REMINDER_THRESHOLD&&(0,t.jsxs)(s.default,{href:"/guide#audit",className:"block rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm hover:opacity-80",children:["🔍 App 已累積 ",m.AUDIT_INFO.updatesSinceAudit," ","次實質更新還沒做「全面體檢」——點這裡到使用說明最下面,複製體檢指令貼給 Claude 做一次總檢查。"]}),(0,t.jsxs)("section",{children:[(0,t.jsxs)("h1",{className:"text-2xl font-bold",children:["繼續加油！",(0,t.jsxs)("span",{className:"ml-2 align-middle text-sm font-medium text-muted",children:["目前學習：",N]})]}),(0,t.jsxs)("p",{className:"text-muted mt-1",children:["今天有"," ",(0,t.jsx)("span",{className:"font-semibold text-accent",children:y})," ","張",N,"卡片到期需要複習。"]}),"多益"===n.currentLanguage&&n.examDate&&((e=Math.ceil((new Date(n.examDate+"T00:00:00").getTime()-Date.now())/864e5))<0?null:(0,t.jsxs)("p",{className:"text-sm mt-1.5",children:["📅 距離多益考試還有"," ",(0,t.jsx)("span",{className:"font-bold text-accent",children:e})," 天"]}))]}),(0,t.jsxs)("section",{className:"grid grid-cols-2 md:grid-cols-5 gap-3",children:[(0,t.jsx)(b,{label:"連續天數",value:`${k} 天`,icon:"🔥"}),(0,t.jsx)(b,{label:"待複習",value:`${y}`,icon:"📌",accent:!0}),(0,t.jsx)(b,{label:"總單字",value:`${w}`,icon:"📚"}),(0,t.jsx)(b,{label:"累計複習",value:`${D}`,icon:"✅"}),(0,t.jsx)(h,{reviewed:E[(0,a.localDateStr)()]?.reviewed??0,goal:n.dailyGoal??30,onEdit:()=>{let e=prompt("每日複習目標(張)?",String(n.dailyGoal??30));e&&Number(e)>0&&g(Number(e))}})]}),"日本語"!==j&&u.length>0&&(l=u[Math.floor(((i=new Date).getTime()-6e4*i.getTimezoneOffset())/864e5)%u.length],(0,t.jsxs)("section",{className:"rounded-2xl border border-border bg-surface p-5",children:[(0,t.jsx)("div",{className:"text-xs font-semibold text-muted mb-1.5",children:"💬 每日一句"}),(0,t.jsxs)("div",{className:"text-lg font-medium flex items-center gap-2 flex-wrap",children:[l.word,(0,t.jsx)(c.SpeakButton,{text:l.word,language:"English"})]}),(0,t.jsx)("div",{className:"text-sm text-muted mt-1",children:l.def})]})),(0,t.jsxs)("section",{className:"grid sm:grid-cols-3 gap-3",children:[(0,t.jsx)(f,{href:"/study",title:"開始複習",desc:y>0?`${y} 張到期`:"目前沒有到期卡片",tone:"primary"}),(0,t.jsx)(f,{href:"/quiz",title:"做測驗",desc:"選擇題小測驗",tone:"accent"}),(0,t.jsx)(d,{})]}),(0,t.jsxs)(s.default,{href:"/guide",className:"block rounded-2xl border border-border bg-surface px-4 py-3 text-sm hover:bg-background",children:["📖 ",(0,t.jsx)("b",{className:"font-medium",children:"使用說明"}),(0,t.jsxs)("span",{className:"text-muted",children:[" ","— 不知道某個功能怎麼用?這裡有全部功能的白話說明。"]})]}),(0,t.jsxs)("section",{className:"rounded-2xl border border-border bg-surface p-5",children:[(0,t.jsx)("h2",{className:"font-semibold mb-4",children:"近 7 日複習量"}),(0,t.jsx)("div",{className:"flex items-end gap-2 h-32",children:S.map(e=>{let s=E[e]?.reviewed??0,r=Math.round(s/T*100);return(0,t.jsxs)("div",{className:"flex-1 flex flex-col items-center gap-1",children:[(0,t.jsx)("div",{className:"w-full flex items-end h-24",children:(0,t.jsx)("div",{className:"w-full rounded-t-md bg-primary transition-all",style:{height:`${Math.max(s>0?8:2,r)}%`},title:`${s} 次`})}),(0,t.jsx)("span",{className:"text-[10px] text-muted",children:e.slice(5)})]},e)})})]})]})}],52683)}]);