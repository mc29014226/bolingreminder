import { getProjects } from '../services/projectService.js';
import { getInvoices } from '../services/invoiceService.js';

function toNumber(value) {
  return Number(value || 0);
}

function formatMoney(value) {
  return toNumber(value).toLocaleString('zh-TW');
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

export async function renderDashboard(container) {
  const projects = await getProjects();
  const invoices = await getInvoices();

  const pendingCheck = projects.filter(item => item.status === '待確認').length;
  const pendingInvoice = projects.filter(item => item.status === '待開發票').length;
  const doneProjects = projects.filter(item => item.status === '已結案').length;

  const unpaidInvoices = invoices.filter(item => item.isPaid === '未收款').length;

  const currentMonthAmount = invoices
    .filter(item => isCurrentMonth(item.invoiceDate))
    .reduce((sum, item) => sum + toNumber(item.totalAmount), 0);

  const currentYearAmount = invoices
    .filter(item => isCurrentYear(item.invoiceDate))
    .reduce((sum, item) => sum + toNumber(item.totalAmount), 0);

  container.innerHTML = `
    <h1>首頁總覽</h1>

    <section class="cards">
      <div class="card">
        <h3>待確認案件</h3>
        <p>${pendingCheck} 件</p>
      </div>

      <div class="card">
        <h3>待開發票</h3>
        <p>${pendingInvoice} 件</p>
      </div>

      <div class="card">
        <h3>已結案</h3>
        <p>${doneProjects} 件</p>
      </div>

      <div class="card">
        <h3>未收款發票</h3>
        <p>${unpaidInvoices} 張</p>
      </div>

      <div class="card">
        <h3>本月開票金額</h3>
        <p>${formatMoney(currentMonthAmount)} 元</p>
      </div>

      <div class="card">
        <h3>今年開票金額</h3>
        <p>${formatMoney(currentYearAmount)} 元</p>
      </div>
    </section>
  `;
}