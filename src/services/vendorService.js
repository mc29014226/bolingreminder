import {
  findAllVendors,
  findVendorById,
  createVendor,
  editVendor,
  removeVendor
} from '../repositories/vendorRepository.js';

export async function getVendors() {
  return await findAllVendors();
}

export async function getVendorById(id) {
  return await findVendorById(id);
}

export async function addVendor(data) {
  return await createVendor(data);
}

export async function updateVendor(id, data) {
  return await editVendor(id, data);
}

export async function deleteVendor(id) {
  return await removeVendor(id);
}