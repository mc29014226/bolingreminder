import { APP_CONFIG } from '../config.js';

import {
  getCollection,
  addItem,
  updateItem,
  deleteItem,
  getItemById
} from '../data/localStorageClient.js';

import { supabase } from '../data/supabaseClient.js';

const KEY = 'invoices_data';
const TABLE = 'invoices';

export async function findAllInvoices() {
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

export async function findInvoiceById(id) {
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

export async function createInvoice(data) {
  if (APP_CONFIG.dataMode === 'supabase' && supabase) {
    return await supabase.from(TABLE).insert([data]);
  }

  return addItem(KEY, data);
}

export async function editInvoice(id, data) {
  if (APP_CONFIG.dataMode === 'supabase' && supabase) {
    return await supabase
      .from(TABLE)
      .update(data)
      .eq('id', id);
  }

  return updateItem(KEY, id, data);
}

export async function removeInvoice(id) {
  if (APP_CONFIG.dataMode === 'supabase' && supabase) {
    return await supabase
      .from(TABLE)
      .delete()
      .eq('id', id);
  }

  return deleteItem(KEY, id);
}