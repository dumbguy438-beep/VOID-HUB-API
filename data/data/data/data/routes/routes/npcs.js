const express = require('express');
const router = express.Router();
const npcs = require('../data/npcs');

router.get('/', (req, res) => {
    res.json({ success: true, data: npcs });
});

router.get('/:sea', (req, res) => {
    const sea = parseInt(req.params.sea);
    if (!npcs[sea]) return res.status(404).json({ success: false, error: 'Sea not found' });
    res.json({ success: true, sea, count: Object.keys(npcs[sea]).length, data: npcs[sea] });
});

router.get('/:sea/category/:cat', (req, res) => {
    const sea = parseInt(req.params.sea);
    const cat = req.params.cat.toLowerCase();
    if (!npcs[sea]) return res.status(404).json({ success: false, error: 'Sea not found' });
    const filtered = {};
    for (const [name, data] of Object.entries(npcs[sea])) {
        if (data.category.toLowerCase() === cat) filtered[name] = data;
    }
    res.json({ success: true, sea, category: cat, count: Object.keys(filtered).length, data: filtered });
});

router.get('/:sea/:name', (req, res) => {
    const sea = parseInt(req.params.sea);
    const name = req.params.name;
    if (!npcs[sea] || !npcs[sea][name]) return res.status(404).json({ success: false, error: 'NPC not found' });
    res.json({ success: true, sea, name, data: npcs[sea][name] });
});

module.exports = router;
