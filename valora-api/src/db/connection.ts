import knex from 'knex';
import path from 'path';
import fs from 'fs';

const client = process.env.DB_CLIENT || 'sqlite3';

function getConnection() {
  if (client === 'sqlite3') {
    const dbDir = path.resolve(process.env.DB_FILENAME ? path.dirname(process.env.DB_FILENAME) : './database');
    if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
    return { filename: path.resolve(process.env.DB_FILENAME || './database/valora.db') };
  }
  if (client === 'pg') {
    return {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'valora_db',
    };
  }
  if (client === 'mysql2') {
    return {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'valora_db',
    };
  }
  throw new Error(`Unsupported DB_CLIENT: ${client}`);
}

const db = knex({
  client,
  connection: getConnection(),
  useNullAsDefault: true,
  pool: client === 'sqlite3' ? { min: 1, max: 1 } : { min: 2, max: 10 },
});

export default db;
