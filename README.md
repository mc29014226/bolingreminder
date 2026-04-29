以下是目前交接摘要，可直接給下一個 Agent 看。

專案名稱

bolingreminder

目標：建立一套「廠商／案件／發票／收款／LINE 提醒」管理系統，先用 localStorage 開發，未來切換到 Supabase 雲端資料庫，前端預計部署到 Cloudflare Pages，LINE Webhook/排程用 Cloudflare Worker。

目前已完成
1. 前端架構

使用：

Vite + Vanilla JS

目前主要結構：

src/
├─ components/
│  ├─ ProjectForm.js
│  ├─ VendorForm.js
│  └─ InvoiceForm.js
├─ pages/
│  ├─ dashboard.js
│  ├─ vendorList.js
│  ├─ projectList.js
│  ├─ invoiceList.js
│  ├─ scheduleList.js
│  ├─ paymentList.js
│  └─ settings.js
├─ services/
│  ├─ projectService.js
│  ├─ vendorService.js
│  ├─ invoiceService.js
│  ├─ summaryService.js
│  └─ lineService.js
├─ repositories/
│  ├─ projectRepository.js
│  ├─ vendorRepository.js
│  └─ invoiceRepository.js
├─ data/
│  ├─ localStorageClient.js
│  └─ supabaseClient.js
├─ utils/
│  └─ schedule.js
└─ config.js
2. 已完成功能
廠商管理

已完成 CRUD：

新增廠商
編輯廠商
刪除廠商
查詢列表

欄位：

廠商名稱 vendorName
統一編號 taxId
聯絡人 contactPerson
電話 phone
Email email
備註 note
案件管理

已完成 CRUD，並已改成選廠商帶入資料。

欄位：

vendorId
vendor
taxId
projectName
amount
contractReceived
invoiceCycle
invoiceDate
status
note

狀態：

待確認
待開發票
已結案

發票週期：

一次性
每月
每季
每年
發票紀錄

已完成 CRUD。

欄位：

invoiceDate
invoiceMonth
invoiceNumber
buyerName
taxId
serviceName
amountNoTax
taxAmount
totalAmount
isPaid
note

收款狀態：

未收款
已收款
首頁 Dashboard

已完成 async 版統計：

待確認案件
待開發票
已結案
未收款發票
本月開票金額
今年開票金額
發票時程表

已完成：

依發票紀錄 invoiceDate 自動抓年度
民國年顯示
1～12月橫向時程表
已收款／未收款顏色標示

顏色 class：

status-done       已收款／已結案
status-invoice    未收款／待開發票
status-check      待確認
設定頁

已完成 LINE 設定畫面：

提醒天數 remindDays
LINE通知 lineEnabled
LINE Channel Access Token lineToken
LINE User ID lineUserId
摘要通知 summaryEnabled
通知頻率 summaryFrequency
通知時間 summaryTime
摘要欄位 summaryFields

摘要欄位：

pendingCheck
pendingInvoice
doneProjects
unpaidInvoices
monthAmount
yearAmount
3. 資料架構

目前採用可切換架構：

pages → services → repositories → data

目前資料來源：

localStorage

未來切換：

Supabase

src/config.js：

export const APP_CONFIG = {
  dataMode: 'local',
  supabaseUrl: '',
  supabaseAnonKey: ''
};

目前 supabaseClient.js 已預留，但尚未安裝套件、尚未填入金鑰。

4. localStorage key

目前使用：

vendors_data
projects_data
invoices_data
system_settings
5. LINE Rich Menu 規劃

已規劃 6 宮格：

待確認案件｜待開發票
未收款發票｜本月金額
今年金額　｜開啟系統

對應 Rich Menu 指令：

查詢待確認案件
查詢待開發票
查詢未收款發票
查詢本月金額
查詢今年金額

已建立／規劃：

richmenu.json
richmenu-upload.sh

但 LINE Token 尚未取得，Rich Menu 尚未實際上傳。

6. Cloudflare Worker 架構

目前建立：

cloudflare-worker/
├─ index.js
├─ handlers.js
├─ stats.js
└─ wrangler.toml
Worker 功能

已設計兩種模式：

fetch()      LINE Reply Message
scheduled() 每日 Push 摘要

目前 Reply 會依使用者文字回覆統計資料。

目前 stats.js 還是假資料：

export async function getDashboardStats() {
  return {
    pendingCheck: 0,
    pendingInvoice: 0,
    unpaidInvoices: 0,
    monthAmount: 0,
    yearAmount: 0
  };
}
7. Worker 參數

wrangler.toml：

name = "boling-line-bot"
main = "index.js"
compatibility_date = "2026-04-30"

[triggers]
crons = ["0 1 * * *"]

說明：

UTC 01:00 = 台灣時間 09:00

Worker 需要設定 secrets：

LINE_CHANNEL_TOKEN
LINE_USER_ID
8. 已修正問題

曾發生 build 錯誤：

Could not resolve '../data/localStorageClient.js'

原因是檔名拼錯：

localStorageClinet.js

已改成：

localStorageClient.js

npm run build 後已成功。

9. 尚未完成
Supabase

尚未完成：

申請 Supabase 帳號
建立資料表
安裝 @supabase/supabase-js
填入 supabaseUrl / supabaseAnonKey
切換 APP_CONFIG.dataMode = 'supabase'
測試 CRUD

需要建立表：

vendors
projects
invoices
LINE

尚未完成：

建立 LINE Messaging API Channel
取得 Channel Access Token
取得 User ID
上傳 Rich Menu 圖片
上傳 richmenu.json
設為預設 Rich Menu
部署 Cloudflare Worker
設定 LINE Webhook URL
設定 Worker secrets
Cloudflare Pages

尚未正式部署前端。

部署設定預計：

Build command: npm run build
Output directory: dist
Excel 匯入

尚未做。

未來目標：

匯入既有發票 Excel
自動對應欄位
匯入 invoices_data / Supabase invoices
10. 下一步建議

建議順序：

1. 先部署 Cloudflare Worker 骨架
2. 申請 LINE Messaging API Channel
3. 取得 LINE_CHANNEL_TOKEN / LINE_USER_ID
4. 測試 Reply Message
5. 申請 Supabase
6. 建 vendors / projects / invoices 資料表
7. 將 stats.js 改為讀 Supabase
8. 前端切換 APP_CONFIG.dataMode = 'supabase'
9. 部署 Cloudflare Pages
10. 做 Excel 匯入

目前最重要下一步：

LINE Bot 正式串接，或 Supabase 建表