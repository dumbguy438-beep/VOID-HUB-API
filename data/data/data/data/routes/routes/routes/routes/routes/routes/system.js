const express = require('express');
const router = express.Router();

const START_TIME = Date.now();

router.get('/', (req, res) => {
    res.json({
        success: true,
        api: {
            name: "Void Hub Blox Fruits API",
            version: "1.0.0",
            platform: process.platform,
            node: process.version,
            uptime: Math.floor((Date.now() - START_TIME) / 1000),
            memory: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + " MB"
        },
        endpoints: {
            islands: {
                base: "/api/islands",
                sea: "/api/islands/:sea",
                single: "/api/islands/:sea/:name",
                random: "/api/islands/:sea/random"
            },
            npcs: {
                base: "/api/npcs",
                sea: "/api/npcs/:sea",
                category: "/api/npcs/:sea/category/:cat",
                single: "/api/npcs/:sea/:name"
            },
            shop: {
                base: "/api/shop",
                sea: "/api/shop/:sea",
                category: "/api/shop/:sea/category/:cat",
                single: "/api/shop/:sea/:name"
            },
            fruits: {
                base: "/api/fruits",
                type: "/api/fruits/type/:type",
                rarity: "/api/fruits/rarity/:rarity",
                search: "/api/fruits/search/:query",
                name: "/api/fruits/name/:name"
            },
            items: {
                base: "/api/items",
                legendary: "/api/items/legendary",
                materials: "/api/items/materials",
                search: "/api/items/search/:query"
            }
        }
    });
});

router.get('/ping', (req, res) => {
    res.json({ success: true, pong: Date.now() });
});

module.exports = router;
