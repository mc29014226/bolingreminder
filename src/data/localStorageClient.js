export function getCollection(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
}

export function saveCollection(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function addItem(key, item) {
  const list = getCollection(key);

  const newItem = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    ...item
  };

  list.push(newItem);
  saveCollection(key, list);

  return newItem;
}

export function updateItem(key, id, newData) {
  const list = getCollection(key).map((item) => {
    if (String(item.id) === String(id)) {
      return {
        ...item,
        ...newData,
        updatedAt: new Date().toISOString()
      };
    }

    return item;
  });

  saveCollection(key, list);
}

export function deleteItem(key, id) {
  const list = getCollection(key).filter(
    (item) => String(item.id) !== String(id)
  );

  saveCollection(key, list);
}

export function getItemById(key, id) {
  return getCollection(key).find(
    (item) => String(item.id) === String(id)
  );
}