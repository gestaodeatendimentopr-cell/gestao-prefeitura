import { supabase } from '../../lib/supabase';

/**
 * API Route: /api/prefeituras
 * Métodos: GET (listar), POST (criar)
 */

export default async function handler(req, res) {
  // Verificar autenticação
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  try {
    if (req.method === 'GET') {
      return await handleGet(req, res, token);
    } else if (req.method === 'POST') {
      return await handlePost(req, res, token);
    } else {
      return res.status(405).json({ error: 'Método não permitido' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}

/**
 * GET /api/prefeituras
 * Listar prefeituras do usuário autenticado
 */
async function handleGet(req, res, token) {
  try {
    // Obter usuário autenticado
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    // Obter prefeituras do usuário
    const { data, error } = await supabase
      .from('usuarios')
      .select('prefeitura_id, prefeituras(*)')
      .eq('id', user.id);

    if (error) throw error;

    // Extrair prefeituras
    const prefeituras = data.map(u => u.prefeituras).filter(p => p);

    return res.status(200).json({
      success: true,
      data: prefeituras,
      count: prefeituras.length,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Erro ao listar prefeituras',
      details: error.message,
    });
  }
}

/**
 * POST /api/prefeituras
 * Criar nova prefeitura (Master Admin apenas)
 */
async function handlePost(req, res, token) {
  const { nome, cnpj, email, telefone, endereco } = req.body;

  // Validações
  if (!nome || !cnpj) {
    return res.status(400).json({
      error: 'Campos obrigatórios: nome, cnpj',
    });
  }

  try {
    // Obter usuário autenticado
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    // Verificar se é master admin
    const { data: userRole } = await supabase
      .from('usuarios')
      .select('papel')
      .eq('id', user.id)
      .single();

    if (userRole?.papel !== 'master_admin') {
      return res.status(403).json({ error: 'Acesso negado. Apenas Master Admin pode criar prefeituras.' });
    }

    // Criar prefeitura
    const { data, error } = await supabase
      .from('prefeituras')
      .insert([
        {
          nome,
          cnpj,
          email: email || null,
          telefone: telefone || null,
          endereco: endereco || null,
          ativa: true,
        },
      ])
      .select();

    if (error) throw error;

    const prefeitura = data[0];

    // Criar usuário administrador da prefeitura
    const { error: userInsertError } = await supabase
      .from('usuarios')
      .insert([
        {
          prefeitura_id: prefeitura.id,
          email: email,
          nome: nome,
          papel: 'admin',
          ativo: true,
        },
      ]);

    if (userInsertError) throw userInsertError;

    return res.status(201).json({
      success: true,
      message: `Prefeitura "${nome}" criada com sucesso`,
      data: prefeitura,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Erro ao criar prefeitura',
      details: error.message,
    });
  }
}
