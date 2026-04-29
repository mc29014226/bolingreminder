import { addProject, updateProject } from '../services/projectService.js';
import { getVendors } from '../services/vendorService.js';

export function renderProjectForm(editingProject = null) {
  const isEdit = Boolean(editingProject);
  const vendors = getVendors();

  return `
    <div class="form-box">
      <h3>${isEdit ? '編輯案件' : '新增案件'}</h3>

      <select id="vendorSelect">
        <option value="">請選擇廠商</option>

        ${vendors.map(vendor => `
          <option
            value="${vendor.id}"
            data-name="${vendor.vendorName}"
            data-taxid="${vendor.taxId}"
            ${editingProject?.vendorId == vendor.id ? 'selected' : ''}
          >
            ${vendor.vendorName}
          </option>
        `).join('')}
      </select>

      <input
        id="vendor"
        placeholder="廠商名稱"
        value="${editingProject?.vendor || ''}"
        readonly
      >

      <input
        id="taxId"
        placeholder="統一編號"
        value="${editingProject?.taxId || ''}"
        readonly
      >

      <input
        id="projectName"
        placeholder="案名"
        value="${editingProject?.projectName || ''}"
      >

      <input
        id="amount"
        placeholder="總金額"
        value="${editingProject?.amount || ''}"
      >

      <select id="contractReceived">
        <option value="未收到" ${editingProject?.contractReceived === '未收到' ? 'selected' : ''}>未收到合約</option>
        <option value="已收到" ${editingProject?.contractReceived === '已收到' ? 'selected' : ''}>已收到合約</option>
      </select>

      <select id="invoiceCycle">
        <option value="一次性" ${editingProject?.invoiceCycle === '一次性' ? 'selected' : ''}>一次性</option>
        <option value="每月" ${editingProject?.invoiceCycle === '每月' ? 'selected' : ''}>每月</option>
        <option value="每季" ${editingProject?.invoiceCycle === '每季' ? 'selected' : ''}>每季</option>
        <option value="每年" ${editingProject?.invoiceCycle === '每年' ? 'selected' : ''}>每年</option>
      </select>

      <input
        id="invoiceDate"
        type="date"
        value="${editingProject?.invoiceDate || ''}"
      >

      <select id="status">
        <option value="待確認" ${editingProject?.status === '待確認' ? 'selected' : ''}>待確認</option>
        <option value="待開發票" ${editingProject?.status === '待開發票' ? 'selected' : ''}>待開發票</option>
        <option value="已結案" ${editingProject?.status === '已結案' ? 'selected' : ''}>已結案</option>
      </select>

      <textarea id="note" placeholder="備註">${editingProject?.note || ''}</textarea>

      <button id="saveProject" class="primary-btn">
        ${isEdit ? '更新案件' : '儲存案件'}
      </button>
    </div>
  `;
}

export function bindProjectForm(onSuccess, editingProject = null) {
  const vendorSelect = document.querySelector('#vendorSelect');
  const vendorInput = document.querySelector('#vendor');
  const taxIdInput = document.querySelector('#taxId');

  function syncVendorInfo() {
    const option = vendorSelect.options[vendorSelect.selectedIndex];

    vendorInput.value = option.dataset.name || '';
    taxIdInput.value = option.dataset.taxid || '';
  }

  vendorSelect.onchange = syncVendorInfo;

  if (vendorSelect.value) {
    syncVendorInfo();
  }

  document.querySelector('#saveProject').onclick = () => {
    const data = {
      vendorId: vendorSelect.value,
      vendor: vendorInput.value,
      taxId: taxIdInput.value,
      projectName: document.querySelector('#projectName').value,
      amount: document.querySelector('#amount').value,
      contractReceived: document.querySelector('#contractReceived').value,
      invoiceCycle: document.querySelector('#invoiceCycle').value,
      invoiceDate: document.querySelector('#invoiceDate').value,
      status: document.querySelector('#status').value,
      note: document.querySelector('#note').value
    };

    if (editingProject) {
      updateProject(editingProject.id, data);
    } else {
      addProject(data);
    }

    onSuccess();
  };
}