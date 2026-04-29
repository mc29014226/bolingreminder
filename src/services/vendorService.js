const KEY = 'vendors_data';

export function getVendors() {
  return JSON.parse(localStorage.getItem(KEY) || '[]');
}

export function saveVendors(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function addVendor(vendor) {
  const list = getVendors();

  list.push({
    id: Date.now(),
    createdAt: new Date().toISOString(),
    ...vendor
  });

  saveVendors(list);
}

export function updateVendor(id, newData) {
  const list = getVendors().map((item) => {
    if (String(item.id) === String(id)) {
      return {
        ...item,
        ...newData,
        updatedAt: new Date().toISOString()
      };
    }

    return item;
  });

  saveVendors(list);
}

export function deleteVendor(id) {
  const list = getVendors().filter((item) => String(item.id) !== String(id));
  saveVendors(list);
}

export function getVendorById(id) {
  return getVendors().find((item) => String(item.id) === String(id));
}