import { APP_CONFIG } from '../config.js';

import {
  getCollection,
  addItem,
  updateItem,
  deleteItem,
  getItemById
} from '../data/localStorageClient.js';

import { supabase } from '../data/supabaseClient.js';

const KEY = 'vendors_data';
const TABLE = 'vendors';

export async function findAllVendors() {
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

export async function findVendorById(id) {
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

export async function createVendor(data) {
  if (APP_CONFIG.dataMode === 'supabase' && supabase) {
    return await supabase.from(TABLE).insert([data]);
  }

  return addItem(KEY, data);
}

export async function editVendor(id, data) {
  if (APP_CONFIG.dataMode === 'supabase' && supabase) {
    return await supabase
      .from(TABLE)
      .update(data)
      .eq('id', id);
  }

  return updateItem(KEY, id, data);
}

export async function removeVendor(id) {
  if (APP_CONFIG.dataMode === 'supabase' && supabase) {
    return await supabase
      .from(TABLE)
      .delete()
      .eq('id', id);
  }

  return deleteItem(KEY, id);
}