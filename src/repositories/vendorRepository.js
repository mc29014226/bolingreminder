import {
  getCollection,
  addItem,
  updateItem,
  deleteItem,
  getItemById
} from '../data/localStorageClient.js';

const KEY = 'vendors_data';

export function findAllVendors() {
  return getCollection(KEY);
}

export function findVendorById(id) {
  return getItemById(KEY, id);
}

export function createVendor(data) {
  return addItem(KEY, data);
}

export function editVendor(id, data) {
  return updateItem(KEY, id, data);
}

export function removeVendor(id) {
  return deleteItem(KEY, id);
}