import { makeController } from './base.controller';
import {
  EmissorService, ProgramaService, BeneficiarioService, ComercioService,
  CartaoService, CredenciamentoService, TransacaoService, RecargaService, SaqueComercioService,
} from '../services';
import {
  EmissorCreateSchema, EmissorUpdateSchema,
  ProgramaCreateSchema, ProgramaUpdateSchema,
  BeneficiarioCreateSchema, BeneficiarioUpdateSchema,
  ComercioCreateSchema, ComercioUpdateSchema,
  CartaoCreateSchema, CartaoUpdateSchema,
  CredenciamentoCreateSchema, CredenciamentoUpdateSchema,
  TransacaoCreateSchema, TransacaoUpdateSchema,
  RecargaCreateSchema, RecargaUpdateSchema,
  SaqueComercioCreateSchema, SaqueComercioUpdateSchema,
} from '../validators';

export const emissorController = makeController(new EmissorService(), EmissorCreateSchema, EmissorUpdateSchema);
export const programaController = makeController(new ProgramaService(), ProgramaCreateSchema, ProgramaUpdateSchema);
export const beneficiarioController = makeController(new BeneficiarioService(), BeneficiarioCreateSchema, BeneficiarioUpdateSchema);
export const comercioController = makeController(new ComercioService(), ComercioCreateSchema, ComercioUpdateSchema);
export const cartaoController = makeController(new CartaoService(), CartaoCreateSchema, CartaoUpdateSchema);
export const credenciamentoController = makeController(new CredenciamentoService(), CredenciamentoCreateSchema, CredenciamentoUpdateSchema);
export const transacaoController = makeController(new TransacaoService(), TransacaoCreateSchema, TransacaoUpdateSchema);
export const recargaController = makeController(new RecargaService(), RecargaCreateSchema, RecargaUpdateSchema);
export const saqueComercioController = makeController(new SaqueComercioService(), SaqueComercioCreateSchema, SaqueComercioUpdateSchema);
