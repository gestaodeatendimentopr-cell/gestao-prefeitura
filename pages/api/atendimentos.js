import { supabase } from '../../lib/supabase';

/**
 * API Route: /api/atendimentos
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
 * GET /api/atendimentos
 * Listar atendimentos com filtros
 */
async function handleGet(req, res, token) {
  const { prefeitura_id, status, bairro, periodo = 'ultimos-30-dias' } = req.query;

  // Validar prefeitura_id
  if (!prefeitura_id) {
    return res.status(400).json({ error: 'prefeitura_id obrigatório' });
  }

  try {
    let query = supabase
      .from('atendimentos')
      .select('*')
      .eq('prefeitura_id', prefeitura_id);

    // Aplicar filtros
    if (status) {
      query = query.eq('status', status);
    }

    if (bairro) {
      query = query.ilike('bairro', `%${bairro}%`);
    }

    // Filtro de período
    const dataLimite = new Date();
    switch (periodo) {
      case 'ultimos-7-dias':
        dataLimite.setDate(dataLimite.getDate() - 7);
        break;
      case 'ultimos-30-dias':
        dataLimite.setMonth(dataLimite.getMonth() - 1);
        break;
      case 'ultimos-3-meses':
        dataLimite.setMonth(dataLimite.getMonth() - 3);
        break;
      case 'ultimo-ano':
        dataLimite.setFullYear(dataLimite.getFullYear() - 1);
        break;
    }

    query = query.gte('data_criacao', dataLimite.toISOString());

    // Ordenar por data descendente
    query = query.order('data_criacao', { ascending: false });

    const { data, error } = await query;

    if (error) throw error;

    return res.status(200).json({
      success: true,
      data,
      count: data.length,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Erro ao listar atendimentos',
      details: error.message,
    });
  }
}

/**
 * POST /api/atendimentos
 * Criar novo atendimento
 */
async function handlePost(req, res, token) {
  const { prefeitura_id, descricao, endereco, bairro, tipo, contato_nome, contato_telefone, contato_email } = req.body;

  // Validações
  if (!prefeitura_id || !descricao) {
    return res.status(400).json({
      error: 'Campos obrigatórios: prefeitura_id, descricao',
    });
  }

  try {
    // Obter o usuário autenticado
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    // Gerar número sequencial
    const { data: countData } = await supabase
      .from('atendimentos')
      .select('numero_sequencial', { count: 'exact' })
      .eq('prefeitura_id', prefeitura_id)
      .order('numero_sequencial', { ascending: false })
      .limit(1);

    const proximoNumero = (countData?.[0]?.numero_sequencial || 0) + 1;

    // Criar atendimento
    const { data, error } = await supabase
      .from('atendimentos')
      .insert([
        {
          prefeitura_id,
          numero_sequencial: proximoNumero,
          descricao,
          endereco: endereco || null,
          bairro: bairro || null,
          tipo: tipo || 'Geral',
          status: 'Novo',
          prioridade: 'normal',
          contato_nome,
          contato_telefone,
          contato_email,
          criado_por: user.id,
          data_criacao: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;

    return res.status(201).json({
      success: true,
      message: `Atendimento ATD-${String(proximoNumero).padStart(4, '0')} criado com sucesso`,
      data: data[0],
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Erro ao criar atendimento',
      details: error.message,
    });
  }
}
