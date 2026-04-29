import {
  getCollection,
  addItem,
  updateItem,
  deleteItem,
  getItemById
} from '../data/localStorageClient.js';

const KEY = 'projects_data';

export function findAllProjects() {
  return getCollection(KEY);
}

export function findProjectById(id) {
  return getItemById(KEY, id);
}

export function createProject(data) {
  return addItem(KEY, data);
}

export function editProject(id, data) {
  return updateItem(KEY, id, data);
}

export function removeProject(id) {
  return deleteItem(KEY, id);
}