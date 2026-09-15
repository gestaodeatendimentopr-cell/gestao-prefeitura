/**
 * Script para executar schema.sql no Supabase
 * Uso: node scripts/setup-db.js
 */

const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://kqcewbzfjrcmqrxpygzw.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxY2V3YnpmanJjbXFyeHB5Z3p3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4OTQ3MDc4OCwiZXhwIjoyMTA1MDQ2Nzg4fQ.DwWjaIAo-4moApTxWd1t0y2R5ae3h2PmaHT2XyF1s0c';

async function executeSQL(sql) {
  try {
    console.log('🔄 Executando schema no Supabase...');

    const response = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        'apikey': SERVICE_ROLE_KEY,
      },
      body: JSON.stringify({
        query: sql
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Erro:', error);
      return false;
    }

    console.log('✅ Schema executado com sucesso!');
    return true;
  } catch (error) {
    console.error('❌ Erro na execução:', error.message);
    return false;
  }
}

async function main() {
  try {
    // Ler arquivo schema.sql
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    console.log('📦 Arquivo schema.sql carregado');
    console.log(`📊 Tamanho: ${(schema.length / 1024).toFixed(2)} KB`);

    // Executar
    const success = await executeSQL(schema);

    if (success) {
      console.log('\n✨ Banco de dados configurado com sucesso!');
      console.log('🎯 Próximos passos:');
      console.log('   1. npm run dev');
      console.log('   2. Abra http://localhost:3000');
      console.log('   3. Crie uma conta de teste');
      process.exit(0);
    } else {
      console.log('\n❌ Falha ao configurar banco de dados');
      process.exit(1);
    }
  } catch (error) {
    console.error('Erro fatal:', error);
    process.exit(1);
  }
}

main();
