import { getDashboardStats } from './stats.js';

function money(v) {
  return Number(v || 0).toLocaleString('zh-TW');
}

export async function handleUserMessage(userText) {
  const stats = await getDashboardStats();

  if (userText === '查詢待確認案件') {
    return `待確認案件：${stats.pendingCheck} 件`;
  }

  if (userText === '查詢待開發票') {
    return `待開發票：${stats.pendingInvoice} 件`;
  }

  if (userText === '查詢未收款發票') {
    return `未收款發票：${stats.unpaidInvoices} 張`;
  }

  if (userText === '查詢本月金額') {
    return `本月開票金額：${money(stats.monthAmount)} 元`;
  }

  if (userText === '查詢今年金額') {
    return `今年開票金額：${money(stats.yearAmount)} 元`;
  }

  return '請從圖文選單點選功能。';
}