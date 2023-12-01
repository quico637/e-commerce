
const MongoClient = require('../clients/MongoClient');
const { setCache } = require('../clients/RedisClient')

class ProductService {
    constructor() {
        // Configuring the URL of MongoDB connection
        this.collectionName = "products";

        this.mongoClient = new MongoClient();
        this.mongoClient.connectMongo(this.collectionName);
        // this.mongoClient.createCollection(this.collectionName);
    }

    createProduct = async (req, res) => {
        console.log("ola");
        try {

            const id = req.body.name; 
            const newProduct = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                stock: req.body.stock
            };

            this.mongoClient.insertDocument(this.collectionName, newProduct);

            const cacheKey = `product:${id}`;
            setCache(cacheKey, newProduct);
            res.status(201).json("ok");
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
    
    getAllProducts = async (req, res) => {
        try {
            const docs = await this.mongoClient.getAllDocuments(this.collectionName);
            res.status(200).send(docs);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    getProductById = async (req, res) => {
        try {
            const { id } = req.params;
            
            const doc = await this.mongoClient.findDocumentById(this.collectionName, id);

            const cacheKey = `product:${id}`;
            setCache(cacheKey, doc);
            res.status(200).send(doc);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    updateProduct = async (req, res) => {
        
        try {

            const { name } = req.params;

            const query = {
                name 
            }

            const updatedProduct = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                stock: req.body.stock
            };

            this.mongoClient.updateDocument(this.collectionName, query, updatedProduct)

            const cacheKey = `product:${name}`;
            setCache(cacheKey, updatedProduct);
            res.status(201).json("ok");
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
    
    deleteAllProducts = async (req, res) => {
        try {
            await this.mongoClient.deleteAllDocuments(this.collectionName);
            res.status(200).send("all products have been deleted");
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    getProductByName = async (req, res) => {
        try {
            const { name } = req.params;
            
            const doc = await this.mongoClient.findDocumentByName(this.collectionName, name);

            const cacheKey = `product:${name}`;
            setCache(cacheKey, doc);
            res.status(200).send(doc);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}

module.exports = ProductService