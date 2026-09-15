-- Gestão de Iluminação Pública - Database Schema

-- ============================================================================
-- TABELAS PRINCIPAIS
-- ============================================================================

-- Prefeituras (Multi-tenant)
CREATE TABLE IF NOT EXISTS prefeituras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(255) NOT NULL,
  cnpj VARCHAR(18) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefone VARCHAR(20),
  endereco TEXT,
  ativa BOOLEAN DEFAULT true,
  criada_em TIMESTAMP DEFAULT now(),
  atualizada_em TIMESTAMP DEFAULT now()
);

-- Usuários
CREATE TABLE IF NOT EXISTS usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prefeitura_id UUID NOT NULL REFERENCES prefeituras(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  nome VARCHAR(255) NOT NULL,
  papel VARCHAR(50) NOT NULL DEFAULT 'atendente', -- 'master_admin', 'admin', 'supervisor', 'atendente', 'equipe_campo'
  ativo BOOLEAN DEFAULT true,
  criado_em TIMESTAMP DEFAULT now(),
  atualizado_em TIMESTAMP DEFAULT now(),
  UNIQUE(prefeitura_id, email)
);

-- Pontos de Censo (PLAQUETA - identificador único)
CREATE TABLE IF NOT EXISTS pontos_censo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prefeitura_id UUID NOT NULL REFERENCES prefeituras(id) ON DELETE CASCADE,
  plaqueta VARCHAR(50) NOT NULL, -- Identificador único (ex: PL-001)
  endereco TEXT NOT NULL,
  bairro VARCHAR(100) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  tipo_luminaria VARCHAR(100), -- LED, Vapor Sódio, Mercúrio, etc
  potencia_w INTEGER, -- Potência em watts
  data_instalacao DATE,
  status VARCHAR(50) DEFAULT 'ativo', -- 'ativo', 'inativo', 'danificado', 'retirado'
  historico_versoes INTEGER DEFAULT 1, -- Número de modernizações
  criada_em TIMESTAMP DEFAULT now(),
  atualizada_em TIMESTAMP DEFAULT now(),
  UNIQUE(prefeitura_id, plaqueta),
  CREATE INDEX idx_pontos_census_bairro ON pontos_censo(prefeitura_id, bairro),
  CREATE INDEX idx_pontos_census_status ON pontos_censo(prefeitura_id, status)
);

-- Atendimentos (Service Requests)
CREATE TABLE IF NOT EXISTS atendimentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prefeitura_id UUID NOT NULL REFERENCES prefeituras(id) ON DELETE CASCADE,
  ponto_censo_id UUID REFERENCES pontos_censo(id),
  numero_sequencial INTEGER, -- Número amigável (ATD-001)
  descricao TEXT NOT NULL,
  endereco TEXT,
  bairro VARCHAR(100),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  status VARCHAR(50) DEFAULT 'Novo', -- 'Novo', 'Em análise', 'Aguardando despacho', 'Despachado', 'Em execução', 'Concluído'
  prioridade VARCHAR(20) DEFAULT 'normal', -- 'baixa', 'normal', 'alta', 'urgente'
  tipo VARCHAR(100), -- 'Falha', 'Manutenção', 'Modernização', etc
  contato_nome VARCHAR(255),
  contato_telefone VARCHAR(20),
  contato_email VARCHAR(255),
  observacoes TEXT,
  data_criacao TIMESTAMP DEFAULT now(),
  data_prevista_conclusao DATE,
  data_conclusao TIMESTAMP,
  criado_por UUID REFERENCES usuarios(id),
  atualizado_em TIMESTAMP DEFAULT now(),
  CREATE INDEX idx_atendimentos_status ON atendimentos(prefeitura_id, status),
  CREATE INDEX idx_atendimentos_bairro ON atendimentos(prefeitura_id, bairro),
  CREATE INDEX idx_atendimentos_data ON atendimentos(prefeitura_id, data_criacao)
);

