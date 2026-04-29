import {
  findAllVendors,
  findVendorById,
  createVendor,
  editVendor,
  removeVendor
} from '../repositories/vendorRepository.js';

export function getVendors() {
  return findAllVendors();
}

export function getVendorById(id) {
  return findVendorById(id);
}

export function addVendor(data) {
  return createVendor(data);
}

export function updateVendor(id, data) {
  return editVendor(id, data);
}

export function deleteVendor(id) {
  return removeVendor(id);
}