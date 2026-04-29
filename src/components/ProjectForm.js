import { addProject, updateProject } from '../services/projectService.js';
import { getVendors } from '../services/vendorService.js';

export async function renderProjectForm(editingProject = null) {
  const isEdit = Boolean(editingProject);
  const vendors = await getVendors();

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

      <input id="vendor" placeholder="廠商名稱"
        value="${editingProject?.vendor || ''}" readonly>

      <input id="taxId" placeholder="統一編號"
        value="${editingProject?.taxId || ''}" readonly>

      <input id="projectName" placeholder="案名"
        value="${editingProject?.projectName || ''}">

      <input id="amount" placeholder="總金額"
        value="${editingProject?.amount || ''}">

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

  if (vendorSelect.value) syncVendorInfo();

  document.querySelector('#saveProject').onclick = async () => {
    const data = {
      vendorId: vendorSelect.value,
      vendor: vendorInput.value,
      taxId: taxIdInput.value,
      projectName: document.querySelector('#projectName').value,
      amount: document.querySelector('#amount').value
    };

    if (editingProject) {
      await updateProject(editingProject.id, data);
    } else {
      await addProject(data);
    }

    onSuccess();
  };
}