-- Equipes
CREATE TABLE IF NOT EXISTS equipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prefeitura_id UUID NOT NULL REFERENCES prefeituras(id) ON DELETE CASCADE,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  ativa BOOLEAN DEFAULT true,
  criada_em TIMESTAMP DEFAULT now(),
  atualizada_em TIMESTAMP DEFAULT now(),
  UNIQUE(prefeitura_id, nome)
);

-- Membros da Equipe
CREATE TABLE IF NOT EXISTS membros_equipe (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  equipe_id UUID NOT NULL REFERENCES equipes(id) ON DELETE CASCADE,
  usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  funcao VARCHAR(100),
  criado_em TIMESTAMP DEFAULT now(),
  UNIQUE(equipe_id, usuario_id)
);

-- Despachos
CREATE TABLE IF NOT EXISTS despachos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prefeitura_id UUID NOT NULL REFERENCES prefeituras(id) ON DELETE CASCADE,
  numero_sequencial INTEGER,
  equipe_id UUID NOT NULL REFERENCES equipes(id),
  data_despacho DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'Aguardando', -- 'Aguardando', 'Em Rota', 'Iniciado', 'Concluído'
  hora_saida TIME,
  hora_prevista_retorno TIME,
  hora_retorno_real TIME,
  observacoes TEXT,
  criado_por UUID REFERENCES usuarios(id),
  criado_em TIMESTAMP DEFAULT now(),
  atualizado_em TIMESTAMP DEFAULT now(),
  CREATE INDEX idx_despachos_equipe ON despachos(equipe_id, data_despacho),
  CREATE INDEX idx_despachos_status ON despachos(prefeitura_id, status)
);

-- Itens do Despacho (Atendimentos associados)
CREATE TABLE IF NOT EXISTS despacho_itens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  despacho_id UUID NOT NULL REFERENCES despachos(id) ON DELETE CASCADE,
  atendimento_id UUID NOT NULL REFERENCES atendimentos(id),
  ordem INTEGER,
  status_execucao VARCHAR(50) DEFAULT 'Pendente', -- 'Pendente', 'Iniciado', 'Concluído'
  observacoes TEXT,
  foto_url VARCHAR(500),
  criado_em TIMESTAMP DEFAULT now(),
  UNIQUE(despacho_id, atendimento_id)
);

-- Modernizações
CREATE TABLE IF NOT EXISTS modernizacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prefeitura_id UUID NOT NULL REFERENCES prefeituras(id) ON DELETE CASCADE,
  ponto_censo_id UUID NOT NULL REFERENCES pontos_censo(id),
  tipo VARCHAR(100) NOT NULL, -- 'Substituição LED', 'Controlador Inteligente', 'Sensor Movimento'
  status VARCHAR(50) DEFAULT 'Planejado', -- 'Planejado', 'Orçado', 'Contratado', 'Em Execução', 'Concluído'
  data_planejada DATE,
  data_conclusao DATE,
  custo_estimado DECIMAL(12, 2),
  custo_real DECIMAL(12, 2),
  economia_kwh DECIMAL(10, 2), -- Economia de energia prevista
  duracao_dias INTEGER,
  observacoes TEXT,
  criada_em TIMESTAMP DEFAULT now(),
  atualizada_em TIMESTAMP DEFAULT now(),
  CREATE INDEX idx_modernizacoes_status ON modernizacoes(prefeitura_id, status),
  CREATE INDEX idx_modernizacoes_data ON modernizacoes(prefeitura_id, data_conclusao)
);

-- Histórico de Alterações (Auditoria)
CREATE TABLE IF NOT EXISTS historico_alteracoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prefeitura_id UUID NOT NULL REFERENCES prefeituras(id) ON DELETE CASCADE,
  tabela_afetada VARCHAR(100) NOT NULL,
  registro_id UUID NOT NULL,
  tipo_alteracao VARCHAR(20) NOT NULL, -- 'INSERT', 'UPDATE', 'DELETE'
  dados_anteriores JSONB,
  dados_novos JSONB,
  usuario_id UUID REFERENCES usuarios(id),
  criado_em TIMESTAMP DEFAULT now(),
  CREATE INDEX idx_historico_tabela ON historico_alteracoes(tabela_afetada, registro_id),
  CREATE INDEX idx_historico_data ON historico_alteracoes(criado_em)
);

