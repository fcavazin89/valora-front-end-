import { Router } from 'express';
import {
  emissorController, programaController, beneficiarioController, comercioController,
  cartaoController, credenciamentoController, transacaoController, recargaController, saqueComercioController,
} from '../controllers';

const router = Router();

// ── EMISSOR ──────────────────────────────────────────────
router.get('/emissores', emissorController.getAll);
router.get('/emissores/:id', emissorController.getById);
router.post('/emissores', emissorController.create);
router.put('/emissores/:id', emissorController.update);
router.delete('/emissores/:id', emissorController.remove);

// ── PROGRAMA ─────────────────────────────────────────────
router.get('/programas', programaController.getAll);
router.get('/programas/:id', programaController.getById);
router.post('/programas', programaController.create);
router.put('/programas/:id', programaController.update);
router.delete('/programas/:id', programaController.remove);

// ── BENEFICIARIO ─────────────────────────────────────────
router.get('/beneficiarios', beneficiarioController.getAll);
router.get('/beneficiarios/:id', beneficiarioController.getById);
router.post('/beneficiarios', beneficiarioController.create);
router.put('/beneficiarios/:id', beneficiarioController.update);
router.delete('/beneficiarios/:id', beneficiarioController.remove);

// ── COMERCIO ─────────────────────────────────────────────
router.get('/comercios', comercioController.getAll);
router.get('/comercios/:id', comercioController.getById);
router.post('/comercios', comercioController.create);
router.put('/comercios/:id', comercioController.update);
router.delete('/comercios/:id', comercioController.remove);

// ── CARTAO ───────────────────────────────────────────────
router.get('/cartoes', cartaoController.getAll);
router.get('/cartoes/:id', cartaoController.getById);
router.post('/cartoes', cartaoController.create);
router.put('/cartoes/:id', cartaoController.update);
router.delete('/cartoes/:id', cartaoController.remove);

// ── CREDENCIAMENTO ───────────────────────────────────────
router.get('/credenciamentos', credenciamentoController.getAll);
router.get('/credenciamentos/:id', credenciamentoController.getById);
router.post('/credenciamentos', credenciamentoController.create);
router.put('/credenciamentos/:id', credenciamentoController.update);
router.delete('/credenciamentos/:id', credenciamentoController.remove);

// ── TRANSACAO ────────────────────────────────────────────
router.get('/transacoes', transacaoController.getAll);
router.get('/transacoes/:id', transacaoController.getById);
router.post('/transacoes', transacaoController.create);
router.put('/transacoes/:id', transacaoController.update);
router.delete('/transacoes/:id', transacaoController.remove);

// ── RECARGA ──────────────────────────────────────────────
router.get('/recargas', recargaController.getAll);
router.get('/recargas/:id', recargaController.getById);
router.post('/recargas', recargaController.create);
router.put('/recargas/:id', recargaController.update);
router.delete('/recargas/:id', recargaController.remove);

// ── SAQUE_COMERCIO ───────────────────────────────────────
router.get('/saques', saqueComercioController.getAll);
router.get('/saques/:id', saqueComercioController.getById);
router.post('/saques', saqueComercioController.create);
router.put('/saques/:id', saqueComercioController.update);
router.delete('/saques/:id', saqueComercioController.remove);

export default router;
