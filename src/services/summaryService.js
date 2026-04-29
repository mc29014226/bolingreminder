import { getProjects } from './projectService.js';
import { getInvoices } from './invoiceService.js';

function toNumber(value) {
  return Number(value || 0);
}

function money(value) {
  return toNumber(value).toLocaleString('zh-TW');
}

function getSettings() {
  return JSON.parse(localStorage.getItem('system_settings') || '{}');
}

function isCurrentMonth(dateString) {
  if (!dateString) return false;

  const date = new Date(dateString);
  const now = new Date();

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth()
  );
}

function isCurrentYear(dateString) {
  if (!dateString) return false;

  const date = new Date(dateString);
  const now = new Date();

  return date.getFullYear() === now.getFullYear();
}

export function buildSummaryMessage() {
  const settings = getSettings();
  const fields = settings.summaryFields || [];

  const projects = getProjects();
  const invoices = getInvoices();

  const lines = ['📊 發票管理摘要', ''];

  const pendingCheck =
    projects.filter(item => item.status === '待確認').length;

  const pendingInvoice =
    projects.filter(item => item.status === '待開發票').length;

  const doneProjects =
    projects.filter(item => item.status === '已結案').length;

  const unpaidInvoices =
    invoices.filter(item => item.isPaid === '未收款').length;

  const monthAmount = invoices
    .filter(item => isCurrentMonth(item.invoiceDate))
    .reduce((sum, item) => sum + toNumber(item.totalAmount), 0);

  const yearAmount = invoices
    .filter(item => isCurrentYear(item.invoiceDate))
    .reduce((sum, item) => sum + toNumber(item.totalAmount), 0);

  if (fields.includes('pendingCheck')) {
    lines.push(`待確認案件：${pendingCheck} 件`);
  }

  if (fields.includes('pendingInvoice')) {
    lines.push(`待開發票：${pendingInvoice} 件`);
  }

  if (fields.includes('doneProjects')) {
    lines.push(`已結案：${doneProjects} 件`);
  }

  if (fields.includes('unpaidInvoices')) {
    lines.push(`未收款發票：${unpaidInvoices} 張`);
  }

  if (fields.includes('monthAmount')) {
    lines.push(`本月開票金額：${money(monthAmount)} 元`);
  }

  if (fields.includes('yearAmount')) {
    lines.push(`今年開票金額：${money(yearAmount)} 元`);
  }

  return lines.join('\n');
}