
const MongoClient = require('../clients/MongoClient');
const { setCache } = require('../clients/RedisClient')

class ProductService {
    constructor() {
        // Configuring the URL of MongoDB connection
        this.collection_name = "products";

        this.mongoClient = new MongoClient();
        this.mongoClient.connectMongo(this.collection_name);
        // this.mongoClient.createCollection(this.collection_name);
    }

    createProduct = async (req, res) => {
        console.log("ola");
        try {
            const newProduct = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                stock: req.body.stock
            };

            this.mongoClient.insertDocument(this.collection_name, newProduct);
            res.status(201).json("ok");
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
    
    getAllProducts = async (req, res) => {
        try {
            const docs = await this.mongoClient.getAllDocuments(this.collection_name);
            res.status(200).send(docs);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    getProductById = async (req, res) => {
        try {
            const { id } = req.params;
            // console.log(`iddddd -- ----- -- - ${id} `)
            const doc = await this.mongoClient.findDocumentById(this.collection_name, id);

            const cacheKey = `product:${id}`;
            setCache(cacheKey, doc);
            res.status(200).send(doc);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    deleteAllProducts = async (req, res) => {
        try {
            await this.mongoClient.deleteAllDocuments(this.collection_name);
            res.status(200).send("all products have been deleted");
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    getProductByName = async (req, res) => {
        // try {
        //     const productName = req.params.name;
        //     const product = await Product.findOne({ name: new RegExp(productName, 'i') });

        //     if (!product) {
        //         return res.status(404).json({ message: 'Producto no encontrado' });
        //     }

        //     res.json(product);
        // } catch (error) {
        //     res.status(500).json({ message: 'Error al buscar el producto', error });
        // }
    };
}

module.exports = ProductService