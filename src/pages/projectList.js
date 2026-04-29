import {
  getProjects,
  deleteProject,
  getProjectById
} from '../services/projectService.js';

import {
  renderProjectForm,
  bindProjectForm
} from '../components/ProjectForm.js';

export async function renderProjectList(container, editId = null) {
  const data = await getProjects();
  const editingProject = editId
    ? await getProjectById(editId)
    : null;

  const formHtml = await renderProjectForm(editingProject);

  container.innerHTML = `
    <h1>案件管理</h1>

    ${formHtml}

    <table>
      <thead>
        <tr>
          <th>廠商</th>
          <th>案名</th>
          <th>金額</th>
          <th>操作</th>
        </tr>
      </thead>

      <tbody>
        ${
          data.length === 0
            ? `<tr><td colspan="4">尚無資料</td></tr>`
            : data.map(item => `
              <tr>
                <td>${item.vendor || ''}</td>
                <td>${item.projectName || ''}</td>
                <td>${item.amount || ''}</td>
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
    btn.onclick = async () => {
      await deleteProject(btn.dataset.id);
      loadPage();
    };
  });

  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.onclick = () => renderProjectList(container, btn.dataset.id);
  });

  async function loadPage() {
    await renderProjectList(container);
  }
}