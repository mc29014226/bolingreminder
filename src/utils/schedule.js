export const STATUS_COLOR_CLASS = {
  '已結案': 'status-done',
  '待確認': 'status-check',
  '待開發票': 'status-invoice',
  '履約中': 'status-check',
};

export function toRocYear(year) {
  return Number(year) - 1911;
}

export function getYearNumber(dateString) {
  if (!dateString) return null;

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return null;

  return date.getFullYear();
}

export function getMonthNumber(dateString) {
  if (!dateString) return null;

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return null;

  return date.getMonth() + 1;
}

export function getInvoiceMonths(project, selectedYear) {
  const startYear = getYearNumber(project.invoiceDate);
  const startMonth = getMonthNumber(project.invoiceDate);

  if (!startYear || !startMonth) return [];

  const cycle = project.invoiceCycle || '一次性';

  if (cycle === '一次性') {
    return startYear === selectedYear ? [startMonth] : [];
  }

  if (cycle === '每月') {
    if (selectedYear < startYear) return [];

    const firstMonth = selectedYear === startYear ? startMonth : 1;
    return Array.from({ length: 12 - firstMonth + 1 }, (_, i) => firstMonth + i);
  }

  if (cycle === '每季') {
    if (selectedYear < startYear) return [];

    const months = [];

    for (let year = startYear; year <= selectedYear; year++) {
      const firstMonth = year === startYear ? startMonth : 1;

      for (let month = firstMonth; month <= 12; month += 3) {
        if (year === selectedYear) {
          months.push(month);
        }
      }
    }

    return months;
  }

  if (cycle === '每年') {
    if (selectedYear < startYear) return [];
    return [startMonth];
  }

  return [];
}

export function getScheduleCellText(project, month, selectedYear) {
  const startYear = getYearNumber(project.invoiceDate);
  const startMonth = getMonthNumber(project.invoiceDate);

  if (!startYear || !startMonth) return '';

  if (month === startMonth && selectedYear === startYear) {
    const [, monthText, dayText] = project.invoiceDate.split('-');
    return `${Number(monthText)}/${Number(dayText)}開立`;
  }

  return '應開立';
}