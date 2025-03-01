import { CorsOptions } from 'cors';

const allowedOrigins = [
  'http://localhost:5173',  // Development
  'http://localhost:4173',  // Preview
  process.env.FRONTEND_URL, // Production
].filter(Boolean);

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export default corsOptions; 