const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const islandsRouter = require('./routes/islands');
const npcsRouter = require('./routes/npcs');
const shopRouter = require('./routes/shop');
const fruitsRouter = require('./routes/fruits');
const itemsRouter = require('./routes/items');
const systemRouter = require('./routes/system');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health check
app.get('/', (req, res) => {
    res.json({
        name: 'Void Hub Blox Fruits API',
        version: '1.0.0',
        status: 'online',
        uptime: process.uptime(),
        endpoints: {
            islands: '/api/islands',
            npcs: '/api/npcs',
            shop: '/api/shop',
            fruits: '/api/fruits',
            items: '/api/items',
            system: '/api/system',
            health: '/health'
        }
    });
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() });
});

// Routes
app.use('/api/islands', islandsRouter);
app.use('/api/npcs', npcsRouter);
app.use('/api/shop', shopRouter);
app.use('/api/fruits', fruitsRouter);
app.use('/api/items', itemsRouter);
app.use('/api/system', systemRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found', path: req.path });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('[ERROR]', err);
    res.status(500).json({ error: 'Internal server error', message: err.message });
});

app.listen(PORT, () => {
    console.log(`[VOID HUB API] Running on port ${PORT}`);
    console.log(`[VOID HUB API] http://localhost:${PORT}`);
});
