const express = require('express');
const router = express.Router();
const shop = require('../data/shop');

router.get('/', (req, res) => {
    res.json({ success: true, data: shop });
});

router.get('/:sea', (req, res) => {
    const sea = parseInt(req.params.sea);
    if (!shop[sea]) return res.status(404).json({ success: false, error: 'Sea not found' });
    res.json({ success: true, sea, count: Object.keys(shop[sea]).length, data: shop[sea] });
});

router.get('/:sea/category/:cat', (req, res) => {
    const sea = parseInt(req.params.sea);
    const cat = req.params.cat;
    if (!shop[sea]) return res.status(404).json({ success: false, error: 'Sea not found' });
    const filtered = {};
    for (const [name, data] of Object.entries(shop[sea])) {
        if (data.category.toLowerCase() === cat.toLowerCase()) filtered[name] = data;
    }
    res.json({ success: true, sea, category: cat, count: Object.keys(filtered).length, data: filtered });
});

router.get('/:sea/:name', (req, res) => {
    const sea = parseInt(req.params.sea);
    const name = req.params.name;
    if (!shop[sea] || !shop[sea][name]) return res.status(404).json({ success: false, error: 'Item not found' });
    res.json({ success: true, sea, name, data: shop[sea][name] });
});

module.exports = router;
