const express = require('express');
const router = express.Router();
const islands = require('../data/islands');

// GET /api/islands - all seas
router.get('/', (req, res) => {
    res.json({
        success: true,
        count: {
            1: Object.keys(islands[1]).length,
            2: Object.keys(islands[2]).length,
            3: Object.keys(islands[3]).length
        },
        data: islands
    });
});

// GET /api/islands/:sea - specific sea
router.get('/:sea', (req, res) => {
    const sea = parseInt(req.params.sea);
    if (!islands[sea]) {
        return res.status(404).json({ success: false, error: 'Sea not found. Use 1, 2, or 3' });
    }
    res.json({ success: true, sea, count: Object.keys(islands[sea]).length, data: islands[sea] });
});

// GET /api/islands/:sea/:name - specific island
router.get('/:sea/:name', (req, res) => {
    const sea = parseInt(req.params.sea);
    const name = req.params.name;
    if (!islands[sea] || !islands[sea][name]) {
        return res.status(404).json({ success: false, error: 'Island not found' });
    }
    res.json({ success: true, sea, name, data: islands[sea][name] });
});

// GET /api/islands/:sea/random - random island
router.get('/:sea/random', (req, res) => {
    const sea = parseInt(req.params.sea);
    if (!islands[sea]) {
        return res.status(404).json({ success: false, error: 'Sea not found' });
    }
    const names = Object.keys(islands[sea]);
    const random = names[Math.floor(Math.random() * names.length)];
    res.json({ success: true, sea, name: random, data: islands[sea][random] });
});

module.exports = router;
