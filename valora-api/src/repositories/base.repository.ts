import db from '../db/connection';
import { NotFoundError, PaginationParams, PaginatedResponse } from '../types';

export class BaseRepository<T extends Record<string, unknown>> {
  constructor(protected tableName: string, protected primaryKey: string) {}

  async findAll(params: PaginationParams, filters?: Partial<T>): Promise<PaginatedResponse<T>> {
    const query = db(this.tableName);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          query.where(key, value as string);
        }
      });
    }

    const countResult = await query.clone().count(`${this.primaryKey} as total`).first();
    const total = Number((countResult as Record<string, unknown>)?.total ?? 0);
    const rows = await query.clone().limit(params.limit).offset(params.offset).orderBy(this.primaryKey, 'desc');

    return {
      data: rows as T[],
      pagination: {
        total,
        page: params.page,
        limit: params.limit,
        totalPages: Math.ceil(total / params.limit),
      },
    };
  }

  async findById(id: number): Promise<T> {
    const row = await db(this.tableName).where(this.primaryKey, id).first();
    if (!row) throw new NotFoundError(this.tableName, id);
    return row as T;
  }

  async create(data: Partial<T>): Promise<T> {
    const [id] = await db(this.tableName).insert(data);
    return this.findById(id as number);
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    await this.findById(id);
    await db(this.tableName).where(this.primaryKey, id).update({
      ...data,
      updated_at: new Date().toISOString(),
    });
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await db(this.tableName).where(this.primaryKey, id).delete();
  }
}
