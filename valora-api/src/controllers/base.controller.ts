import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { getPagination } from '../middlewares/pagination';

type Service = {
  findAll: (p: ReturnType<typeof getPagination>, filters?: Record<string, unknown>) => Promise<unknown>;
  findById: (id: number) => Promise<unknown>;
  create: (data: Record<string, unknown>) => Promise<unknown>;
  update: (id: number, data: Record<string, unknown>) => Promise<unknown>;
  delete: (id: number) => Promise<void>;
};

export function makeController(service: Service, createSchema: ZodSchema, updateSchema: ZodSchema) {
  return {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const pagination = getPagination(req);
        const filters: Record<string, unknown> = {};
        const { page: _p, limit: _l, ...rest } = req.query;
        Object.entries(rest).forEach(([k, v]) => { if (v) filters[k] = String(v); });
        const result = await service.findAll(pagination, filters);
        res.json(result);
      } catch (e) { next(e); }
    },

    getById: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = parseInt(String(req.params['id'] ?? '0'));
        const result = await service.findById(id);
        res.json({ data: result });
      } catch (e) { next(e); }
    },

    create: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const body = createSchema.parse(req.body) as Record<string, unknown>;
        const result = await service.create(body);
        res.status(201).json({ data: result, message: 'Criado com sucesso.' });
      } catch (e) { next(e); }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = parseInt(String(req.params['id'] ?? '0'));
        const body = updateSchema.parse(req.body) as Record<string, unknown>;
        const result = await service.update(id, body);
        res.json({ data: result, message: 'Atualizado com sucesso.' });
      } catch (e) { next(e); }
    },

    remove: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = parseInt(String(req.params['id'] ?? '0'));
        await service.delete(id);
        res.json({ message: 'Removido com sucesso.' });
      } catch (e) { next(e); }
    },
  };
}
