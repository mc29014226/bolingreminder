export const STATUS_COLOR_CLASS = {
  '已結案': 'status-done',
  '待確認': 'status-check',
  '待開發票': 'status-invoice',
  '履約中': 'status-check',
};

export function getMonthNumber(dateString) {
  if (!dateString) return null;

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return null;

  return date.getMonth() + 1;
}

export function getInvoiceMonths(project) {
  const startMonth = getMonthNumber(project.invoiceDate);
  if (!startMonth) return [];

  const cycle = project.invoiceCycle || '一次性';

  if (cycle === '一次性') return [startMonth];

  if (cycle === '每月') {
    return Array.from({ length: 12 - startMonth + 1 }, (_, i) => startMonth + i);
  }

  if (cycle === '每季') {
    return [startMonth, startMonth + 3, startMonth + 6, startMonth + 9]
      .filter((month) => month <= 12);
  }

  if (cycle === '每年') return [startMonth];

  return [startMonth];
}

export function getScheduleCellText(project, month) {
  const startMonth = getMonthNumber(project.invoiceDate);

  if (month !== startMonth) return '';

  if (!project.invoiceDate) return '';

  const [, monthText, dayText] = project.invoiceDate.split('-');

  return `${Number(monthText)}/${Number(dayText)}開立`;
}