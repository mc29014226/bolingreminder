import {
  getCollection,
  addItem,
  updateItem,
  deleteItem,
  getItemById
} from '../data/localStorageClient.js';

const KEY = 'invoices_data';

export function findAllInvoices() {
  return getCollection(KEY);
}

export function findInvoiceById(id) {
  return getItemById(KEY, id);
}

export function createInvoice(data) {
  return addItem(KEY, data);
}

export function editInvoice(id, data) {
  return updateItem(KEY, id, data);
}

export function removeInvoice(id) {
  return deleteItem(KEY, id);
}