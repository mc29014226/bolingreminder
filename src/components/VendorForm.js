import { addVendor, updateVendor } from '../services/vendorService.js';

export function renderVendorForm(editingVendor = null) {
  const isEdit = Boolean(editingVendor);

  return `
    <div class="form-box">
      <h3>${isEdit ? '編輯廠商' : '新增廠商'}</h3>

      <input id="vendorName" placeholder="廠商名稱" value="${editingVendor?.vendorName || ''}">
      <input id="taxId" placeholder="統一編號" value="${editingVendor?.taxId || ''}">
      <input id="contactPerson" placeholder="聯絡人" value="${editingVendor?.contactPerson || ''}">
      <input id="phone" placeholder="電話" value="${editingVendor?.phone || ''}">
      <input id="email" placeholder="Email" value="${editingVendor?.email || ''}">

      <textarea id="note" placeholder="備註">${editingVendor?.note || ''}</textarea>

      <button id="saveVendor" class="primary-btn">
        ${isEdit ? '更新廠商' : '儲存廠商'}
      </button>
    </div>
  `;
}

export function bindVendorForm(onSuccess, editingVendor = null) {
  document.querySelector('#saveVendor').onclick = () => {
    const data = {
      vendorName: document.querySelector('#vendorName').value,
      taxId: document.querySelector('#taxId').value,
      contactPerson: document.querySelector('#contactPerson').value,
      phone: document.querySelector('#phone').value,
      email: document.querySelector('#email').value,
      note: document.querySelector('#note').value
    };

    if (editingVendor) {
      updateVendor(editingVendor.id, data);
    } else {
      addVendor(data);
    }

    onSuccess();
  };
}