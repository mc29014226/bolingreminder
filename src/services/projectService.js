import {
  findAllProjects,
  findProjectById,
  createProject,
  editProject,
  removeProject
} from '../repositories/projectRepository.js';

export function getProjects() {
  return findAllProjects();
}

export function getProjectById(id) {
  return findProjectById(id);
}

export function addProject(data) {
  return createProject(data);
}

export function updateProject(id, data) {
  return editProject(id, data);
}

export function deleteProject(id) {
  return removeProject(id);
}