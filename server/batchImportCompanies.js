const file = require("file-system");
const fs = require("fs");
const { MongoClient } = require("mongodb");
const assert = require("assert");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const companies = JSON.parse(fs.readFileSync("data/companies.json"));

const batchImport = async () => {
  const client = await new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("ecommerce");

    const newCompanies = await db.collection("companies").insertMany(companies);
    assert.equal(1, newCompanies.insertedCount);
  } catch (err) {
    console.log(err);
  }

  client.close();
};

batchImport();
