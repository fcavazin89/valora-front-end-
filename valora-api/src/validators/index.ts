import { z } from 'zod';

// ── EMISSOR ──────────────────────────────────────────────
export const EmissorCreateSchema = z.object({
  cnpj: z.string().min(14).max(18),
  razao_social: z.string().min(3),
  nome_fantasia: z.string().optional(),
  tipo_emissor: z.string().min(2),
  endereco: z.string().min(5),
  telefone: z.string().min(8),
  email: z.string().email(),
  status: z.enum(['ativo', 'inativo']).optional(),
});
export const EmissorUpdateSchema = EmissorCreateSchema.partial();

// ── PROGRAMA ─────────────────────────────────────────────
export const ProgramaCreateSchema = z.object({
  id_emissor: z.number().int().positive(),
  nome: z.string().min(3),
  codigo_programa: z.string().min(3),
  descricao: z.string().min(5),
  data_inicio: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  data_fim: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  valor_base_mensal: z.number().min(0).optional(),
  periodicidade: z.enum(['mensal', 'semanal', 'quinzenal', 'anual']).optional(),
  dia_credito: z.number().int().min(1).max(31),
  validade_cartao_meses: z.number().int().min(1).optional(),
  permite_saldo_negativo: z.boolean().optional(),
  limite_negativo: z.number().min(0).optional(),
  permite_estorno: z.boolean().optional(),
  status: z.enum(['ativo', 'inativo', 'suspenso']).optional(),
});
export const ProgramaUpdateSchema = ProgramaCreateSchema.partial();

// ── BENEFICIARIO ─────────────────────────────────────────
export const BeneficiarioCreateSchema = z.object({
  cpf: z.string().min(11).max(14),
  nome_completo: z.string().min(3),
  data_nascimento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  sexo: z.enum(['M', 'F', 'O']).optional(),
  rg: z.string().optional(),
  orgao_expedidor: z.string().optional(),
  estado_civil: z.string().optional(),
  nome_mae: z.string().min(3),
  nome_pai: z.string().optional(),
  endereco: z.string().min(5),
  cep: z.string().min(8).max(9),
  telefone: z.string().min(8),
  email: z.string().email().optional(),
  status_beneficiario: z.enum(['ativo', 'inativo', 'suspenso']).optional(),
});
export const BeneficiarioUpdateSchema = BeneficiarioCreateSchema.partial();

// ── COMERCIO ─────────────────────────────────────────────
export const ComercioCreateSchema = z.object({
  cnpj: z.string().min(14).max(18),
  razao_social: z.string().min(3),
  nome_fantasia: z.string().min(2),
  cnae_principal: z.string().min(4),
  categoria_comercio: z.string().min(3),
  endereco: z.string().min(5),
  cep: z.string().min(8).max(9),
  telefone: z.string().min(8),
  email: z.string().email(),
  responsavel_nome: z.string().min(3),
  responsavel_cpf: z.string().min(11).max(14),
  conta_bancaria_banco: z.string().optional(),
  conta_bancaria_agencia: z.string().optional(),
  conta_bancaria_numero: z.string().optional(),
  tipo_conta: z.enum(['corrente', 'poupanca']).optional(),
  status_comercio: z.enum(['ativo', 'inativo', 'suspenso', 'pendente_analise']).optional(),
  observacoes: z.string().optional(),
});
export const ComercioUpdateSchema = ComercioCreateSchema.partial();

// ── CARTAO ───────────────────────────────────────────────
export const CartaoCreateSchema = z.object({
  numero_cartao: z.string().min(13).max(19),
  id_emissor: z.number().int().positive(),
  id_programa: z.number().int().positive(),
  id_beneficiario: z.number().int().positive(),
  tipo_cartao: z.enum(['fisico', 'virtual']).optional(),
  bandeira: z.string().optional(),
  validade: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  cvv: z.string().min(3).max(4),
  saldo_atual: z.number().min(0).optional(),
  data_emissao: z.string().regex(/^\d{4}-\d{2}-\d{2}/),
  status_cartao: z.enum(['emitido', 'ativo', 'bloqueado', 'cancelado', 'expirado']).optional(),
});
export const CartaoUpdateSchema = CartaoCreateSchema.partial();

// ── CREDENCIAMENTO ───────────────────────────────────────
export const CredenciamentoCreateSchema = z.object({
  id_programa: z.number().int().positive(),
  id_comercio: z.number().int().positive(),
  id_emissor: z.number().int().positive().optional(),
  data_credenciamento: z.string().regex(/^\d{4}-\d{2}-\d{2}/),
  data_validade: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  taxa_desconto: z.number().min(0).max(100).optional(),
  prazo_liquidacao: z.number().int().min(0).optional(),
  limite_transacao_diaria: z.number().positive().optional(),
  limite_valor_mensal: z.number().positive().optional(),
  status_credenciamento: z.enum(['ativo', 'inativo', 'suspenso']).optional(),
  motivo_suspensao: z.string().optional(),
});
export const CredenciamentoUpdateSchema = CredenciamentoCreateSchema.partial();

// ── TRANSACAO ────────────────────────────────────────────
export const TransacaoCreateSchema = z.object({
  id_cartao: z.number().int().positive(),
  id_comercio: z.number().int().positive(),
  id_credenciamento: z.number().int().positive().optional(),
  valor_bruto: z.number().positive(),
  valor_taxa: z.number().min(0).optional(),
  valor_liquido: z.number().positive(),
  nsu: z.string().min(4),
  tipo_transacao: z.enum(['compra', 'estorno', 'ajuste']).optional(),
  motivo_estorno: z.string().optional(),
  status_transacao: z.enum(['pendente', 'autorizada', 'confirmada', 'negada', 'estornada']).optional(),
  motivo_negacao: z.string().optional(),
  saldo_antes: z.number(),
  saldo_depois: z.number(),
  ip_transacao: z.string().optional(),
  user_agent: z.string().optional(),
});
export const TransacaoUpdateSchema = TransacaoCreateSchema.partial();

// ── RECARGA ──────────────────────────────────────────────
export const RecargaCreateSchema = z.object({
  id_cartao: z.number().int().positive(),
  id_programa: z.number().int().positive(),
  valor_creditado: z.number().positive(),
  periodo_referencia: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  tipo_credito: z.enum(['programado', 'manual', 'bonus', 'estorno']).optional(),
  observacao: z.string().optional(),
  usuario_responsavel: z.string().optional(),
});
export const RecargaUpdateSchema = RecargaCreateSchema.partial();

// ── SAQUE_COMERCIO ───────────────────────────────────────
export const SaqueComercioCreateSchema = z.object({
  id_comercio: z.number().int().positive(),
  id_programa: z.number().int().positive(),
  valor_solicitado: z.number().positive(),
  banco_destino: z.string().optional(),
  agencia_destino: z.string().optional(),
  conta_destino: z.string().optional(),
  tipo_conta: z.enum(['corrente', 'poupanca']).optional(),
  observacoes: z.string().optional(),
});
export const SaqueComercioUpdateSchema = z.object({
  status_saque: z.enum(['pendente', 'aprovado', 'reprovado', 'pago', 'cancelado']).optional(),
  valor_pago: z.number().positive().optional(),
  motivo_reprovacao: z.string().optional(),
  usuario_aprovador: z.string().optional(),
  comprovante_transferencia: z.string().optional(),
  identificador_transacao_bancaria: z.string().optional(),
  observacoes: z.string().optional(),
});
