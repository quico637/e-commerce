const { redis } = require('../clients/RedisClient')

exports.cacheMiddleware = async (req, res, next) => {
    try {
        const { name } = req.params;
        const cacheKey = `product:${name}`;
        // Intenta obtener el producto del caché de Redis
        const cachedProduct = await redis.get(cacheKey);
        
        if (cachedProduct) {
            // Si el producto está en Redis, devuelve el producto cachéado
            console.log("\t\t Acierto de cache!");
            return res.json({ data: JSON.parse(cachedProduct), source: 'cache' });
        } else {
            console.log("\t\t Fallo de cache!");
            next();
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};