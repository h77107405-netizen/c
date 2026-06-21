import express from 'express';
import cors from 'cors';
import path from 'path';
import { config, validateEnv } from './config/env.js';
import { connectDatabase } from './config/database.js';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/error.js';

validateEnv();

const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded files
app.use('/api/uploads', express.static(path.join(process.cwd(), 'uploads')));

if (config.nodeEnv === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ message: 'Coaching Platform API', version: '1.0.0' });
});

app.use(notFoundHandler);
app.use(errorHandler);

async function startServer() {
  try {
    await connectDatabase();
    app.listen(config.port, () => {
      console.log(`🚀 API Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

process.on('unhandledRejection', (reason) => console.error('Unhandled Rejection:', reason));

startServer();

export default app;
