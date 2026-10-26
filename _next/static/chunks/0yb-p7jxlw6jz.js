(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,83479,37998,16006,33162,e=>{"use strict";e.s(["f",0,{updatesSinceAudit:5,lastAuditDate:"2026-10-26"}],83479);let t="🔍 全面稽核",s=[],a=function(e=s){let a=e.length?e.map(e=>`
    - ${e}`).join(""):"目前沒有";return`請對整個英文學習 App(D:\\FORCLAUDE\\英文學習)做一次全面體檢。

這份是給你(統籌者)的流程。代理各自的做法——不整份讀 seed 檔、回報條數上限、每條逐字引用原文、
修字工自己跑測試與型別檢查——已寫在 \`.claude/agents/langlearn-*.md\` 定義檔裡,派工單不用重抄。

【準備】
0. **第一步先跑這兩個,不要一上來就派代理**(2026-07-31 那次體檢吃掉五小時額度的九成,大多耗在代理重做腳本就能做的事):
   \`\`\`
   npm test
   node scripts/audit-scan.mjs
   \`\`\`
   \`npm test\` 綠燈守住的規則(audit-scan 第 7 段自動列出這段期間新增的)不必再派人查;audit-scan 會印改動範圍、起點 commit、
   撞號、答案分布、「一律選最長」的期望答對率、sw.js 手抄常數有沒有漂移、「要人判斷的可疑清單」。
   **看完再決定派幾個代理、各查什麼**——只派給它抓到的東西,以及它算不出來的語意判斷(中文譯得對不對、例句自不自然)。
1. 讀 CLAUDE.md、ARCHITECTURE.md,並在 CHANGELOG.md 找出起點 commit 之後的所有改動——新改動是檢查重點,但不限於它們。
2. CHANGELOG 標「已知不修」的不要重複稽核;標「**給下次全面體檢的待辦**」的段落是**本次必辦**,逐條處理或明說為什麼再延一次
   (那種段落也會寫「本次刻意不修」六個字,不要誤判成該跳過的)。

【派工】不要自己一個人從頭看到尾,派多個獨立檢查同時進行、各查一個面向。找問題派 \`langlearn-auditor\`、
修完驗收派 \`langlearn-verifier\`、定案後的機械修改派 \`langlearn-fixer\`,直接指名即可。面向:
3. 資料安全:任何情況會不會弄丟或弄壞學習進度(匯出匯入/合併/雲端同步/重設/多使用者/內容升級)。
4. 功能正常與互相衝突:每個功能單獨用正常嗎?功能之間互相搭配會不會打架?
5. 內容正確性:單字/例句/題目/答案/詳解的錯誤、重複、缺漏——同一張卡前後矛盾、跨卡撞號、答案不唯一、選項長度與正解字母洩題。
6. 規則與邏輯:各項規則之間的矛盾、漏洞、沒涵蓋到的情況(邊界條件、狀態切換、日期跨日)。
7. 新舊一致性:新改動有沒有讓舊文案、舊流程、會產生內容的功能(產生指令/匯出格式/範本)過時——照 CLAUDE.md 的「連動更新規則」盤點。
   也要看**體檢工具自己有沒有跟上**:\`audit-scan.mjs\` 有沒有涵蓋這段期間新增的題庫/資料來源,沒有就當場補上,
   用該題庫真正的選項數算隨機基準線(2026-08-02 漏過:新題庫在腳本裡 0 次出現,漏洞完全看不見)。
8. 離線 PWA:sw.js 快取版本、離線可用、只清自己前綴(langlearn-)的快取、手抄的「算待複習數」邏輯是否還與 App 一致。
   面向 3、5、8 各對應 \`src/lib/review-log.json\` 的一類(對照見第 17 條),上面幾行只是重點、比那一類的 scope 窄:
   想讓這次算涵蓋那一類,派工單要附那一類 scope 的原文,叫代理逐項看、回報附「scope 涵蓋表」(每項一行:查了什麼、有沒有問題)。
   只照上面的字面查一定漏(2026-10-23 離線 PWA 就漏了加入主畫面、兩個 .bat、套件新版,日期只好退回)。
派工單要寫:**範圍**、**起點 commit**(用 audit-scan 第 1 段印出的「起點 commit」;不要自己用 git log 搜字樣,
一般 commit 標題誤含字樣時會指錯)、附上 \`npm test\` 與 audit-scan 的輸出並**明講「這些不用查」**(npm test 已守住的清單),
叫代理不要重新統計;照 CLAUDE.md 放那句「如果你覺得規格哪一條是錯的,一定要明說,不要為了配合它把內容改成錯的」。
**Opus 額度到頂(429)時**:稽核代理分兩批派(先 3 個、看完再 3 個);驗收改由你親自做,並在回報標明「這不是獨立驗收」;
**不要降級用 Sonnet 做稽核或驗收**;額度重置後若改動還沒上線,再補派一次驗收。

【查證與修復】
9. 代理的回報是線索不是結論:每一條你要親自到程式裡確認屬實才算數(獨立檢查會誤判)。
10. **不同代理對同一件事給出彼此不一致的判斷**,通常代表**規格有洞**:回去把規格寫死再一致套用,不要只修眼前那一張。
11. 確認的問題依嚴重程度修:「會弄丟資料」>「功能壞掉」>「內容錯誤」>「小問題」,並老實說哪些是先前改動自己種下的。
    要動三個以上檔案、或改內容超過十筆、或要重跑建置腳本的才派 \`langlearn-fixer\`,更小的你自己改(小修不要一件一件派出去)。
    修法若牽涉你想到的更好做法(第 16 條那種),**修之前**就先停下來問我,不要修完才提。
12. 不論這批改動大小,修完一律派 langlearn-verifier 做獨立驗收,特別找「修復本身種下的新問題」(修字工自己跑過測試也不能取代它)。
13. 修掉的問題寫成自動測試(vitest):import 真正在用的那份程式、故意改壞一次證明會失敗;「檔案內容比對」類一律先用
    \`src/lib/strip-comments.ts\` 的 \`stripComments()\` 去註解再比對;不要拿「尚未完成的東西」當例子(下次改動就過期)。

【收尾】
14. npm test 全過 + npx tsc --noEmit 通過 + npm run build 成功。
15. 用白話回報:檢查了哪些面向、抓到幾個問題、各是什麼等級、修了哪些、哪些列入「已知不修」。
16. 回報另列「改良建議」一區,由你自己整體看完後提——**派工單不要叫代理列**(稽核代理只在派工單要求時才列,體檢不讓它分心)。
    跟問題分開、不佔問題名額、最多 3 條;每條講出它解決什麼具體困擾並附依據(檔案原文、筆數、使用紀錄),講不出具體困擾的風格偏好不要提。
    方向:只有整體看完才看得到的——兩個功能或兩套機制在做同一件事、流程之間的縫、某個機制(提醒、備份、審查、體檢本身)太重或常被忘;
    單一面向的改良留給各類審查。只提不動手,一律當「待你決定」附建議、不做的代價、急不急;
    牽涉這次要修的問題該怎麼修的,修之前就先停下來問我。
    我以前否決過的(不要重提;情況變了才可以再提,並說明哪裡變了):${a}
    我否決的寫進 src/lib/audit-prompt.ts 的 AUDIT_DECLINED_IDEAS(格式「YYYY-MM-DD 一句話」)。
17. 更新 CHANGELOG.md/ARCHITECTURE.md(CHANGELOG 這則要有一行「**驗收**:派了 langlearn-verifier」);把 src/lib/review-log.json 裡這次**實際涵蓋到**的類別的 lastReviewedAt 改成今天、note 整段換成這次做了什麼(舊 note 裡「還沒看過」的這次也沒看就搬過來),**lastStandaloneAt 不要動**(那是單獨審查才改的)。
    **該類 scope 裡每一項都看過才算涵蓋**;只看了一部分的不改日期,把看了哪些接在 note 尾巴。對照:面向 3 → 資料安全與同步、5 → 內容審查、8 → 離線 PWA 與部署;
    功能實測只有真的在瀏覽器把該類範圍點過一輪才算(只讀程式不算);規則審查只有把規則檔整份審過才算(面向 6 審的是 App 的邏輯,不是規則檔);複習排程沒有對應的面向。收尾 commit 標題必須包含「${t}」(連放大鏡;App 的體檢提醒計數靠它歸零,只寫後面四個字不算)。照固定流程備份原始碼並上線;上線時 npm run build 會印「[gen-audit-info] 上次全面稽核:…」,要看到今天的日期、之後累積 0 次,沒歸零就是標記寫錯了。`}();e.s(["P",0,t,"o",0,a,"F",0,15],37998);var n=e.i(43476),i=e.i(22016),r=e.i(71645),l=e.i(62437);let o=l.default.soonDays,d=l.default.categories;function c(e){let t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(!t)throw Error(`review-log 日期格式錯誤:${e}(要 YYYY-MM-DD)`);return Date.UTC(+t[1],t[2]-1,+t[3])}function m(e=new Date){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}function p(e=m()){let t=c(e);return d.map(e=>{let s,a=c(e.lastReviewedAt),n=Math.round((t-a)/864e5),i=e.intervalDays-n,r=i<=0?"due":i<=o?"soon":"ok";return{...e,daysSince:n,daysLeft:i,dueAt:(s=new Date(a+864e5*e.intervalDays),`${s.getUTCFullYear()}-${String(s.getUTCMonth()+1).padStart(2,"0")}-${String(s.getUTCDate()).padStart(2,"0")}`),state:r}})}function u(e=m()){return p(e).filter(e=>"due"===e.state)}function g(e,s=m()){let a=d.find(t=>t.id===e);if(!a)throw Error(`沒有這個審查類別:${e}`);let n=a.declinedIdeas.length?a.declinedIdeas.map(e=>`
   - ${e}`).join(""):"目前沒有";return`請對英文學習 App(D:\\FORCLAUDE\\英文學習)做一次「${a.name}」審查。

【範圍】${a.scope}
【上次做的時間】${a.lastReviewedAt}(${a.note});這次重點看上次之後的改動(git log 與 CHANGELOG.md 從那天起),但不限於它們。
【上次單獨審查】${a.lastStandaloneAt||"還沒有(這是第一次,第 6 條的週期那一項寫「上次無可比數字」)"}

【規矩】
1. 先讀 CLAUDE.md,照「派子代理的固定分工」「連動更新規則」「改完之後的固定流程」做:找問題派 langlearn-auditor、修完派 langlearn-verifier 獨立驗收;代理的回報是線索不是結論,每一條要親自查證再修;修好的要寫成自動測試並故意改壞一次確認會紅;只改規則檔或說明文字的修正,只有程式依賴那句話(程式或測試會讀它、照它算)或那句話以前漂移過時才加比對測試,其餘不硬加(比對文字的測試擋不住換句話說,只會讓之後改措辭也要改測試)。${"features"===a.id?"\n   這一類要在瀏覽器點畫面,但 langlearn-auditor 沒有瀏覽器:點畫面由你(統籌者)用內建瀏覽器在 localhost:3000 自己做(線上版只能看不能點會寫入的東西),代理只派去讀程式碼補查。":""}
2. 覺得規則、資料、字義或指令哪裡是錯的,一定要明說,不要為了配合它把對的改成錯的。丟給我決定的事一律附建議、不做的代價、急不急。
3. 改良建議:中途發現有更好的做法或呈現方式,在回報裡另列「改良建議」一區,跟找到的問題分開、不佔問題的名額,總共最多 3 條(代理提的加上你自己看到的,挑最值得的)。每條要講出它解決什麼具體困擾(要多點幾下、容易看錯、常按錯、規則常被忘…),講不出具體困擾的風格偏好不要提。審查期間只提不動手,一律當成「待你決定」附建議、不做的代價、急不急;但如果建議牽涉到這次要修的問題該怎麼修,修之前就先停下來問我(CLAUDE.md「有更好的做法就中途提出」第 1 級),不要修完才提。派 langlearn-auditor 時把這一條連同下面的方向與否決清單寫進派工單。
   這一類的方向:${a.improveHint}
   我以前否決過的(不要重提;情況變了才可以再提,並說明哪裡變了):${n}
   我否決的建議,寫進 review-log.json 這一筆的 declinedIdeas(格式「YYYY-MM-DD 一句話」)。
4. 動到複習排程、進度、合併、匯入匯出、內容升級的改動,要用我的真實資料複本在 localhost 驗,線上版只能看不能寫。
5. 做完把 src/lib/review-log.json 裡 id 為「${a.id}」那一筆的 lastReviewedAt 與 lastStandaloneAt 都改成做完那天的日期(複製這份指令時是 ${s})、note 整段換成「找到 N 條(會弄丟資料 M 條)」再寫一行這次做了什麼(舊 note 裡寫著「還沒看過」的,這次也沒看就搬過來),跟這次的修改同一個 commit;範圍裡只做了一部分就兩個日期都不要改,把做了哪些接在 note 尾巴。commit 標題不要寫「${t}」(那是全面體檢收尾、把計數歸零用的標記)。
6. 檢查這一類的指令本身(收尾回報另寫一段「這一類指令本身」,不佔改良建議的 3 條;要改範圍、週期或方向一樣只提、由我決定;但範圍裡的事實錯誤(檔名、路徑過時)當成問題照第 1 條直接修)。依這次的證據判斷,不要憑感覺說「都很好」:
   - 這次找到的問題有沒有落在【範圍】外面?有 → 建議加進範圍。
   - 範圍裡有沒有整輪看下來根本沒東西可看的?有 → 建議刪掉或併到別類。
   - 這次和上次單獨審查是不是都幾乎沒找到問題 → 建議拉長週期;找到會弄丟資料的 → 建議縮短。上次的數字看 note 開頭的「找到 N 條」;note 已被之後的更新(全面稽核、修 bug 順便看過)蓋掉就用 git log -p src/lib/review-log.json 找上次單獨審查那一筆;找不到可比的數字(例如這是第一次單獨審查),週期這項寫「上次無可比數字」,不要猜。
   - 「這一類的方向」這次有沒有用上;照這份指令做的過程中,有沒有哪一句讓你卡住、誤解或互相矛盾。
   沒有證據支持要改,就寫「指令不用改」加一句理由。
7. 收尾回報:找到什麼、修了什麼、哪些沒修與為什麼、改良建議、這一類指令本身、測試數前後、檢查了哪些連動點。`}function A(){let[e,t]=(0,r.useState)(null);return(0,r.useEffect)(()=>{t(m())},[]),e}e.s(["J",0,o,"n",0,u,"v",0,g,"E",0,p,"P",0,m],16006);let v={due:"⛔ 到期",soon:"⚠ 快到期",ok:"✅ 正常"},f={due:"border-accent/60 bg-accent/10",soon:"border-warn/60 bg-warn/10",ok:"border-border bg-background"};function b({row:e}){let[t,s]=(0,r.useState)(!1),[a,i]=(0,r.useState)(!1);async function l(){try{await navigator.clipboard.writeText(g(e.id,m())),s(!0),i(!1),setTimeout(()=>s(!1),2e3)}catch{i(!0)}}let o=e.daysLeft<0?`已過期 ${-e.daysLeft} 天`:0===e.daysLeft?"今天到期":`還有 ${e.daysLeft} 天`;return(0,n.jsxs)("div",{className:`rounded-lg border p-3 space-y-1 ${f[e.state]}`,children:[(0,n.jsxs)("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("b",{children:e.name}),(0,n.jsx)("span",{className:"ml-2 text-xs",children:v[e.state]})]}),(0,n.jsx)("button",{onClick:l,className:"px-3 py-1 rounded-lg border border-border text-xs hover:bg-surface",children:t?"✅ 已複製":"📋 複製審查指令"})]}),(0,n.jsxs)("p",{className:"text-xs",children:["上次 ",(0,n.jsx)("b",{children:e.lastReviewedAt}),"(",e.daysSince," 天前)・每 ",e.intervalDays," 天一次・下次"," ",(0,n.jsx)("b",{children:e.dueAt}),"(",o,")"]}),(0,n.jsx)("p",{className:"text-xs",children:e.note}),(0,n.jsxs)("details",{children:[(0,n.jsx)("summary",{className:"cursor-pointer select-none text-xs",children:"審查範圍"}),(0,n.jsx)("p",{className:"mt-1 text-xs whitespace-pre-wrap",children:e.scope})]}),a&&(0,n.jsxs)("div",{className:"text-xs text-warn",children:["複製失敗(瀏覽器不允許)。請展開下方「指令內容」手動選取複製。",(0,n.jsxs)("details",{children:[(0,n.jsx)("summary",{className:"cursor-pointer select-none",children:"指令內容"}),(0,n.jsx)("pre",{className:"mt-1 whitespace-pre-wrap",children:g(e.id,m())})]})]})]})}e.s(["G",0,function(){let e=A();if(!e)return null;let t=u(e);return 0===t.length?null:(0,n.jsxs)(i.default,{href:"/guide#reviews",className:"block rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm hover:opacity-80",children:["🗓 有 ",t.length," 類審查到期了:",t.map(e=>e.name).join("、"),"——點這裡到使用說明的「審查紀錄」,複製那一類的審查指令貼給 Claude。"]})},"F",0,function(){let e=A();if(!e)return null;let t=[...p(e)].sort((e,t)=>e.daysLeft-t.daysLeft);return(0,n.jsx)("div",{className:"space-y-2","data-testid":"review-log-card",children:t.map(e=>(0,n.jsx)(b,{row:e},e.id))})}],33162)},62437,(e,t,s)=>{t.exports=JSON.parse('{"_說明":"各類審查的「上次做的日期」與「多久該再做一次」。單一來源:使用說明頁「🗓 審查紀錄」卡、首頁到期橫幅、npm run review-status 都讀這裡。做完某一類審查就把該類的 lastReviewedAt 改成當天、note 寫一行做了什麼;用該類審查指令單獨整輪做完的,lastStandaloneAt 也改成當天、note 開頭寫「找到 N 條(會弄丟資料 M 條)」(判準見 CLAUDE.md「審查紀錄與提醒」),跟那次的修改一起 commit。全面體檢不記這裡(它靠 git 計數:scripts/gen-audit-info.mjs 找標題含「🔍 全面稽核」的 commit),但體檢收尾要把實際涵蓋到的類別 lastReviewedAt 一起更新(該類 scope 每一項都看過才算;lastStandaloneAt 不動)。建檔(2026-09-27)時的初始日期是從 git log 與 CHANGELOG 照實推的。","soonDays":14,"categories":[{"id":"rules","name":"規則審查","scope":"CLAUDE.md 全文、AGENTS.md、.claude/agents/ 三個代理定義檔、CARD_SPEC、體檢指令 src/lib/audit-prompt.ts、各類審查指令(src/lib/review-log.json 六類的範圍/週期/方向,與 review-log.ts 的共用規矩)、體檢與審查工具(scripts/audit-scan.mjs、audit-count.mjs、gen-audit-info.mjs、review-status.mjs、test-titles.mjs、ts-hooks.mjs)、.claude/settings.local.json 的權限清單、說明文件(README/ARCHITECTURE/CHANGELOG/使用說明頁)與會產生指令的功能(閱讀頁「產生加文章指令」、統計頁「產生優化指令」)是否還跟程式與現況一致;六類之間有無重疊或沒人管的縫;規則之間有無矛盾、模糊、過時、不會觸發、缺漏;代理之間判斷不一致或發現 Claude 沒照某條規則做,立刻審","intervalDays":60,"lastReviewedAt":"2026-10-23","lastStandaloneAt":"2026-10-23","note":"找到 38 條(會弄丟資料 1 條:多益/日常/日文內建卡 id 是位置、只能接尾端,規格與修字工都沒寫、沒測試):第一次單獨審查,3 個稽核分 CLAUDE.md/代理檔與審查機制/CARD_SPEC;修 25 條(他定 4 件:體檢整類都看過才改日期、刪「每次體檢順便審規則」、內容升級只有改升級程式或增刪內建卡才用複本驗、純文案免派驗收+CHANGELOG 每則寫驗收),新增卡片 id 位移、CHANGELOG 驗收、墓碑清單、條號引用守門,假防護 1 條改成實跑;CARD_SPEC 有 9 條要改資料的規格選擇留給下一輪內容審查","improveHint":"規則能不能更短、更不容易被忘:哪條文字規則可以改成自動測試或腳本守門(程式擋比靠記得可靠)、哪幾條重複可以合併、哪條從來沒觸發過可以刪","declinedIdeas":[]},{"id":"features","name":"功能實測","scope":"在瀏覽器用眼睛逐項點過:三個模式切換、首頁→複習(四個評分鈕、跳過、弱點加強)、測驗各模式、牌組頁(匯出/匯入/重設/情境篩選)、統計、模考(三回、只練某 Part、錯題本)、閱讀、對話(整段與逐句朗讀、兩個角色換不同聲音、日文不唸括號裡的讀音、開關中譯)、文法、辨析、假名、首頁每日提醒(開關點得動;通知要安裝到主畫面才會發、瀏覽器點不出來,張數用他的資料複本在 node 跑 public/sw.js 算對不對)、手機版排版與加入主畫面;考試前一個月把多益模式整輪跑一次","intervalDays":60,"lastReviewedAt":"2026-10-23","lastStandaloneAt":"2026-10-23","note":"找到 25 條(會弄丟資料 1 條:📖 ToeicMaster 虛擬牌組刪單張卡沒警告會刪到其他牌組的字與進度):第一次單獨功能實測,三個模式每一頁在 localhost 用 10-23 真實複本點過(加入主畫面只驗 manifest,瀏覽器測不到真的安裝)+2 個稽核查日常/日文分支與 09-08 後改動的互動;全部修完(他定 3 件:日文拼字改打讀音且只收讀音、每日提醒三模式合計、模考只在多益導覽列),另一條漏到期卡:重設/匯入/還原/合併帶進重設後複習頁接著跑舊佇列(新增資料版本記號)。指令本身(第 6 條):範圍外的發現有每日提醒(離線 PWA 類)與重設後佇列(跨資料安全),範圍沒寫對話朗讀與每日提醒,建議補進範圍(待他定);週期上次無可比數字。順帶發現沒修:768～1000px 寬導覽列三模式都會擠。2026-10-24 他照建議定:範圍補進對話朗讀與首頁每日提醒(只改範圍,日期不動);同日驗收順帶發現沒修:裝置湊不到兩個真實語音時,對話頁「逐句」點播 A、B 兩個角色是同一個聲音(整段播放有音高模擬,逐句沒有;頁面只承諾整段用兩種聲音)","improveHint":"實際點過之後覺得卡的地方:流程要多點幾下、按鈕或資訊找不到、手機上太擠或字太小、某個數字或說明容易看錯;能的話對照我的使用紀錄(哪些按鈕常按、哪些功能從沒用過)","declinedIdeas":[]},{"id":"content","name":"內容審查","scope":"字卡(日常/多益 15 牌組/ToeicMaster/日文)的字義、例句、字族、搭配是否正確、同牌組與跨牌組撞號;自動出題(詞形/搭配/填空)的規則漏洞;模考三回與 Part 5 專練的題目、答案、詳解、正解字母分布與選項長度洩題;文章、對話、文法、辨析的內容錯誤與重複;改內容要動 scripts/*-data 來源檔並重跑建置腳本、bump CONTENT_VERSION","intervalDays":90,"lastReviewedAt":"2026-09-20","lastStandaloneAt":"","note":"全面稽核:68 組跨牌組撞號全部拆號、字族引用 11 筆統一、搭配題與詞形題 3 個規則漏洞、建置腳本幽靈字來源;CONTENT_VERSION 43;10-23 全面體檢看完日常與日文全部卡片、修 13 張(CONTENT_VERSION 44),模考/文法/文章/辨析沒看,日期不動;10-23 規則審查留下待辦:CARD_SPEC 9 條要改資料的規格選擇(def 括號外斜線算不算義項分隔→manual/handbook 撞號、詞組複合詞性、mis- 等)+3 張 altDef 全形「/」(incubator/condemn/ceiling),細節見 CHANGELOG 2026-10-23 規則審查那則;10-23 規則審查後的複驗另抓到 2 張目標字括號裡多塞另一個詞性、altDef 又寫一次(patient「n. 病人/adj. 有耐心的」、complex「n. 綜合大樓/adj. 複雜的」,卡片詞性都是 n.),規格沒寫死「卡片單一詞性時目標字括號只能一個詞性」,一起定;10-26 全面體檢只看了模考 Part 3 角色代號(M/W/M2)與台詞、題目、詳解的性別一致(39 組全對;因為 10-26 起依代號配男女聲),其餘範圍沒看,日期不動","improveHint":"只提整批的規律,不逐張改寫:例如某類例句普遍太短看不出用法、某種題型常常答案不唯一、某個牌組的譯法風格不統一;每條附受影響的筆數(用腳本算)。「這句可以寫得更好」這種單張的品味修改不要提","declinedIdeas":[]},{"id":"srs","name":"複習排程與個人化參數","scope":"FSRS 排程(src/lib/srs.ts、fsrs-params.ts、memory-stage):學習初期固定級距(10 分/2 天/4 天/7 天)、重新學習中「困難」15 分鐘不結束卡、複習期「重來」記弱點並 10 分鐘內重現、回想計時建議、每日新字上限三模式共用、弱點加強、跳過與恢復;個人化參數的訓練流程與壞參數防線;統計頁「參數深度優化」產生的指令是否仍符合現況","intervalDays":180,"lastReviewedAt":"2026-08-10","lastStandaloneAt":"","note":"全面稽核修 srs.ts + FSRS 參數重新訓練並補「壞參數自動擋下」防線;08-15 訂的重新學習中「困難」15 分鐘規則之後沒整輪審過;10-20 第三次重訓參數,新參數間隔會撞上限而否決、維持 08-10 那組(只做了參數訓練,其餘範圍沒審,日期不動);10-23 全面體檢把統計頁「產生優化指令」補上 10-20 的決定(比較兩種訓練資料),排程本身沒審,日期不動;10-23 體檢後第 2 輪修兩個小洞(健康檢查的間隔檢查固定用 90%、優化指令不准把否決的參數存成個人化參數檔),是修 bug 不是審查,日期不動","improveHint":"從我的複習紀錄看得出來的使用習慣問題(例:2026-10-20 發現 8 月起複習卡沒按過一次「良好」),或排程規則明顯不合我學習節奏的地方;這一類一律只提、由我決定,因為改排程的代價在我身上","declinedIdeas":[]},{"id":"data","name":"資料安全與同步","scope":"IndexedDB 資料層(local-db.ts、state-ops.ts、store.tsx)、匯出備份/匯入(覆蓋、合併)、GitHub 雲端同步(自動上傳/下載合併)、各種墓碑(以 src/lib/types.ts 的 AppState 與 Card 註解為準,完整欄位清單在 .claude/agents/langlearn-auditor.md:刪牌組/刪卡/刪複習紀錄(都含刪除時間與覆蓋還原的救回時間)/清初見(含撤銷記號 revivedFirstSeen/keptFirstSeen)/清錯題本 examWrongClearedAt、單一牌組重設 resetAt、重設全部 resetAllAt(三種都含撤銷記號)/跳過、⭐重點字、記憶法的切換時間/個人化參數還原預設)會不會透過合併復活、覆蓋型還原(匯入覆蓋、還原自動備份)救回之後另一台同步過來會不會再弄掉(記號全由 state-ops.ts 的 carryRestoreMarks 帶)、MERGE_POLICY 涵蓋 AppState 每個欄位、多使用者切換、內容升級 upgradeContent 不動 SRS 進度、儲存空間滿的提示、刪除與重設這類破壞性操作的入口和確認文字(確認框文字集中在 src/lib/confirm-copy.ts,confirm-copy.test.ts 掃整個 src 的 confirm(;要看每一則講的「救不救得回來」「會不會傳到其他裝置」是不是真的,沒有確認框就直接刪或重設的入口也算);動到這些一定要用他的真實資料複本在 localhost 驗","intervalDays":90,"lastReviewedAt":"2026-10-26","lastStandaloneAt":"","note":"2026-10-26 全面體檢(面向 3,派工單附整類 scope、稽核回報逐項涵蓋表):local-db 一般存讀與多使用者切換、state-ops 墓碑/重設/救回(真實複本 07-31/09-20/10-23 實跑,改壞 3 種會紅)、store 覆蓋與合併路徑、匯出匯入、雲端同步、所有墓碑、MERGE_POLICY、upgradeContent、儲存空間滿的提示都看過;修 2 項會弄丟資料(牌組頁勾選後切模式,「刪除勾選」刪到畫面上看不到的卡;同瀏覽器兩分頁用不同使用者,覆蓋匯入會把資料寫進別人的雲端備份)+3 項功能壞(單字詳情刪除沒警告、合併匯入不等存檔就換複習歷史、開 App 存檔失敗卡在載入中),localhost 用 10-23 複本覆蓋+合併 09-20 驗過;已知不修:重設全部被另一台事後的 ⭐/跳過/記憶法打穿(那張卡重設前的進度回來、歷史對不上)、合併時複習歷史幾十毫秒空窗;稽核建議範圍補「刪除與重設這類破壞性操作的入口和確認文字」(他 10-27 同意,已補進範圍;同日把全部確認框文字收進 confirm-copy.ts,那次只整理文字、沒有整類審查)","improveHint":"只收「更安全」的建議:哪條路徑還能多一道防線、哪個情境還沒有自動測試、備份與還原能不能更不容易出錯;不要為了好寫或好看提議重構資料層","declinedIdeas":[]},{"id":"pwa","name":"離線 PWA 與部署","scope":"public/sw.js 快取版本與策略、只清 langlearn- 前綴、離線可用、手機加入主畫面;npm run build 三步(gen-audit-info → next build → gen-sw)、兩個 .bat、線上版 zaker353.github.io 與 localhost:3000 是否同步;Next / ts-fsrs / vitest 等套件有沒有新版、升級後全測試重跑","intervalDays":180,"lastReviewedAt":"2026-10-26","lastStandaloneAt":"","note":"2026-10-26 全面體檢(面向 8,派工單附整類 scope、稽核回報逐項涵蓋表):sw.js 快取版本與策略、只清 langlearn- 前綴、離線快取(gen-sw 路由檢查)、手抄待複習數與每日提醒(改壞 1 種會紅)、加入主畫面(manifest、圖示尺寸、線上 Content-Type;只驗檔案,瀏覽器測不到真的安裝)、build 三步、兩個 .bat、線上 sw 與本機 out/ 逐字相同、npm outdated(next 16.4.3、ts-fsrs 5.4.2 都是小修、沒有安全修正,不急)都看過;修 1 項:上傳 .bat 推送失敗仍印「上傳完成」(補修時一度在 if 區塊裡用半形括號、整個腳本會中斷,驗收抓到已改全形並實跑成功/失敗兩種);serve.mjs 補 .jpg","improveHint":"部署與離線流程有沒有能更自動、更不容易漏步驟的地方(例:哪一步常要手動補救);套件升級只在有具體好處(修 bug、安全性)時才提","declinedIdeas":["2026-10-23 Windows 建置時每頁一個預先載入檔放錯位置(__next.X/__PAGE__.txt)、換頁多一次 404 後自動改抓整頁:不修(畫面看不出差別,修了反而啟用沒跑過的載入路徑)","2026-10-23 npm audit 的套件安全警告(全在開發與建置工具,不進網頁):不處理"]}]}')}]);