import 'dotenv/config';
import db from './connection';

async function seed() {
  console.log('🌱 Inserindo dados de exemplo...');

  // Emissor
  const [id_emissor] = await db('emissor').insert({
    cnpj: '12.345.678/0001-90',
    razao_social: 'Valora Gestão de Benefícios Ltda',
    nome_fantasia: 'Valora',
    tipo_emissor: 'administradora',
    endereco: 'Av. Paulista, 1000, São Paulo - SP',
    telefone: '(11) 99999-0000',
    email: 'contato@valora.com.br',
    status: 'ativo',
  });

  // Programa
  const [id_programa] = await db('programa').insert({
    id_emissor,
    nome: 'Vale Alimentação Premium',
    codigo_programa: 'VA-PREMIUM-2024',
    descricao: 'Programa de vale alimentação para empresas',
    data_inicio: '2024-01-01',
    valor_base_mensal: 800.00,
    periodicidade: 'mensal',
    dia_credito: 5,
    validade_cartao_meses: 36,
    permite_saldo_negativo: false,
    permite_estorno: true,
    status: 'ativo',
  });

  // Beneficiário
  const [id_beneficiario] = await db('beneficiario').insert({
    cpf: '123.456.789-00',
    nome_completo: 'João da Silva Santos',
    data_nascimento: '1990-05-15',
    sexo: 'M',
    nome_mae: 'Maria da Silva',
    endereco: 'Rua das Flores, 123, São Paulo - SP',
    cep: '01310-100',
    telefone: '(11) 98888-1234',
    email: 'joao.silva@email.com',
    status_beneficiario: 'ativo',
  });

  // Comércio
  const [id_comercio] = await db('comercio').insert({
    cnpj: '98.765.432/0001-10',
    razao_social: 'Supermercado Bom Preço Ltda',
    nome_fantasia: 'Bom Preço',
    cnae_principal: '4711-3/01',
    categoria_comercio: 'supermercado',
    endereco: 'Rua do Comércio, 500, São Paulo - SP',
    cep: '01510-000',
    telefone: '(11) 3333-4444',
    email: 'contato@bompreco.com.br',
    responsavel_nome: 'Carlos Oliveira',
    responsavel_cpf: '987.654.321-00',
    conta_bancaria_banco: '001',
    conta_bancaria_agencia: '1234',
    conta_bancaria_numero: '56789-0',
    tipo_conta: 'corrente',
    status_comercio: 'ativo',
  });

  // Cartão
  const [id_cartao] = await db('cartao').insert({
    numero_cartao: '4111111111111111',
    id_emissor,
    id_programa,
    id_beneficiario,
    tipo_cartao: 'fisico',
    bandeira: 'Visa',
    validade: '2027-12-31',
    cvv: '123',
    saldo_atual: 800.00,
    data_emissao: new Date().toISOString(),
    status_cartao: 'ativo',
  });

  // Credenciamento
  const [id_credenciamento] = await db('credenciamento').insert({
    id_programa,
    id_comercio,
    id_emissor,
    data_credenciamento: new Date().toISOString(),
    taxa_desconto: 1.5,
    prazo_liquidacao: 30,
    status_credenciamento: 'ativo',
  });

  // Transação
  await db('transacao').insert({
    id_cartao,
    id_comercio,
    id_credenciamento,
    valor_bruto: 150.00,
    valor_taxa: 2.25,
    valor_liquido: 147.75,
    nsu: 'NSU20240601001',
    tipo_transacao: 'compra',
    status_transacao: 'confirmada',
    saldo_antes: 800.00,
    saldo_depois: 650.00,
    codigo_autorizacao: 'AUTH123456',
  });

  // Recarga
  await db('recarga').insert({
    id_cartao,
    id_programa,
    valor_creditado: 800.00,
    periodo_referencia: '2024-06-01',
    tipo_credito: 'programado',
    usuario_responsavel: 'sistema',
  });

  // Saque
  await db('saque_comercio').insert({
    id_comercio,
    id_programa,
    valor_solicitado: 147.75,
    banco_destino: '001',
    agencia_destino: '1234',
    conta_destino: '56789-0',
    tipo_conta: 'corrente',
    status_saque: 'pendente',
  });

  console.log('✅ Seed concluído com sucesso!');
  await db.destroy();
}

seed().catch((err) => {
  console.error('❌ Erro no seed:', err);
  process.exit(1);
});
