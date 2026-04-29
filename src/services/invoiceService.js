import {
  findAllInvoices,
  findInvoiceById,
  createInvoice,
  editInvoice,
  removeInvoice
} from '../repositories/invoiceRepository.js';

export function getInvoices() {
  return findAllInvoices();
}

export function getInvoiceById(id) {
  return findInvoiceById(id);
}

export function addInvoice(data) {
  return createInvoice(data);
}

export function updateInvoice(id, data) {
  return editInvoice(id, data);
}

export function deleteInvoice(id) {
  return removeInvoice(id);
}