const express = require('express');
const router = express.Router();
const fruits = require('../data/fruits');

router.get('/', (req, res) => {
    res.json({ success: true, count: fruits.length, data: fruits });
});

router.get('/type/:type', (req, res) => {
    const type = req.params.type.toLowerCase();
    const filtered = fruits.filter(f => f.type.toLowerCase() === type);
    res.json({ success: true, type, count: filtered.length, data: filtered });
});

router.get('/rarity/:rarity', (req, res) => {
    const rarity = req.params.rarity.toLowerCase();
    const filtered = fruits.filter(f => f.rarity.toLowerCase() === rarity);
    res.json({ success: true, rarity, count: filtered.length, data: filtered });
});

router.get('/search/:query', (req, res) => {
    const query = req.params.query.toLowerCase();
    const filtered = fruits.filter(f => f.name.toLowerCase().includes(query));
    res.json({ success: true, query, count: filtered.length, data: filtered });
});

router.get('/name/:name', (req, res) => {
    const name = req.params.name.toLowerCase();
    const fruit = fruits.find(f => f.name.toLowerCase() === name || f.name.toLowerCase().includes(name));
    if (!fruit) return res.status(404).json({ success: false, error: 'Fruit not found' });
    res.json({ success: true, data: fruit });
});

module.exports = router;
