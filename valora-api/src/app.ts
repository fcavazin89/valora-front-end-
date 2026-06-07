import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import { errorMiddleware, notFoundMiddleware } from './middlewares/errorMiddleware';

const app = express();

// ── Security & Utility Middlewares ──
app.use(helmet());
app.use(cors());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Health Check ──
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), version: '1.0.0' });
});

// ── API Routes ──
app.use('/api/v1', routes);

// ── Error Handling ──
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
