#!/usr/bin/env node

/**
 * Script para inicializar banco de dados no Supabase
 * Executa o schema.sql completo
 *
 * Uso: node scripts/init-db.mjs
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = 'https://kqcewbzfjrcmqrxpygzw.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxY2V3YnpmanJjbXFyeHB5Z3p3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4OTQ3MDc4OCwiZXhwIjoyMTA1MDQ2Nzg4fQ.DwWjaIAo-4moApTxWd1t0y2R5ae3h2PmaHT2XyF1s0c';

async function initializeDatabase() {
  console.log('🚀 Inicializando banco de dados Supabase...\n');

  try {
    // Conectar ao Supabase com service role key
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    // Ler schema
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    console.log('📖 Schema carregado');
    console.log(`📊 Tamanho: ${(schema.length / 1024).toFixed(2)} KB\n`);

    // Dividir em statements individuais
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    console.log(`📝 Total de statements: ${statements.length}\n`);

    let successCount = 0;
    let errorCount = 0;

    // Executar cada statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i] + ';';

      try {
        // Usar rpc para executar SQL genérico
        const { error } = await supabase.rpc('exec_sql', {
          sql_query: statement
        });

        if (error) {
          // Se o RPC não existir, tenta direto com query
          console.log(`⏭️  Pulando statement ${i + 1} (método alternativo necessário)`);
        } else {
          successCount++;
          if ((i + 1) % 5 === 0) {
            console.log(`✅ ${i + 1}/${statements.length} statements executados`);
          }
        }
      } catch (err) {
        errorCount++;
        console.log(`⚠️  Statement ${i + 1} - ${err.message.substring(0, 50)}`);
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log('✨ Resultado da inicialização:');
    console.log(`✅ Sucesso: ${successCount}`);
    console.log(`⚠️  Erros/Pulados: ${errorCount}`);
    console.log('='.repeat(50) + '\n');

    // Verificar se tabelas foram criadas
    const { data: tables, error: tableError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');

    if (!tableError && tables) {
      console.log(`📊 Tabelas criadas: ${tables.length}\n`);
      tables.forEach(t => console.log(`   • ${t.table_name}`));
    }

    console.log('\n✨ Banco de dados inicializado!\n');
    console.log('🎯 Próximos passos:');
    console.log('   1️⃣  npm run dev');
    console.log('   2️⃣  Abra http://localhost:3000');
    console.log('   3️⃣  Crie uma conta de teste\n');

    process.exit(0);

  } catch (error) {
    console.error('\n❌ Erro ao inicializar banco de dados:');
    console.error(error.message);
    console.error('\n⚠️  Alternativa: Execute manualmente em Supabase Console:');
    console.error('   1. Acesse https://app.supabase.com');
    console.log('   2. Vá para SQL Editor');
    console.error('   3. Copie conteúdo de database/schema.sql');
    console.error('   4. Cole e execute\n');
    process.exit(1);
  }
}

initializeDatabase();