-- Versões de Pontos Censo (Histórico de modernizações)
CREATE TABLE IF NOT EXISTS versoes_ponto_censo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ponto_censo_id UUID NOT NULL REFERENCES pontos_censo(id),
  versao INTEGER NOT NULL,
  tipo_luminaria_anterior VARCHAR(100),
  tipo_luminaria_novo VARCHAR(100),
  potencia_anterior INTEGER,
  potencia_nova INTEGER,
  data_alteracao DATE NOT NULL,
  tipo_intervencao VARCHAR(100), -- 'Modernização', 'Manutenção', 'Reparo'
  reservico BOOLEAN DEFAULT false, -- Se foi necessário reintervenção
  observacoes TEXT,
  criada_em TIMESTAMP DEFAULT now(),
  UNIQUE(ponto_censo_id, versao)
);

-- Indicadores/KPIs (Cache para performance)
CREATE TABLE IF NOT EXISTS indicadores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prefeitura_id UUID NOT NULL REFERENCES prefeituras(id) ON DELETE CASCADE,
  mes_referencia DATE NOT NULL,
  total_atendimentos INTEGER DEFAULT 0,
  atendimentos_novo INTEGER DEFAULT 0,
  atendimentos_concluido INTEGER DEFAULT 0,
  tempo_medio_dias DECIMAL(5, 2) DEFAULT 0,
  taxa_resolucao DECIMAL(5, 2) DEFAULT 0, -- Percentual
  satisfacao_media DECIMAL(3, 2) DEFAULT 0, -- 1.0 a 5.0
  economia_kwh DECIMAL(12, 2) DEFAULT 0,
  custo_evitado DECIMAL(12, 2) DEFAULT 0,
  pontos_modernizados INTEGER DEFAULT 0,
  atualizado_em TIMESTAMP DEFAULT now(),
  UNIQUE(prefeitura_id, mes_referencia)
);

-- ============================================================================
-- EXTENSÕES E CONFIGURAÇÕES
-- ============================================================================

-- Habilitar UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Habilitar tipos JSONB para auditoria
CREATE EXTENSION IF NOT EXISTS "json";

-- ============================================================================
-- VIEWS (Para facilitar queries comuns)
-- ============================================================================

-- Vista: Atendimentos com informações completas
CREATE OR REPLACE VIEW v_atendimentos_completo AS
SELECT
  a.id,
  a.prefeitura_id,
  a.numero_sequencial,
  a.descricao,
  a.endereco,
  a.bairro,
  a.status,
  a.prioridade,
  a.data_criacao,
  a.data_conclusao,
  pc.plaqueta,
  u.nome AS criado_por_nome,
  p.nome AS prefeitura_nome
FROM atendimentos a
LEFT JOIN pontos_censo pc ON a.ponto_censo_id = pc.id
LEFT JOIN usuarios u ON a.criado_por = u.id
LEFT JOIN prefeituras p ON a.prefeitura_id = p.id;

-- Vista: Despachos com detalhes de equipe
CREATE OR REPLACE VIEW v_despachos_completo AS
SELECT
  d.id,
  d.numero_sequencial,
  d.prefeitura_id,
  d.data_despacho,
  d.status,
  e.nome AS equipe_nome,
  COUNT(di.id) AS total_itens,
  COUNT(CASE WHEN di.status_execucao = 'Concluído' THEN 1 END) AS itens_concluidos,
  p.nome AS prefeitura_nome
FROM despachos d
LEFT JOIN equipes e ON d.equipe_id = e.id
LEFT JOIN despacho_itens di ON d.id = di.despacho_id
LEFT JOIN prefeituras p ON d.prefeitura_id = p.id
GROUP BY d.id, e.nome, p.nome;

