import {
  findAllProjects,
  findProjectById,
  createProject,
  editProject,
  removeProject
} from '../repositories/projectRepository.js';

export async function getProjects() {
  return await findAllProjects();
}

export async function getProjectById(id) {
  return await findProjectById(id);
}

export async function addProject(data) {
  return await createProject(data);
}

export async function updateProject(id, data) {
  return await editProject(id, data);
}

export async function deleteProject(id) {
  return await removeProject(id);
}