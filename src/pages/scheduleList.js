import { getProjects } from '../services/projectService.js';
import {
  STATUS_COLOR_CLASS,
  getInvoiceMonths,
  getScheduleCellText
} from '../utils/schedule.js';

export function renderScheduleList(container) {
  const projects = getProjects();
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  container.innerHTML = `
    <h1>發票時程表</h1>

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
            <th>發票開立週期</th>
            ${months.map(month => `<th>${month}月</th>`).join('')}
          </tr>
        </thead>

        <tbody>
          ${
            projects.length === 0
              ? `<tr><td colspan="18">尚無案件資料</td></tr>`
              : projects.map((project, index) => {
                  const invoiceMonths = getInvoiceMonths(project);
                  const colorClass = STATUS_COLOR_CLASS[project.status] || 'status-check';

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
                            ${active ? getScheduleCellText(project, month) : ''}
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
}