const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://pratikshapratap:mangodblogin@cluster0.ifldcsk.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB successfully!");
    await client.close();
  } catch (err) {
    console.error("❌ Connection failed:");
    console.error(err);
  }
}

run();