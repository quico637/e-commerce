const mongoose = require('mongoose');

class MongoClient {
    constructor() {
        // Configuring the URL of MongoDB connection
        this.mongoURL = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_IP}:27017/catalog?authSource=admin`;
        this.db = mongoose.connection.db;
    }

    async createCollection(collectionName) {
        await mongoose.connection.db.createCollection(collectionName);
    }

    async connectMongo() {
        try {
            await mongoose.connect(this.mongoURL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            console.log("MongoDB connected successfully!");
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            throw error;
        }
    }

    async insertDocument(collectionName, document) {
        try {
            const result = await mongoose.connection.db.collection(collectionName).insertOne(document);

            console.log("Document inserted successfully:", result.insertedId);
        } catch (error) {
            console.error("Error inserting document:", error);
            throw error;
        }
    }

    closeConnection() {
        mongoose.connection.close();
        console.log("MongoDB connection closed.");
    }
}

module.exports = MongoClient;

