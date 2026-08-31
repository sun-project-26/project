const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { PORT, CORS_ORIGIN } = require('./config/env');
const { connectDB, getDBStatus } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Route Handlers
const wasteRoutes = require('./routes/wasteRoutes');
const pickupRoutes = require('./routes/pickupRoutes');
const mobileUnitRoutes = require('./routes/mobileUnitRoutes');
const binRoutes = require('./routes/binRoutes');
const traceabilityRoutes = require('./routes/traceabilityRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(morgan('dev'));

// System Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'MediSort AI Backend Core',
    version: '1.0.0',
    database: getDBStatus(),
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/waste', wasteRoutes);
app.use('/api/pickups', pickupRoutes);
app.use('/api/mobile-units', mobileUnitRoutes);
app.use('/api/bins', binRoutes);
app.use('/api/traceability', traceabilityRoutes);
app.use('/api/analytics', analyticsRoutes);

// Root fallback
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'MediSort AI - Smart Mobile Medical Waste Platform Backend is online.',
    docs: '/api/health'
  });
});

// Central Error Handler
app.use(errorHandler);

// Start Server
const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🏥 \x1b[36m\x1b[1mMEDISORT AI BACKEND SERVICE ONLINE\x1b[0m`);
    console.log(`🚀 Port: \x1b[32m${PORT}\x1b[0m | Mode: \x1b[33m${process.env.NODE_ENV || 'development'}\x1b[0m`);
    console.log(`📡 Health Check: \x1b[34mhttp://localhost:${PORT}/api/health\x1b[0m`);
    console.log(`🗄️ Database: \x1b[35m${getDBStatus()}\x1b[0m`);
    console.log(`======================================================\n`);
  });
};

startServer();

module.exports = app;
