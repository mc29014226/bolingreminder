export async function getDashboardStats() {
  return {
    pendingCheck: 0,
    pendingInvoice: 0,
    unpaidInvoices: 0,
    monthAmount: 0,
    yearAmount: 0
  };
}