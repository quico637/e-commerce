
const MongoClient = require('../clients/MongoClient');

class ProductService {
    constructor() {
        // Configuring the URL of MongoDB connection
        this.mongoClient = new MongoClient();
        this.mongoClient.connectMongo("products");
        // this.mongoClient.createCollection("products");
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

            this.mongoClient.insertDocument("products", newProduct);
            res.status(201).json("ok");
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
    
    getAllProducts = async (req, res) => {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    getProductById = async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) res.status(404).json({ message: "Producto no encontrado" });
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    deleteAllProducts = async (req, res) => {
        try {
            await Product.deleteMany({});
            res.status(200).json({ message: "Todos los productos han sido eliminados" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    getProductByName = async (req, res) => {
        try {
            const productName = req.params.name;
            const product = await Product.findOne({ name: new RegExp(productName, 'i') });

            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }

            res.json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error al buscar el producto', error });
        }
    };
}

module.exports = ProductService