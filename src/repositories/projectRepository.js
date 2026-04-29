import { APP_CONFIG } from '../config.js';

import {
  getCollection,
  addItem,
  updateItem,
  deleteItem,
  getItemById
} from '../data/localStorageClient.js';

import { supabase } from '../data/supabaseClient.js';

const KEY = 'projects_data';
const TABLE = 'projects';

/* 查全部 */
export async function findAllProjects() {
  if (APP_CONFIG.dataMode === 'supabase' && supabase) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error(error);
      return [];
    }

    return data;
  }

  return getCollection(KEY);
}

/* 查單筆 */
export async function findProjectById(id) {
  if (APP_CONFIG.dataMode === 'supabase' && supabase) {
    const { data } = await supabase
      .from(TABLE)
      .select('*')
      .eq('id', id)
      .single();

    return data;
  }

  return getItemById(KEY, id);
}

/* 新增 */
export async function createProject(data) {
  if (APP_CONFIG.dataMode === 'supabase' && supabase) {
    return await supabase.from(TABLE).insert([data]);
  }

  return addItem(KEY, data);
}

/* 修改 */
export async function editProject(id, data) {
  if (APP_CONFIG.dataMode === 'supabase' && supabase) {
    return await supabase
      .from(TABLE)
      .update(data)
      .eq('id', id);
  }

  return updateItem(KEY, id, data);
}

/* 刪除 */
export async function removeProject(id) {
  if (APP_CONFIG.dataMode === 'supabase' && supabase) {
    return await supabase
      .from(TABLE)
      .delete()
      .eq('id', id);
  }

  return deleteItem(KEY, id);
}