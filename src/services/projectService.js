const KEY = 'projects_data';

export function getProjects() {
  return JSON.parse(localStorage.getItem(KEY) || '[]');
}

export function saveProjects(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function addProject(project) {
  const list = getProjects();

  list.push({
    id: Date.now(),
    createdAt: new Date().toISOString(),
    ...project
  });

  saveProjects(list);
}

export function updateProject(id, newData) {
  const list = getProjects().map((item) => {
    if (String(item.id) === String(id)) {
      return {
        ...item,
        ...newData,
        updatedAt: new Date().toISOString()
      };
    }

    return item;
  });

  saveProjects(list);
}

export function deleteProject(id) {
  const list = getProjects().filter((item) => String(item.id) !== String(id));
  saveProjects(list);
}

export function getProjectById(id) {
  return getProjects().find((item) => String(item.id) === String(id));
}