-- Vista: Modernizações com economia total
CREATE OR REPLACE VIEW v_modernizacoes_resumo AS
SELECT
  prefeitura_id,
  status,
  COUNT(*) AS total,
  SUM(economia_kwh) AS economia_total_kwh,
  SUM(custo_real) AS custo_total_realizado,
  SUM(CASE WHEN data_conclusao IS NOT NULL THEN 1 ELSE 0 END) AS concluidas
FROM modernizacoes
GROUP BY prefeitura_id, status;

-- ============================================================================
-- POLÍTICAS DE SEGURANÇA (Row Level Security)
-- ============================================================================

-- Habilitar RLS em tabelas críticas
ALTER TABLE prefeituras ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE atendimentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE despachos ENABLE ROW LEVEL SECURITY;

-- Política: Usuários só veem dados da sua prefeitura
CREATE POLICY "Usuários acessam apenas sua prefeitura" ON atendimentos
  FOR SELECT USING (
    prefeitura_id IN (
      SELECT prefeitura_id FROM usuarios
      WHERE id = auth.uid()
    )
  );

-- Política similar para outras tabelas...
-- (Implementar após configurar autenticação)

-- ============================================================================
-- DADOS DE EXEMPLO (Opcional - comentar em produção)
-- ============================================================================

-- INSERT INTO prefeituras (nome, cnpj, email, telefone)
-- VALUES ('Prefeitura de Exemplo', '12.345.678/0001-90', 'admin@prefeitura.com.br', '(11) 9999-9999');

-- INSERT INTO pontos_censo (prefeitura_id, plaqueta, endereco, bairro, tipo_luminaria, potencia_w)
-- SELECT id, 'PL-001', 'Rua das Flores, 123', 'Centro', 'LED', 100
-- FROM prefeituras WHERE cnpj = '12.345.678/0001-90';

-- ============================================================================
-- FUNÇÕES ÚTEIS
-- ============================================================================

-- Função: Calcular taxa de resolução
CREATE OR REPLACE FUNCTION calcular_taxa_resolucao(prefeitura_id UUID, mes DATE)
RETURNS DECIMAL AS $$
DECLARE
  total_atendimentos INTEGER;
  atendimentos_concluidos INTEGER;
BEGIN
  SELECT COUNT(*) INTO total_atendimentos
  FROM atendimentos
  WHERE prefeitura_id = $1
    AND DATE_TRUNC('month', data_criacao) = DATE_TRUNC('month', mes);

  SELECT COUNT(*) INTO atendimentos_concluidos
  FROM atendimentos
  WHERE prefeitura_id = $1
    AND status = 'Concluído'
    AND DATE_TRUNC('month', data_conclusao) = DATE_TRUNC('month', mes);

  IF total_atendimentos = 0 THEN
    RETURN 0;
  END IF;

  RETURN (atendimentos_concluidos::DECIMAL / total_atendimentos::DECIMAL) * 100;
END;
$$ LANGUAGE plpgsql;

-- Função: Atualizar versão de ponto de censo (trigger para modernizações)
CREATE OR REPLACE FUNCTION atualizar_versao_ponto_censo()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE pontos_censo
  SET historico_versoes = historico_versoes + 1,
      atualizada_em = now()
  WHERE id = NEW.ponto_censo_id;

  INSERT INTO versoes_ponto_censo (
    ponto_censo_id, versao, tipo_luminaria_novo, potencia_nova,
    data_alteracao, tipo_intervencao, observacoes
  )
  SELECT
    NEW.ponto_censo_id,
    (SELECT historico_versoes FROM pontos_censo WHERE id = NEW.ponto_censo_id),
    NULL, NULL,
    CURRENT_DATE,
    NEW.tipo,
    NEW.observacoes
  WHERE NEW.status = 'Concluído';

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Executar ao concluir modernização
CREATE TRIGGER trg_modernizacao_concluida
AFTER UPDATE ON modernizacoes
FOR EACH ROW
WHEN (NEW.status = 'Concluído' AND OLD.status != 'Concluído')
EXECUTE FUNCTION atualizar_versao_ponto_censo();
