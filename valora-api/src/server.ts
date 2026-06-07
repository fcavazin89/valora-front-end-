import 'dotenv/config';
import app from './app';

const PORT = process.env.PORT || 8090;

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════╗
║       🚀 Valora API iniciada         ║
╠══════════════════════════════════════╣
║  Porta   : ${PORT}                        ║
║  Ambiente: ${process.env.NODE_ENV || 'development'}              ║
║  Health  : http://localhost:${PORT}/health ║
╚══════════════════════════════════════╝
  `);
});
