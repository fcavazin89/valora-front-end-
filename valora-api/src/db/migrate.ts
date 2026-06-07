import 'dotenv/config';
import db from './connection';

async function migrate() {
  const rollback = process.argv.includes('--rollback');

  if (rollback) {
    console.log('⏪ Revertendo migrações...');
    await db.schema.dropTableIfExists('saque_comercio');
    await db.schema.dropTableIfExists('recarga');
    await db.schema.dropTableIfExists('transacao');
    await db.schema.dropTableIfExists('credenciamento');
    await db.schema.dropTableIfExists('cartao');
    await db.schema.dropTableIfExists('comercio');
    await db.schema.dropTableIfExists('beneficiario');
    await db.schema.dropTableIfExists('programa');
    await db.schema.dropTableIfExists('emissor');
    console.log('✅ Rollback concluído.');
    await db.destroy();
    return;
  }

  console.log('🚀 Executando migrações...');

  await db.schema.createTableIfNotExists('emissor', (t) => {
    t.increments('id_emissor');
    t.string('cnpj').unique().notNullable();
    t.string('razao_social').notNullable();
    t.string('nome_fantasia');
    t.string('tipo_emissor').notNullable();
    t.text('endereco').notNullable();
    t.string('telefone').notNullable();
    t.string('email').notNullable();
    t.string('status').defaultTo('ativo');
    t.datetime('data_cadastro').defaultTo(db.fn.now());
  });

  await db.schema.createTableIfNotExists('programa', (t) => {
    t.increments('id_programa');
    t.integer('id_emissor').notNullable().references('id_emissor').inTable('emissor').onDelete('RESTRICT');
    t.string('nome').notNullable();
    t.string('codigo_programa').unique().notNullable();
    t.text('descricao').notNullable();
    t.date('data_inicio').notNullable();
    t.date('data_fim');
    t.float('valor_base_mensal').defaultTo(0);
    t.string('periodicidade').defaultTo('mensal');
    t.integer('dia_credito').notNullable();
    t.integer('validade_cartao_meses').defaultTo(24);
    t.boolean('permite_saldo_negativo').defaultTo(false);
    t.float('limite_negativo').defaultTo(0);
    t.boolean('permite_estorno').defaultTo(false);
    t.string('status').defaultTo('ativo');
    t.datetime('created_at').defaultTo(db.fn.now());
    t.datetime('updated_at');
  });

  await db.schema.createTableIfNotExists('beneficiario', (t) => {
    t.increments('id_beneficiario');
    t.string('cpf').unique().notNullable();
    t.string('nome_completo').notNullable();
    t.date('data_nascimento').notNullable();
    t.string('sexo', 1);
    t.string('rg');
    t.string('orgao_expedidor');
    t.string('estado_civil');
    t.string('nome_mae').notNullable();
    t.string('nome_pai');
    t.text('endereco').notNullable();
    t.string('cep').notNullable();
    t.string('telefone').notNullable();
    t.string('email');
    t.string('status_beneficiario').defaultTo('ativo');
    t.datetime('data_cadastro').defaultTo(db.fn.now());
    t.datetime('data_inativacao');
  });

  await db.schema.createTableIfNotExists('comercio', (t) => {
    t.increments('id_comercio');
    t.string('cnpj').unique().notNullable();
    t.string('razao_social').notNullable();
    t.string('nome_fantasia').notNullable();
    t.string('cnae_principal').notNullable();
    t.string('categoria_comercio').notNullable();
    t.text('endereco').notNullable();
    t.string('cep').notNullable();
    t.string('telefone').notNullable();
    t.string('email').notNullable();
    t.string('responsavel_nome').notNullable();
    t.string('responsavel_cpf').notNullable();
    t.string('conta_bancaria_banco');
    t.string('conta_bancaria_agencia');
    t.string('conta_bancaria_numero');
    t.string('tipo_conta');
    t.string('status_comercio').defaultTo('pendente_analise');
    t.datetime('data_cadastro').defaultTo(db.fn.now());
    t.datetime('data_analise');
    t.text('observacoes');
  });

  await db.schema.createTableIfNotExists('cartao', (t) => {
    t.increments('id_cartao');
    t.string('numero_cartao').unique().notNullable();
    t.integer('id_emissor').notNullable().references('id_emissor').inTable('emissor').onDelete('RESTRICT');
    t.integer('id_programa').notNullable().references('id_programa').inTable('programa').onDelete('RESTRICT');
    t.integer('id_beneficiario').notNullable().references('id_beneficiario').inTable('beneficiario').onDelete('RESTRICT');
    t.string('tipo_cartao').defaultTo('fisico');
    t.string('bandeira');
    t.date('validade').notNullable();
    t.string('cvv').notNullable();
    t.float('saldo_atual').defaultTo(0);
    t.float('saldo_bloqueado').defaultTo(0);
    t.datetime('data_emissao').notNullable();
    t.datetime('data_ativacao');
    t.datetime('data_primeiro_uso');
    t.datetime('data_bloqueio');
    t.string('motivo_bloqueio');
    t.string('status_cartao').defaultTo('emitido');
    t.integer('tentativas_pin').defaultTo(0);
    t.datetime('created_at').defaultTo(db.fn.now());
  });

  await db.schema.createTableIfNotExists('credenciamento', (t) => {
    t.increments('id_credenciamento');
    t.integer('id_programa').notNullable().references('id_programa').inTable('programa').onDelete('RESTRICT');
    t.integer('id_comercio').notNullable().references('id_comercio').inTable('comercio').onDelete('RESTRICT');
    t.integer('id_emissor').references('id_emissor').inTable('emissor').onDelete('RESTRICT');
    t.datetime('data_credenciamento').notNullable();
    t.date('data_validade');
    t.float('taxa_desconto').defaultTo(0);
    t.integer('prazo_liquidacao').defaultTo(30);
    t.float('limite_transacao_diaria');
    t.float('limite_valor_mensal');
    t.string('status_credenciamento').defaultTo('ativo');
    t.string('motivo_suspensao');
    t.datetime('created_at').defaultTo(db.fn.now());
    t.datetime('updated_at');
    t.unique(['id_programa', 'id_comercio', 'id_emissor']);
  });

  await db.schema.createTableIfNotExists('transacao', (t) => {
    t.increments('id_transacao');
    t.integer('id_cartao').notNullable().references('id_cartao').inTable('cartao').onDelete('RESTRICT');
    t.integer('id_comercio').notNullable().references('id_comercio').inTable('comercio').onDelete('RESTRICT');
    t.integer('id_credenciamento').references('id_credenciamento').inTable('credenciamento').onDelete('RESTRICT');
    t.float('valor_bruto').notNullable();
    t.float('valor_taxa').defaultTo(0);
    t.float('valor_liquido').notNullable();
    t.datetime('data_hora_autorizacao').defaultTo(db.fn.now());
    t.datetime('data_hora_confirmacao');
    t.string('codigo_autorizacao');
    t.string('nsu').unique().notNullable();
    t.string('tipo_transacao').defaultTo('compra');
    t.string('motivo_estorno');
    t.string('status_transacao').defaultTo('pendente');
    t.string('motivo_negacao');
    t.float('saldo_antes').notNullable();
    t.float('saldo_depois').notNullable();
    t.string('ip_transacao');
    t.string('user_agent');
    t.index(['id_cartao', 'data_hora_autorizacao']);
    t.index(['id_comercio', 'data_hora_autorizacao']);
    t.index(['status_transacao']);
  });

  await db.schema.createTableIfNotExists('recarga', (t) => {
    t.increments('id_recarga');
    t.integer('id_cartao').notNullable().references('id_cartao').inTable('cartao').onDelete('RESTRICT');
    t.integer('id_programa').notNullable().references('id_programa').inTable('programa').onDelete('RESTRICT');
    t.float('valor_creditado').notNullable();
    t.datetime('data_credito').defaultTo(db.fn.now());
    t.date('periodo_referencia').notNullable();
    t.string('tipo_credito').defaultTo('programado');
    t.text('observacao');
    t.string('usuario_responsavel');
    t.index(['id_cartao', 'periodo_referencia']);
  });

  await db.schema.createTableIfNotExists('saque_comercio', (t) => {
    t.increments('id_saque');
    t.integer('id_comercio').notNullable().references('id_comercio').inTable('comercio').onDelete('RESTRICT');
    t.integer('id_programa').notNullable().references('id_programa').inTable('programa').onDelete('RESTRICT');
    t.float('valor_solicitado').notNullable();
    t.float('valor_pago');
    t.string('status_saque').notNullable().defaultTo('pendente');
    t.datetime('data_solicitacao').defaultTo(db.fn.now());
    t.datetime('data_aprovacao');
    t.datetime('data_pagamento');
    t.string('motivo_reprovacao');
    t.string('usuario_aprovador');
    t.string('banco_destino');
    t.string('agencia_destino');
    t.string('conta_destino');
    t.string('tipo_conta');
    t.string('comprovante_transferencia');
    t.string('identificador_transacao_bancaria');
    t.text('observacoes');
    t.index(['id_comercio', 'id_programa']);
    t.index(['status_saque']);
    t.index(['data_solicitacao']);
  });

  console.log('✅ Migrações concluídas com sucesso!');
  await db.destroy();
}

migrate().catch((err) => {
  console.error('❌ Erro na migração:', err);
  process.exit(1);
});
