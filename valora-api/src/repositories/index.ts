import db from '../db/connection';
import { BaseRepository } from './base.repository';
import { NotFoundError, PaginationParams, PaginatedResponse } from '../types';

// ── EMISSOR ──────────────────────────────────────────────
export class EmissorRepository extends BaseRepository<Record<string, unknown>> {
  constructor() { super('emissor', 'id_emissor'); }
}

// ── PROGRAMA ─────────────────────────────────────────────
export class ProgramaRepository extends BaseRepository<Record<string, unknown>> {
  constructor() { super('programa', 'id_programa'); }

  async findAllWithEmissor(params: PaginationParams): Promise<PaginatedResponse<Record<string, unknown>>> {
    const [{ total }, rows] = await Promise.all([
      db('programa').count('id_programa as total').first() as unknown as Promise<{ total: number }>,
      db('programa')
        .join('emissor', 'programa.id_emissor', 'emissor.id_emissor')
        .select(
          'programa.*',
          'emissor.razao_social as emissor_razao_social',
          'emissor.nome_fantasia as emissor_nome_fantasia'
        )
        .limit(params.limit).offset(params.offset).orderBy('programa.id_programa', 'desc'),
    ]);
    return { data: rows, pagination: { total: Number(total), page: params.page, limit: params.limit, totalPages: Math.ceil(Number(total) / params.limit) } };
  }

  async findByIdWithEmissor(id: number): Promise<Record<string, unknown>> {
    const row = await db('programa')
      .join('emissor', 'programa.id_emissor', 'emissor.id_emissor')
      .select('programa.*', 'emissor.razao_social as emissor_razao_social', 'emissor.nome_fantasia as emissor_nome_fantasia')
      .where('programa.id_programa', id).first();
    if (!row) throw new NotFoundError('programa', id);
    return row;
  }
}

// ── BENEFICIARIO ─────────────────────────────────────────
export class BeneficiarioRepository extends BaseRepository<Record<string, unknown>> {
  constructor() { super('beneficiario', 'id_beneficiario'); }
}

// ── COMERCIO ─────────────────────────────────────────────
export class ComercioRepository extends BaseRepository<Record<string, unknown>> {
  constructor() { super('comercio', 'id_comercio'); }
}

// ── CARTAO ───────────────────────────────────────────────
export class CartaoRepository extends BaseRepository<Record<string, unknown>> {
  constructor() { super('cartao', 'id_cartao'); }

  async findAllWithRelations(params: PaginationParams): Promise<PaginatedResponse<Record<string, unknown>>> {
    const [{ total }, rows] = await Promise.all([
      db('cartao').count('id_cartao as total').first() as unknown as Promise<{ total: number }>,
      db('cartao')
        .join('emissor', 'cartao.id_emissor', 'emissor.id_emissor')
        .join('programa', 'cartao.id_programa', 'programa.id_programa')
        .join('beneficiario', 'cartao.id_beneficiario', 'beneficiario.id_beneficiario')
        .select(
          'cartao.*',
          'emissor.razao_social as emissor_nome',
          'programa.nome as programa_nome',
          'beneficiario.nome_completo as beneficiario_nome',
          'beneficiario.cpf as beneficiario_cpf'
        )
        .limit(params.limit).offset(params.offset).orderBy('cartao.id_cartao', 'desc'),
    ]);
    return { data: rows, pagination: { total: Number(total), page: params.page, limit: params.limit, totalPages: Math.ceil(Number(total) / params.limit) } };
  }

  async findByIdWithRelations(id: number): Promise<Record<string, unknown>> {
    const row = await db('cartao')
      .join('emissor', 'cartao.id_emissor', 'emissor.id_emissor')
      .join('programa', 'cartao.id_programa', 'programa.id_programa')
      .join('beneficiario', 'cartao.id_beneficiario', 'beneficiario.id_beneficiario')
      .select('cartao.*', 'emissor.razao_social as emissor_nome', 'programa.nome as programa_nome', 'beneficiario.nome_completo as beneficiario_nome', 'beneficiario.cpf as beneficiario_cpf')
      .where('cartao.id_cartao', id).first();
    if (!row) throw new NotFoundError('cartao', id);
    return row;
  }
}

// ── CREDENCIAMENTO ───────────────────────────────────────
export class CredenciamentoRepository extends BaseRepository<Record<string, unknown>> {
  constructor() { super('credenciamento', 'id_credenciamento'); }

  async findAllWithRelations(params: PaginationParams): Promise<PaginatedResponse<Record<string, unknown>>> {
    const [{ total }, rows] = await Promise.all([
      db('credenciamento').count('id_credenciamento as total').first() as unknown as Promise<{ total: number }>,
      db('credenciamento')
        .join('programa', 'credenciamento.id_programa', 'programa.id_programa')
        .join('comercio', 'credenciamento.id_comercio', 'comercio.id_comercio')
        .leftJoin('emissor', 'credenciamento.id_emissor', 'emissor.id_emissor')
        .select(
          'credenciamento.*',
          'programa.nome as programa_nome',
          'comercio.nome_fantasia as comercio_nome',
          'emissor.razao_social as emissor_nome'
        )
        .limit(params.limit).offset(params.offset).orderBy('credenciamento.id_credenciamento', 'desc'),
    ]);
    return { data: rows, pagination: { total: Number(total), page: params.page, limit: params.limit, totalPages: Math.ceil(Number(total) / params.limit) } };
  }
}

