import {
  getInvoices,
  deleteInvoice,
  getInvoiceById
} from '../services/invoiceService.js';

import {
  renderInvoiceForm,
  bindInvoiceForm
} from '../components/InvoiceForm.js';

export function renderInvoiceList(container, editId = null) {
  const data = getInvoices();
  const editingInvoice = editId ? getInvoiceById(editId) : null;

  container.innerHTML = `
    <h1>發票紀錄</h1>

    ${renderInvoiceForm(editingInvoice)}

    <table>
      <thead>
        <tr>
          <th>開立日期</th>
          <th>發票月份</th>
          <th>發票號碼</th>
          <th>買受人</th>
          <th>統編</th>
          <th>服務品名</th>
          <th>總計</th>
          <th>收款</th>
          <th>操作</th>
        </tr>
      </thead>

      <tbody>
        ${
          data.length === 0
            ? `<tr><td colspan="9">尚無發票資料</td></tr>`
            : data.map(item => `
              <tr>
                <td>${item.invoiceDate || ''}</td>
                <td>${item.invoiceMonth || ''}</td>
                <td>${item.invoiceNumber || ''}</td>
                <td>${item.buyerName || ''}</td>
                <td>${item.taxId || ''}</td>
                <td>${item.serviceName || ''}</td>
                <td>${item.totalAmount || ''}</td>
                <td>${item.isPaid || ''}</td>
                <td>
                  <button class="edit-btn" data-id="${item.id}">編輯</button>
                  <button class="del-btn" data-id="${item.id}">刪除</button>
                </td>
              </tr>
            `).join('')
        }
      </tbody>
    </table>
  `;

  bindInvoiceForm(loadPage, editingInvoice);

  document.querySelectorAll('.del-btn').forEach(btn => {
    btn.onclick = () => {
      deleteInvoice(btn.dataset.id);
      loadPage();
    };
  });

  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.onclick = () => {
      renderInvoiceList(container, btn.dataset.id);
    };
  });

  function loadPage() {
    renderInvoiceList(container);
  }
}