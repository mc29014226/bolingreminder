import {
  getVendors,
  deleteVendor,
  getVendorById
} from '../services/vendorService.js';

import {
  renderVendorForm,
  bindVendorForm
} from '../components/VendorForm.js';

export async function renderVendorList(container, editId = null) {
  const data = await getVendors();
  const editingVendor = editId
    ? await getVendorById(editId)
    : null;

  const formHtml = renderVendorForm(editingVendor);

  container.innerHTML = `
    <h1>廠商管理</h1>

    ${formHtml}

    <table>
      <thead>
        <tr>
          <th>廠商名稱</th>
          <th>統一編號</th>
          <th>聯絡人</th>
          <th>電話</th>
          <th>Email</th>
          <th>操作</th>
        </tr>
      </thead>

      <tbody>
        ${
          data.length === 0
            ? `<tr><td colspan="6">尚無廠商資料</td></tr>`
            : data.map(item => `
              <tr>
                <td>${item.vendorName || ''}</td>
                <td>${item.taxId || ''}</td>
                <td>${item.contactPerson || ''}</td>
                <td>${item.phone || ''}</td>
                <td>${item.email || ''}</td>
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

  bindVendorForm(loadPage, editingVendor);

  document.querySelectorAll('.del-btn').forEach(btn => {
    btn.onclick = async () => {
      await deleteVendor(btn.dataset.id);
      loadPage();
    };
  });

  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.onclick = () => {
      renderVendorList(container, btn.dataset.id);
    };
  });

  async function loadPage() {
    await renderVendorList(container);
  }
}