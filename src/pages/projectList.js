import {
  getProjects,
  deleteProject,
  getProjectById
} from '../services/projectService.js';

import {
  renderProjectForm,
  bindProjectForm
} from '../components/ProjectForm.js';

export function renderProjectList(container, editId = null) {
  const data = getProjects();
  const editingProject = editId ? getProjectById(editId) : null;

  container.innerHTML = `
    <h1>案件管理</h1>

    ${renderProjectForm(editingProject)}

    <table>
      <thead>
        <tr>
          <th>廠商</th>
          <th>案名</th>
          <th>金額</th>
          <th>合約</th>
          <th>發票日期</th>
          <th>狀態</th>
          <th>操作</th>
        </tr>
      </thead>

      <tbody>
        ${
          data.length === 0
            ? `<tr><td colspan="7">尚無資料</td></tr>`
            : data.map(item => `
              <tr>
                <td>${item.vendor || ''}</td>
                <td>${item.projectName || ''}</td>
                <td>${item.amount || ''}</td>
                <td>${item.contractReceived || ''}</td>
                <td>${item.invoiceDate || ''}</td>
                <td>${item.status || ''}</td>
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

  bindProjectForm(loadPage, editingProject);

  document.querySelectorAll('.del-btn').forEach(btn => {
    btn.onclick = () => {
      deleteProject(btn.dataset.id);
      loadPage();
    };
  });

  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.onclick = () => {
      renderProjectList(container, btn.dataset.id);
    };
  });

  function loadPage() {
    renderProjectList(container);
  }
}