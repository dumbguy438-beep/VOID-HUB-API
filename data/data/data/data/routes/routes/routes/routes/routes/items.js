const express = require('express');
const router = express.Router();
const items = require('../data/items');

router.get('/', (req, res) => {
    res.json({ success: true, data: items });
});

router.get('/legendary', (req, res) => {
    res.json({ success: true, count: items.legendary.length, data: items.legendary });
});

router.get('/materials', (req, res) => {
    res.json({ success: true, count: items.materials.length, data: items.materials });
});

router.get('/search/:query', (req, res) => {
    const query = req.params.query.toLowerCase();
    const all = [...items.legendary, ...items.materials];
    const filtered = all.filter(i => i.name.toLowerCase().includes(query));
    res.json({ success: true, query, count: filtered.length, data: filtered });
});

module.exports = router;
