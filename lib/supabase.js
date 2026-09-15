// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Helper functions for database operations
export const getPrefeitura = async (id) => {
  const { data, error } = await supabase
    .from('prefeituras')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const getAtendimentos = async (prefeitturaId, filters = {}) => {
  let query = supabase
    .from('atendimentos')
    .select(
      `
      *,
      plaquetas(*)
    `
    )
    .eq('prefeitura_id', prefeitturaId);

  if (filters.status) {
    query = query.eq('status', filters.status);
  }

  if (filters.tipo_problema) {
    query = query.eq('tipo_problema', filters.tipo_problema);
  }

  const { data, error } = await query.order('data_criacao', { ascending: false });

  if (error) throw error;
  return data;
};

export const createAtendimento = async (atendimento) => {
  const { data, error } = await supabase
    .from('atendimentos')
    .insert([atendimento])
    .select();

  if (error) throw error;
  return data[0];
};

export const getPlaqueta = async (prefeitturaId, numero_plaqueta) => {
  const { data, error } = await supabase
    .from('base_censo')
    .select('*')
    .eq('prefeitura_id', prefeitturaId)
    .eq('numero_plaqueta', numero_plaqueta)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    throw error;
  }
  return data;
};

export const updatePlaquetaModernizacao = async (prefeitturaId, plaques_id, novaInfo) => {
  const { data, error } = await supabase
    .from('base_censo')
    .update(novaInfo)
    .eq('id', plaques_id)
    .eq('prefeitura_id', prefeitturaId)
    .select();

  if (error) throw error;
  return data[0];
};

export const getModernizacoes = async (plaques_id) => {
  const { data, error } = await supabase
    .from('modernizacoes')
    .select('*')
    .eq('plaqueta_id', plaques_id)
    .order('data_modernizacao', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const createModernizacao = async (modernizacao) => {
  const { data, error } = await supabase
    .from('modernizacoes')
    .insert([modernizacao])
    .select();

  if (error) throw error;
  return data[0];
};
