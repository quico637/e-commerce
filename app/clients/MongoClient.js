const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const { MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, MONGO_HOST} = process.env;

class MongoClient {
    constructor() {
        // Configuring the URL of MongoDB connection
        this.mongoURL = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${MONGO_HOST}:27017/catalog?authSource=admin`;
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

    async createCollection(collectionName) {
        try {
            await mongoose.connection.db.createCollection(collectionName);
            console.log(`Collection '${collectionName}' created successfully.`);
        } catch (error) {
            console.error("Error creating collection:", error);
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

    async findDocuments(collectionName, query) {
        try {
            const result = await mongoose.connection.db.collection(collectionName).find(query).toArray();
            console.log("Documents found:", result);
            return result;
        } catch (error) {
            console.error("Error finding documents:", error);
            throw error;
        }
    }

    async findDocumentById(collectionName, documentId) {
        try {
            console.log(`idddddd22222 --------------- ${documentId.toString()}`)
            const result = await mongoose.connection.db.collection(collectionName).findOne({ "_id" : new ObjectId(documentId)});

            if (result) {
                console.log("Document found:", result);
                return result;
            } else {
                console.log("Document not found");
                return null;
            }
        } catch (error) {
            console.error("Error finding document by ID:", error);
            throw error;
        }
    }

    async findDocumentByName(collectionName, newName) {
        try {
            
            const result = await mongoose.connection.db.collection(collectionName).findOne({ name : newName});

            if (result) {
                console.log("Document found:", result);
                return result;
            } else {
                console.log("Document not found");
                return null;
            }
        } catch (error) {
            console.error("Error finding document by Name:", error);
            throw error;
        }
    }


    async updateDocument(collectionName, query, update) {
        try {
            const result = await mongoose.connection.db.collection(collectionName).updateOne(query, { $set: update });
            console.log("Document updated successfully:", result.modifiedCount);
        } catch (error) {
            console.error("Error updating document:", error);
            throw error;
        }
    }

    async deleteDocument(collectionName, query) {
        try {
            const result = await mongoose.connection.db.collection(collectionName).deleteOne(query);
            console.log("Document deleted successfully:", result.deletedCount);
        } catch (error) {
            console.error("Error deleting document:", error);
            throw error;
        }
    }

    async getAllDocuments(collectionName) {
        try {
            const result = await mongoose.connection.db.collection(collectionName).find({}).toArray();
            console.log("All documents:", result);
            return result;
        } catch (error) {
            console.error("Error getting all documents:", error);
            throw error;
        }
    }

    async deleteAllDocuments(collectionName) {
        try {
            const result = await mongoose.connection.db.collection(collectionName).deleteMany({});
            console.log("Documents deleted successfully:", result.deletedCount);
        } catch (error) {
            console.error("Error deleting documents:", error);
            throw error;
        }
    }

    closeConnection() {
        mongoose.connection.close();
        console.log("MongoDB connection closed.");
    }
}

module.exports = MongoClient;
