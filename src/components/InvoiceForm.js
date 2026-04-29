import { addInvoice, updateInvoice } from '../services/invoiceService.js';

export function renderInvoiceForm(editingInvoice = null) {
  const isEdit = Boolean(editingInvoice);

  return `
    <div class="form-box">
      <h3>${isEdit ? '編輯發票' : '新增發票'}</h3>

      <input id="invoiceDate" type="date" value="${editingInvoice?.invoiceDate || ''}">
      <input id="invoiceMonth" placeholder="發票月份，例如：7-8月" value="${editingInvoice?.invoiceMonth || ''}">
      <input id="invoiceNumber" placeholder="發票號碼" value="${editingInvoice?.invoiceNumber || ''}">
      <input id="buyerName" placeholder="買受人" value="${editingInvoice?.buyerName || ''}">
      <input id="taxId" placeholder="統一編號" value="${editingInvoice?.taxId || ''}">
      <input id="serviceName" placeholder="服務品名" value="${editingInvoice?.serviceName || ''}">
      <input id="amountNoTax" type="number" placeholder="未稅金額" value="${editingInvoice?.amountNoTax || ''}">
      <input id="taxAmount" type="number" placeholder="稅額" value="${editingInvoice?.taxAmount || ''}">
      <input id="totalAmount" type="number" placeholder="總計" value="${editingInvoice?.totalAmount || ''}">

      <select id="isPaid">
        <option value="未收款" ${editingInvoice?.isPaid === '未收款' ? 'selected' : ''}>未收款</option>
        <option value="已收款" ${editingInvoice?.isPaid === '已收款' ? 'selected' : ''}>已收款</option>
      </select>

      <textarea id="note" placeholder="備註">${editingInvoice?.note || ''}</textarea>

      <button id="saveInvoice" class="primary-btn">
        ${isEdit ? '更新發票' : '儲存發票'}
      </button>
    </div>
  `;
}

export function bindInvoiceForm(onSuccess, editingInvoice = null) {
  document.querySelector('#saveInvoice').onclick = () => {
    const data = {
      invoiceDate: document.querySelector('#invoiceDate').value,
      invoiceMonth: document.querySelector('#invoiceMonth').value,
      invoiceNumber: document.querySelector('#invoiceNumber').value,
      buyerName: document.querySelector('#buyerName').value,
      taxId: document.querySelector('#taxId').value,
      serviceName: document.querySelector('#serviceName').value,
      amountNoTax: document.querySelector('#amountNoTax').value,
      taxAmount: document.querySelector('#taxAmount').value,
      totalAmount: document.querySelector('#totalAmount').value,
      isPaid: document.querySelector('#isPaid').value,
      note: document.querySelector('#note').value
    };

    if (editingInvoice) {
      updateInvoice(editingInvoice.id, data);
    } else {
      addInvoice(data);
    }

    onSuccess();
  };
}