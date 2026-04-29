import { getInvoices } from '../services/invoiceService.js';
import {
  STATUS_COLOR_CLASS,
  toRocYear,
  getYearNumber,
  getMonthNumber
} from '../utils/schedule.js';

function getAvailableYears(invoices) {
  const years = invoices
    .map(item => getYearNumber(item.invoiceDate))
    .filter(Boolean);

  return [...new Set(years)].sort((a, b) => b - a);
}

export async function renderScheduleList(
  container,
  selectedYear = null
) {
  const invoices = await getInvoices();

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const years = getAvailableYears(invoices);

  const currentYear =
    selectedYear || years[0] || new Date().getFullYear();

  const filteredInvoices = invoices.filter(item => {
    return getYearNumber(item.invoiceDate) === currentYear;
  });

  container.innerHTML = `
    <h1>發票時程表</h1>

    <div class="toolbar">
      <label>年度：</label>

      <select id="yearSelect">
        ${
          years.length === 0
            ? `<option value="${currentYear}">
                ${toRocYear(currentYear)}年
              </option>`
            : years.map(year => `
              <option
                value="${year}"
                ${year === currentYear ? 'selected' : ''}
              >
                ${toRocYear(year)}年
              </option>
            `).join('')
        }
      </select>
    </div>

    <div class="legend">
      <span><b class="dot status-done"></b>已收款</span>
      <span><b class="dot status-invoice"></b>未收款</span>
    </div>

    <div class="table-scroll">
      <table class="schedule-table">
        <thead>
          <tr>
            <th>項次</th>
            <th>買受人</th>
            <th>統編</th>
            <th>服務品名</th>
            <th>總計</th>
            ${months.map(month => `<th>${month}月</th>`).join('')}
          </tr>
        </thead>

        <tbody>
          ${
            filteredInvoices.length === 0
              ? `<tr><td colspan="17">此年度尚無資料</td></tr>`
              : filteredInvoices.map((item, index) => {
                  const invoiceMonth =
                    getMonthNumber(item.invoiceDate);

                  const colorClass =
                    item.isPaid === '已收款'
                      ? STATUS_COLOR_CLASS['已結案']
                      : STATUS_COLOR_CLASS['待開發票'];

                  return `
                    <tr>
                      <td>${index + 1}</td>
                      <td>${item.buyerName || ''}</td>
                      <td>${item.taxId || ''}</td>
                      <td>${item.serviceName || ''}</td>
                      <td>${item.totalAmount || ''}</td>

                      ${months.map(month => `
                        <td class="${
                          month === invoiceMonth
                            ? colorClass
                            : ''
                        }">
                          ${
                            month === invoiceMonth
                              ? `${item.invoiceNumber || ''}`
                              : ''
                          }
                        </td>
                      `).join('')}
                    </tr>
                  `;
                }).join('')
          }
        </tbody>
      </table>
    </div>
  `;

  document.querySelector('#yearSelect').onchange = (e) => {
    renderScheduleList(
      container,
      Number(e.target.value)
    );
  };
}