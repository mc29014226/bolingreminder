const KEY = 'invoices_data';

export function getInvoices() {
  return JSON.parse(localStorage.getItem(KEY) || '[]');
}

export function saveInvoices(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function addInvoice(invoice) {
  const list = getInvoices();

  list.push({
    id: Date.now(),
    createdAt: new Date().toISOString(),
    ...invoice
  });

  saveInvoices(list);
}

export function updateInvoice(id, newData) {
  const list = getInvoices().map((item) => {
    if (String(item.id) === String(id)) {
      return {
        ...item,
        ...newData,
        updatedAt: new Date().toISOString()
      };
    }

    return item;
  });

  saveInvoices(list);
}

export function deleteInvoice(id) {
  const list = getInvoices().filter((item) => String(item.id) !== String(id));
  saveInvoices(list);
}

export function getInvoiceById(id) {
  return getInvoices().find((item) => String(item.id) === String(id));
}