// ── TRANSACAO ────────────────────────────────────────────
export class TransacaoRepository extends BaseRepository<Record<string, unknown>> {
  constructor() { super('transacao', 'id_transacao'); }

  async findAllWithRelations(params: PaginationParams, filters?: Record<string, unknown>): Promise<PaginatedResponse<Record<string, unknown>>> {
    const buildQuery = () => {
      const q = db('transacao')
        .join('cartao', 'transacao.id_cartao', 'cartao.id_cartao')
        .join('comercio', 'transacao.id_comercio', 'comercio.id_comercio')
        .join('beneficiario', 'cartao.id_beneficiario', 'beneficiario.id_beneficiario')
        .select(
          'transacao.*',
          'cartao.numero_cartao',
          'comercio.nome_fantasia as comercio_nome',
          'beneficiario.nome_completo as beneficiario_nome'
        );
      if (filters?.id_cartao) q.where('transacao.id_cartao', filters.id_cartao);
      if (filters?.id_comercio) q.where('transacao.id_comercio', filters.id_comercio);
      if (filters?.status_transacao) q.where('transacao.status_transacao', filters.status_transacao);
      return q;
    };

    const [{ total }, rows] = await Promise.all([
      buildQuery().clone().clearSelect().count('transacao.id_transacao as total').first() as unknown as Promise<{ total: number }>,
      buildQuery().limit(params.limit).offset(params.offset).orderBy('transacao.id_transacao', 'desc'),
    ]);
    return { data: rows, pagination: { total: Number(total), page: params.page, limit: params.limit, totalPages: Math.ceil(Number(total) / params.limit) } };
  }
}

// ── RECARGA ──────────────────────────────────────────────
export class RecargaRepository extends BaseRepository<Record<string, unknown>> {
  constructor() { super('recarga', 'id_recarga'); }

  async findAllWithRelations(params: PaginationParams, filters?: Record<string, unknown>): Promise<PaginatedResponse<Record<string, unknown>>> {
    const buildQuery = () => {
      const q = db('recarga')
        .join('cartao', 'recarga.id_cartao', 'cartao.id_cartao')
        .join('programa', 'recarga.id_programa', 'programa.id_programa')
        .join('beneficiario', 'cartao.id_beneficiario', 'beneficiario.id_beneficiario')
        .select('recarga.*', 'cartao.numero_cartao', 'programa.nome as programa_nome', 'beneficiario.nome_completo as beneficiario_nome');
      if (filters?.id_cartao) q.where('recarga.id_cartao', filters.id_cartao);
      if (filters?.id_programa) q.where('recarga.id_programa', filters.id_programa);
      return q;
    };
    const [{ total }, rows] = await Promise.all([
      buildQuery().clone().clearSelect().count('recarga.id_recarga as total').first() as unknown as Promise<{ total: number }>,
      buildQuery().limit(params.limit).offset(params.offset).orderBy('recarga.id_recarga', 'desc'),
    ]);
    return { data: rows, pagination: { total: Number(total), page: params.page, limit: params.limit, totalPages: Math.ceil(Number(total) / params.limit) } };
  }
}

// ── SAQUE_COMERCIO ───────────────────────────────────────
export class SaqueComercioRepository extends BaseRepository<Record<string, unknown>> {
  constructor() { super('saque_comercio', 'id_saque'); }

  async findAllWithRelations(params: PaginationParams, filters?: Record<string, unknown>): Promise<PaginatedResponse<Record<string, unknown>>> {
    const buildQuery = () => {
      const q = db('saque_comercio')
        .join('comercio', 'saque_comercio.id_comercio', 'comercio.id_comercio')
        .join('programa', 'saque_comercio.id_programa', 'programa.id_programa')
        .select('saque_comercio.*', 'comercio.nome_fantasia as comercio_nome', 'programa.nome as programa_nome');
      if (filters?.id_comercio) q.where('saque_comercio.id_comercio', filters.id_comercio);
      if (filters?.status_saque) q.where('saque_comercio.status_saque', filters.status_saque);
      return q;
    };
    const [{ total }, rows] = await Promise.all([
      buildQuery().clone().clearSelect().count('saque_comercio.id_saque as total').first() as unknown as Promise<{ total: number }>,
      buildQuery().limit(params.limit).offset(params.offset).orderBy('saque_comercio.id_saque', 'desc'),
    ]);
    return { data: rows, pagination: { total: Number(total), page: params.page, limit: params.limit, totalPages: Math.ceil(Number(total) / params.limit) } };
  }
}
