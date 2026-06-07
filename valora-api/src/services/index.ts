import {
  EmissorRepository,
  ProgramaRepository,
  BeneficiarioRepository,
  ComercioRepository,
  CartaoRepository,
  CredenciamentoRepository,
  TransacaoRepository,
  RecargaRepository,
  SaqueComercioRepository,
} from '../repositories';
import { PaginationParams } from '../types';

// ── EMISSOR ──────────────────────────────────────────────
export class EmissorService {
  private repo = new EmissorRepository();
  findAll = (p: PaginationParams) => this.repo.findAll(p);
  findById = (id: number) => this.repo.findById(id);
  create = (data: Record<string, unknown>) => this.repo.create(data);
  update = (id: number, data: Record<string, unknown>) => this.repo.update(id, data);
  delete = (id: number) => this.repo.delete(id);
}

// ── PROGRAMA ─────────────────────────────────────────────
export class ProgramaService {
  private repo = new ProgramaRepository();
  findAll = (p: PaginationParams) => this.repo.findAllWithEmissor(p);
  findById = (id: number) => this.repo.findByIdWithEmissor(id);
  create = (data: Record<string, unknown>) => this.repo.create(data);
  update = (id: number, data: Record<string, unknown>) => this.repo.update(id, data);
  delete = (id: number) => this.repo.delete(id);
}

// ── BENEFICIARIO ─────────────────────────────────────────
export class BeneficiarioService {
  private repo = new BeneficiarioRepository();
  findAll = (p: PaginationParams) => this.repo.findAll(p);
  findById = (id: number) => this.repo.findById(id);
  create = (data: Record<string, unknown>) => this.repo.create(data);
  update = (id: number, data: Record<string, unknown>) => this.repo.update(id, data);
  delete = (id: number) => this.repo.delete(id);
}

// ── COMERCIO ─────────────────────────────────────────────
export class ComercioService {
  private repo = new ComercioRepository();
  findAll = (p: PaginationParams) => this.repo.findAll(p);
  findById = (id: number) => this.repo.findById(id);
  create = (data: Record<string, unknown>) => this.repo.create(data);
  update = (id: number, data: Record<string, unknown>) => this.repo.update(id, data);
  delete = (id: number) => this.repo.delete(id);
}

// ── CARTAO ───────────────────────────────────────────────
export class CartaoService {
  private repo = new CartaoRepository();
  findAll = (p: PaginationParams) => this.repo.findAllWithRelations(p);
  findById = (id: number) => this.repo.findByIdWithRelations(id);
  create = (data: Record<string, unknown>) => this.repo.create(data);
  update = (id: number, data: Record<string, unknown>) => this.repo.update(id, data);
  delete = (id: number) => this.repo.delete(id);
}

// ── CREDENCIAMENTO ───────────────────────────────────────
export class CredenciamentoService {
  private repo = new CredenciamentoRepository();
  findAll = (p: PaginationParams) => this.repo.findAllWithRelations(p);
  findById = (id: number) => this.repo.findById(id);
  create = (data: Record<string, unknown>) => this.repo.create(data);
  update = (id: number, data: Record<string, unknown>) => this.repo.update(id, data);
  delete = (id: number) => this.repo.delete(id);
}

// ── TRANSACAO ────────────────────────────────────────────
export class TransacaoService {
  private repo = new TransacaoRepository();
  findAll = (p: PaginationParams, filters?: Record<string, unknown>) => this.repo.findAllWithRelations(p, filters);
  findById = (id: number) => this.repo.findById(id);
  create = (data: Record<string, unknown>) => this.repo.create(data);
  update = (id: number, data: Record<string, unknown>) => this.repo.update(id, data);
  delete = (id: number) => this.repo.delete(id);
}

// ── RECARGA ──────────────────────────────────────────────
export class RecargaService {
  private repo = new RecargaRepository();
  findAll = (p: PaginationParams, filters?: Record<string, unknown>) => this.repo.findAllWithRelations(p, filters);
  findById = (id: number) => this.repo.findById(id);
  create = (data: Record<string, unknown>) => this.repo.create(data);
  update = (id: number, data: Record<string, unknown>) => this.repo.update(id, data);
  delete = (id: number) => this.repo.delete(id);
}

// ── SAQUE_COMERCIO ───────────────────────────────────────
export class SaqueComercioService {
  private repo = new SaqueComercioRepository();
  findAll = (p: PaginationParams, filters?: Record<string, unknown>) => this.repo.findAllWithRelations(p, filters);
  findById = (id: number) => this.repo.findById(id);
  create = (data: Record<string, unknown>) => this.repo.create(data);
  update = (id: number, data: Record<string, unknown>) => this.repo.update(id, data);
  delete = (id: number) => this.repo.delete(id);
}
