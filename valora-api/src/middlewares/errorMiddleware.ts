import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../types';

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof ZodError) {
    res.status(422).json({
      error: 'Dados inválidos',
      code: 'VALIDATION_ERROR',
      details: err.issues.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.message,
      code: err.code || 'APP_ERROR',
    });
    return;
  }

  const msg = err instanceof Error ? err.message : '';
  if (msg.includes('UNIQUE constraint') || msg.includes('unique constraint') || msg.includes('duplicate key')) {
    res.status(409).json({
      error: 'Registro duplicado. Um registro com esses dados já existe.',
      code: 'CONFLICT',
    });
    return;
  }

  if (msg.includes('FOREIGN KEY') || msg.includes('foreign key')) {
    res.status(409).json({
      error: 'Violação de chave estrangeira. Verifique os IDs relacionados.',
      code: 'FOREIGN_KEY_VIOLATION',
    });
    return;
  }

  console.error('[ERROR]', err);
  res.status(500).json({
    error: 'Erro interno do servidor.',
    code: 'INTERNAL_ERROR',
  });
}

export function notFoundMiddleware(_req: Request, res: Response): void {
  res.status(404).json({ error: 'Rota não encontrada.', code: 'ROUTE_NOT_FOUND' });
}
