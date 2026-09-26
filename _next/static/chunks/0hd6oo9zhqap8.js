(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,62437,(e,t,s)=>{t.exports={_說明:"各類審查的「上次做的日期」與「多久該再做一次」。單一來源:使用說明頁「🗓 審查紀錄」卡、首頁到期橫幅、npm run review-status 都讀這裡。做完某一類審查就把該類的 lastReviewedAt 改成當天、note 寫一行做了什麼,跟那次的修改一起 commit。全面體檢不記這裡(它靠 git 計數:scripts/gen-audit-info.mjs 找「全面稽核」commit),但體檢收尾要把實際涵蓋到的類別日期一起更新。上次日期是 2026-09-27 建檔時從 git log 與 CHANGELOG 照實推的。",soonDays:14,categories:[{id:"rules",name:"規則審查",scope:"CLAUDE.md 全文、AGENTS.md、.claude/agents/ 三個代理定義檔、CARD_SPEC、體檢指令 src/lib/audit-prompt.ts 是否還跟程式與現況一致;規則之間有無矛盾、模糊、過時、不會觸發、缺漏;代理之間判斷不一致或發現 Claude 沒照某條規則做,立刻審",intervalDays:60,lastReviewedAt:"2026-09-08",note:"規則檔審查三批:CLAUDE.md/代理檔/ARCHITECTURE/README/AGENTS 的過時矛盾缺漏、權限清單與上傳 bat 備份檢查、體檢指令 11d 與 13 的矛盾(09-20 體檢順帶改了體檢指令,沒整份審)"},{id:"features",name:"功能實測",scope:"在瀏覽器用眼睛逐項點過:三個模式切換、首頁→複習(四個評分鈕、跳過、弱點加強)、測驗各模式、牌組頁(匯出/匯入/重設/情境篩選)、統計、模考(三回、只練某 Part、錯題本)、閱讀、對話、文法、辨析、假名、手機版排版與加入主畫面;考試前一個月把多益模式整輪跑一次",intervalDays:60,lastReviewedAt:"2026-09-08",note:"多益模式審查 23 條發現(字卡呈現、模考、錯題本、小問題),修正分批到 09-13 上線;日常與日文模式沒整輪點過"},{id:"content",name:"內容審查",scope:"字卡(日常/多益 15 牌組/ToeicMaster/日文)的字義、例句、字族、搭配是否正確、同牌組與跨牌組撞號;自動出題(詞形/搭配/填空)的規則漏洞;模考三回與 Part 5 專練的題目、答案、詳解、正解字母分布與選項長度洩題;文章、對話、文法、辨析的內容錯誤與重複;改內容要動 scripts/*-data 來源檔並重跑建置腳本、bump CONTENT_VERSION",intervalDays:90,lastReviewedAt:"2026-09-20",note:"全面稽核:68 組跨牌組撞號全部拆號、字族引用 11 筆統一、搭配題與詞形題 3 個規則漏洞、建置腳本幽靈字來源;CONTENT_VERSION 43"},{id:"srs",name:"複習排程與個人化參數",scope:"FSRS 排程(src/lib/srs.ts、fsrs-params.ts、memory-stage):學習初期固定級距(10 分/2 天/4 天/7 天)、重新學習中「困難」15 分鐘不結束卡、複習期「重來」記弱點並 10 分鐘內重現、回想計時建議、每日新字上限三模式共用、弱點加強、跳過與恢復;個人化參數的訓練流程與壞參數防線;統計頁「參數深度優化」產生的指令是否仍符合現況",intervalDays:180,lastReviewedAt:"2026-08-10",note:"全面稽核修 srs.ts + FSRS 參數重新訓練並補「壞參數自動擋下」防線;08-15 訂的重新學習中「困難」15 分鐘規則之後沒整輪審過"},{id:"data",name:"資料安全與同步",scope:"IndexedDB 資料層(local-db.ts、state-ops.ts、store.tsx)、匯出備份/匯入(覆蓋、合併)、GitHub 雲端同步(自動上傳/下載合併)、各種墓碑(刪牌組/刪卡/刪複習/清錯題本/重設全部 resetAllAt)會不會透過合併復活、MERGE_POLICY 涵蓋 AppState 每個欄位、多使用者切換、內容升級 upgradeContent 不動 SRS 進度、儲存空間滿的提示;動到這些一定要用他的真實資料複本在 localhost 驗",intervalDays:90,lastReviewedAt:"2026-09-20",note:"全面稽核資料安全面向 + 「重設全部」補跨裝置墓碑 resetAllAt,用 09-20 匯出的真實資料複本在 node 與 localhost 實跑兩個合併方向"},{id:"pwa",name:"離線 PWA 與部署",scope:"public/sw.js 快取版本與策略、只清 langlearn- 前綴、離線可用、手機加入主畫面;npm run build 三步(gen-audit-info → next build → gen-sw)、兩個 .bat、線上版 zaker353.github.io 與 localhost:3000 是否同步;Next / ts-fsrs / vitest 等套件有沒有新版、升級後全測試重跑",intervalDays:180,lastReviewedAt:"2026-09-20",note:"全面稽核「規則/文件/PWA/體檢工具」面向確認 sw.js 與離線快取;套件 next 16.2.9、ts-fsrs 5.4 未升級"}]}},83479,37998,16006,33162,e=>{"use strict";e.s(["AUDIT_INFO",0,{updatesSinceAudit:3,lastAuditDate:"2026-09-20"}],83479);let t=`請對整個英文學習 App(D:\\FORCLAUDE\\英文學習)做一次全面體檢(全面稽核)。

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

【檢查方式】不要自己一個人從頭看到尾,派多個獨立檢查同時進行,各查一個面向。
這個專案有固定角色(定義在 \`.claude/agents/\`,分工細節見 CLAUDE.md):找問題派 \`langlearn-auditor\`、
修完驗收派 \`langlearn-verifier\`、定案後的機械修改派 \`langlearn-fixer\`,派工時直接指名即可:
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
11a. **不准整份讀 \`src/lib/seed-*.ts\`**(最大的 seed-toeic.ts 有五萬多行;確切行數以 \`wc -l src/lib/seed-*.ts\` 為準,不要在文件裡複寫數字)。
     要看資料就寫 node 腳本抽需要的欄位。要改內容也是改 \`scripts/*-data/\` 的來源檔再重跑建置腳本。
11b. **明講「這些不用查」**:把 \`npm test\` 已經守住的清單(audit-scan 最後一段會列)貼進派工單,
     並附上 audit-scan 的輸出,叫代理不要重新統計一次。派工單同時要寫清楚**範圍**與**起點 commit**
     (上一次訊息含「全面稽核」的 commit,用 \`git log --oneline --grep=全面稽核 -1\` 找),代理才知道「這段期間」是從哪裡算起。
11c. **回報最多 15 條、依嚴重度排序、每條 5 行內**。查證細節放進腳本輸出,不要寫成長篇散文——
     統籌者要把每一份回報完整讀進脈絡,回報越長成本越高。
11d. **修字工(langlearn-fixer)改完要自己跑測試、\`npx tsc --noEmit\` 與 audit-scan、附上改前改後的數字**(它的定義檔已內建;
     tsc 不能省——\`MERGE_POLICY\` 那道「新增 AppState 欄位必須表態」的閘門是型別檢查在守,\`npm test\` 全綠也抓不到),
     但這**不取代**獨立驗收——不論這批改動大小,修完一律派 langlearn-verifier(見第 13 條與 CLAUDE.md 的分工)。
     (2026-09-08 改:原本寫「只有跨檔案、跨面向才另外派驗收」,跟第 13 條與分工規則互相打架。)
11e. **Opus 額度到頂(429)時**(2026-09-08 發生過:驗收代理才起步就被中斷):驗收改由統籌者親自做,
     並在回報裡標明「這不是獨立驗收」;**不要降級用 Sonnet 做稽核或驗收**。額度重置後若改動還沒上線,再補派一次驗收。
     體檢是一次派最多 Opus 代理的場景,額度吃緊時稽核代理可以分兩批派(先 3 個、看完再 3 個),不必六個同時。

【修復與驗收】
12. 確認的問題依嚴重程度修復:「會弄丟資料」>「功能壞掉」>「內容錯誤」>「小問題」,並老實說哪些是先前改動自己種下的。
    誰來修照 CLAUDE.md 的分工門檻:要動三個以上檔案、或改內容超過十筆、或要重跑建置腳本的才派 \`langlearn-fixer\`,
    更小的統籌者自己改(體檢的修項通常大小混雜,小修不要一件一件派出去)。
13. 修完必須再派一輪獨立驗收,特別找「修復本身種下的新問題」。
14. 修掉的問題要寫成自動測試(vitest)把關:測試要 import 真正在用的那份程式,並故意改壞一次證明它會失敗。
    ⚠️ 用「檔案內容比對」的測試(例如檢查 sw.js 有沒有某種寫法)**一律要用 \`src/lib/strip-comments.ts\` 的 \`stripComments()\` 先去掉註解再比對**,否則把真正的程式碼註解掉、測試照樣是綠的(這個坑 2026-07-31 與 2026-08-02 各踩過一次,第二次是新加的守門測試自己犯的——原因是四個檔各寫各的去註解邏輯,所以已抽成共用工具,不要再自己寫一份);
    也不要寫「舉一個尚未完成的東西當例子」的測試(例如寫死某個牌組還沒改版),那種測試下次改動就會過期。

【收尾】
15. npm test 全過 + npx tsc --noEmit 通過 + npm run build 成功。
16. 用白話回報:檢查了哪些面向、抓到幾個問題、各是什麼等級、修了哪些、哪些列入「已知不修」。
17. 更新 CHANGELOG.md/ARCHITECTURE.md;把 src/lib/review-log.json 裡這次**實際涵蓋到**的類別(規則/功能實測/內容/複習排程/資料安全/離線與部署)的 lastReviewedAt 改成今天、note 寫一行,沒完整看過的類別不要改日期;收尾 commit 訊息必須包含「全面稽核」四個字(App 的體檢提醒計數靠它歸零)。照固定流程備份原始碼並上線。`;e.s(["AUDIT_PROMPT",0,t,"AUDIT_REMINDER_THRESHOLD",0,15],37998);var s=e.i(43476),a=e.i(22016),r=e.i(71645),n=e.i(62437);let i=n.default.soonDays,l=n.default.categories;function d(e){let t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(!t)throw Error(`review-log 日期格式錯誤:${e}(要 YYYY-MM-DD)`);return Date.UTC(+t[1],t[2]-1,+t[3])}function o(e=new Date){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}function c(e=o()){let t=d(e);return l.map(e=>{let s,a=d(e.lastReviewedAt),r=Math.round((t-a)/864e5),n=e.intervalDays-r,l=n<=0?"due":n<=i?"soon":"ok";return{...e,daysSince:r,daysLeft:n,dueAt:(s=new Date(a+864e5*e.intervalDays),`${s.getUTCFullYear()}-${String(s.getUTCMonth()+1).padStart(2,"0")}-${String(s.getUTCDate()).padStart(2,"0")}`),state:l}})}function u(e=o()){return c(e).filter(e=>"due"===e.state)}function m(e,t=o()){let s=l.find(t=>t.id===e);if(!s)throw Error(`沒有這個審查類別:${e}`);return`請對英文學習 App(D:\\FORCLAUDE\\英文學習)做一次「${s.name}」審查。

【範圍】${s.scope}
【上次做的時間】${s.lastReviewedAt}(${s.note});這次重點看上次之後的改動(git log 與 CHANGELOG.md 從那天起),但不限於它們。

【規矩】
1. 先讀 CLAUDE.md,照「派子代理的固定分工」「連動更新規則」「改完之後的固定流程」做:找問題派 langlearn-auditor、修完派 langlearn-verifier 獨立驗收;代理的回報是線索不是結論,每一條要親自查證再修;修好的要寫成自動測試並故意改壞一次確認會紅。
2. 覺得規則、資料、字義或指令哪裡是錯的,一定要明說,不要為了配合它把對的改成錯的。丟給我決定的事一律附建議、不做的代價、急不急。
3. 動到複習排程、進度、合併、匯入匯出、內容升級的改動,要用我的真實資料複本在 localhost 驗,線上版只能看不能寫。
4. 做完把 src/lib/review-log.json 裡 id 為「${s.id}」那一筆的 lastReviewedAt 改成今天(${t})、note 寫一行這次做了什麼,跟這次的修改同一個 commit;只做了一部分就不要改日期,把做了哪些寫進 note 尾巴。commit 訊息不要含「全面稽核」四個字(那是體檢計數用的關鍵字)。
5. 收尾回報:找到什麼、修了什麼、哪些沒修與為什麼、測試數前後、檢查了哪些連動點。`}function p(){let[e,t]=(0,r.useState)(null);return(0,r.useEffect)(()=>{t(o())},[]),e}e.s(["REVIEW_SOON_DAYS",0,i,"dueReviews",0,u,"reviewPrompt",0,m,"reviewStatuses",0,c,"todayYmd",0,o],16006);let A={due:"⛔ 到期",soon:"⚠ 快到期",ok:"✅ 正常"},g={due:"border-accent/60 bg-accent/10",soon:"border-warn/60 bg-warn/10",ok:"border-border bg-background"};function x({row:e}){let[t,a]=(0,r.useState)(!1),[n,i]=(0,r.useState)(!1);async function l(){try{await navigator.clipboard.writeText(m(e.id,o())),a(!0),i(!1),setTimeout(()=>a(!1),2e3)}catch{i(!0)}}let d=e.daysLeft<=0?`已過期 ${-e.daysLeft} 天`:`還有 ${e.daysLeft} 天`;return(0,s.jsxs)("div",{className:`rounded-lg border p-3 space-y-1 ${g[e.state]}`,children:[(0,s.jsxs)("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("b",{children:e.name}),(0,s.jsx)("span",{className:"ml-2 text-xs",children:A[e.state]})]}),(0,s.jsx)("button",{onClick:l,className:"px-3 py-1 rounded-lg border border-border text-xs hover:bg-surface",children:t?"✅ 已複製":"📋 複製審查指令"})]}),(0,s.jsxs)("p",{className:"text-xs",children:["上次 ",(0,s.jsx)("b",{children:e.lastReviewedAt}),"(",e.daysSince," 天前)・每 ",e.intervalDays," 天一次・下次"," ",(0,s.jsx)("b",{children:e.dueAt}),"(",d,")"]}),(0,s.jsx)("p",{className:"text-xs",children:e.note}),(0,s.jsxs)("details",{children:[(0,s.jsx)("summary",{className:"cursor-pointer select-none text-xs",children:"審查範圍"}),(0,s.jsx)("p",{className:"mt-1 text-xs whitespace-pre-wrap",children:e.scope})]}),n&&(0,s.jsxs)("div",{className:"text-xs text-warn",children:["複製失敗(瀏覽器不允許)。請展開下方「指令內容」手動選取複製。",(0,s.jsxs)("details",{children:[(0,s.jsx)("summary",{className:"cursor-pointer select-none",children:"指令內容"}),(0,s.jsx)("pre",{className:"mt-1 whitespace-pre-wrap",children:m(e.id,o())})]})]})]})}e.s(["ReviewDueBanner",0,function(){let e=p();if(!e)return null;let t=u(e);return 0===t.length?null:(0,s.jsxs)(a.default,{href:"/guide#reviews",className:"block rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm hover:opacity-80",children:["🗓 有 ",t.length," 類審查到期了:",t.map(e=>e.name).join("、"),"——點這裡到使用說明的「審查紀錄」,複製那一類的審查指令貼給 Claude。"]})},"ReviewLogCard",0,function(){let e=p();if(!e)return null;let t=[...c(e)].sort((e,t)=>e.daysLeft-t.daysLeft);return(0,s.jsx)("div",{className:"space-y-2","data-testid":"review-log-card",children:t.map(e=>(0,s.jsx)(x,{row:e},e.id))})}],33162)}]);