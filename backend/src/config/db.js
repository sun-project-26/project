const mongoose = require('mongoose');
const { MONGODB_URI, AUTO_FALLBACK_TO_MOCK } = require('./env');

let isMongoConnected = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 2500 // Don't hang if Mongo isn't running
    });
    isMongoConnected = true;
    console.log(`\x1b[32m✔ [Database] MongoDB Connected: ${conn.connection.host}\x1b[0m`);
    return true;
  } catch (error) {
    isMongoConnected = false;
    if (AUTO_FALLBACK_TO_MOCK) {
      console.log(`\x1b[33m⚡ [Database] MongoDB not reachable at ${MONGODB_URI}.\x1b[0m`);
      console.log(`\x1b[32m✔ [Database] Active: Standalone In-Memory Resilient Store initialized!\x1b[0m`);
    } else {
      console.error(`\x1b[31m✖ [Database] MongoDB Error: ${error.message}\x1b[0m`);
    }
    return false;
  }
};

const getDBStatus = () => (isMongoConnected ? 'connected (mongodb)' : 'active (in-memory mock store)');
const isUsingMongo = () => isMongoConnected;

module.exports = {
  connectDB,
  getDBStatus,
  isUsingMongo
};
