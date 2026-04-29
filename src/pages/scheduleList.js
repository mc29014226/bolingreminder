import { getProjects } from '../services/projectService.js';
import {
  STATUS_COLOR_CLASS,
  getInvoiceMonths,
  getScheduleCellText,
  toRocYear
} from '../utils/schedule.js';

export function renderScheduleList(container, selectedYear = new Date().getFullYear()) {
  const projects = getProjects();
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  container.innerHTML = `
    <h1>發票時程表</h1>

    <div class="toolbar">
      <label>年度：</label>

      <select id="yearSelect">
        ${[2024, 2025, 2026, 2027, 2028].map(year => `
          <option value="${year}" ${year === selectedYear ? 'selected' : ''}>
            ${toRocYear(year)}年
          </option>
        `).join('')}
      </select>
    </div>

    <div class="legend">
      <span><b class="dot status-done"></b>已結案</span>
      <span><b class="dot status-check"></b>待確認</span>
      <span><b class="dot status-invoice"></b>待開發票</span>
    </div>

    <div class="table-scroll">
      <table class="schedule-table">
        <thead>
          <tr>
            <th>項次</th>
            <th>廠商名稱</th>
            <th>統一編號</th>
            <th>案名</th>
            <th>總金額</th>
            <th>週期</th>
            ${months.map(month => `<th>${month}月</th>`).join('')}
          </tr>
        </thead>

        <tbody>
          ${
            projects.length === 0
              ? `<tr><td colspan="18">尚無案件資料</td></tr>`
              : projects.map((project, index) => {
                  const invoiceMonths = getInvoiceMonths(project, selectedYear);
                  const colorClass =
                    STATUS_COLOR_CLASS[project.status] || 'status-check';

                  return `
                    <tr>
                      <td>${index + 1}</td>
                      <td>${project.vendor || ''}</td>
                      <td>${project.taxId || ''}</td>
                      <td>${project.projectName || ''}</td>
                      <td>${project.amount || ''}</td>
                      <td>${project.invoiceCycle || ''}</td>

                      ${months.map(month => {
                        const active = invoiceMonths.includes(month);

                        return `
                          <td class="${active ? colorClass : ''}">
                            ${active
                              ? getScheduleCellText(project, month, selectedYear)
                              : ''}
                          </td>
                        `;
                      }).join('')}
                    </tr>
                  `;
                }).join('')
          }
        </tbody>
      </table>
    </div>
  `;

  document.querySelector('#yearSelect').onchange = (e) => {
    renderScheduleList(container, Number(e.target.value));
  };
}