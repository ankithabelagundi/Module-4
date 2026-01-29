import { supabase } from '../config/supabase.js';


export const insertUser = async (data) => {
return await supabase.from('users').insert(data).select();
};


export const fetchUsers = async () => {
return await supabase.from('users').select('*');
};


export const fetchUserById = async (id) => {
return await supabase.from('users').select('*').eq('id', id).single();
};


export const updateUserById = async (id, data) => {
return await supabase.from('users').update(data).eq('id', id).select();
};


export const deleteUserById = async (id) => {
return await supabase.from('users').delete().eq('id', id);
};