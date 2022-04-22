"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
var ObjectId = require("mongodb").ObjectId;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//connects to the DB and return db and client
const connectToDB = async () => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();
  const db = client.db("ecommerce");
  return { db, client };
};

// gets all items and return in data variable
const getAllItems = async (req, res) => {
  try {
    const { db, client } = await connectToDB();

    const data = await db.collection("items").find().toArray();

    // when there is a specific number of items you want to show on the FE
    const start = parseInt(req.params.start);
    const limit = parseInt(req.params.limit);
    const paginated = data.slice(start, start + limit);

    if (req.params.start && req.params.limit && data) {
      res.status(200).json({
        status: 200,
        paginated,
        message: "All items are shown with the requested pagination",
      });
    } else if (data && !start && !limit) {
      res
        .status(200)
        .json({ status: 200, data, message: "All items are shown" });
    } else {
      res.status(404).json({ status: 404, message: "No item can be found" });
    }
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

//gets all items with company details in it
const getItemsWithCompany = async (req, res) => {
  try {
    const { db, client } = await connectToDB();

    //merges items and companies collections by item id and return together
    const data = await db
      .collection("items")
      .aggregate([
        {
          $lookup: {
            from: "companies",
            localField: "companyId",
            foreignField: "_id",
            as: "companyDetails",
          },
        },
      ])
      .toArray();

    if (data) {
      res
        .status(200)
        .json({ status: 200, data, message: "All items are shown" });
    } else {
      res.status(404).json({ status: 404, message: "No item can be found" });
    }
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

//gets individual item by id and return in data variable
const getItem = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const { db, client } = await connectToDB();

    db.collection("items").findOne({ _id: id }, (err, result) => {
      result
        ? res
            .status(200)
            .json({ status: 200, message: "Item found!", data: result })
        : res.status(404).json({ status: 404, message: "Item not found!" });
      client.close();
    });
  } catch (err) {
    console.lop(err.stack);
  }
};

const getItemWithCompany = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const { db, client } = await connectToDB();

    //merges items collection with companies for specific item by its ID
    const data = await db
      .collection("items")
      .aggregate([
        { $match: { _id: id } },
        {
          $lookup: {
            from: "companies",
            localField: "companyId",
            foreignField: "_id",
            as: "companyDetails",
          },
        },
      ])
      .toArray();

    if (data) {
      res
        .status(200)
        .json({ status: 200, data, message: "All items are shown" });
    } else {
      res.status(404).json({ status: 404, message: "No item can be found" });
    }
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

// gets all companies and return in data variable
const getAllCompanies = async (req, res) => {
  try {
    const { db, client } = await connectToDB();

    const data = await db.collection("companies").find().toArray();

    if (data) {
      res
        .status(200)
        .json({ status: 200, data, message: "All companies are shown" });
    } else {
      res.status(404).json({ status: 404, message: "No company can be found" });
    }
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

//gets individual company by id and return in data variable
const getCompany = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const { db, client } = await connectToDB();

    db.collection("companies").findOne({ _id: id }, (err, result) => {
      result
        ? res
            .status(200)
            .json({ status: 200, message: "Company found!", data: result })
        : res.status(404).json({ status: 404, message: "Company not found!" });
      client.close();
    });
  } catch (err) {
    console.lop(err.stack);
  }
};

//get all companies in specific country
const getCompanyByCountry = async (req, res) => {
  const country =
    req.params.country.charAt(0).toUpperCase() +
    req.params.country.slice(1).toLowerCase();
  try {
    const { db, client } = await connectToDB();

    const data = await db.collection("companies").find({ country }).toArray();

    if (data) {
      res.status(200).json({
        status: 200,
        data,
        message: `All companies in ${country} are shown`,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: `No company can be found in ${country}`,
      });
    }
    client.close();
  } catch (err) {
    console.lop(err.stack);
  }
};
//gets all category names
const getAllCategories = async (req, res) => {
  try {
    const { db, client } = await connectToDB();
    const categoriesArr = new Set();
    const result = await db.collection("items").find().toArray();

    // created new Set to get only category names and avoid duplicates
    result.forEach((item) => categoriesArr.add(item.category));

    if (categoriesArr) {
      res.status(200).json({
        status: 200,
        data: [...categoriesArr],
        message: "All categories are shown",
      });
    } else {
      res
        .status(404)
        .json({ status: 404, message: "No category can be found" });
    }
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

//get all items by specific category. use req.query to reach items by specific filter
const getItemsByParam = async (req, res) => {
  const itemParamKey = Object.keys(req.query)[0].toLowerCase(); //gets key from query object
  const itemParam = Object.values(req.query)[0]; //gets value from query object
  const start = parseInt(req.params.start); //converts to integer because DB expects integer for that value
  const limit = parseInt(req.params.limit); //converts to integer because DB expects integer for that value

  try {
    const { db, client } = await connectToDB();
    const data = await db
      .collection("items")
      .find({ [itemParamKey]: itemParam })
      .toArray();
    if (req.params.start && req.params.limit && data) {
      const paginated = data.slice(start, start + limit);

      res.status(200).json({
        status: 200,
        paginated,
        message: "All items are shown with the requested pagination",
      });
    } else if (data && !start && !limit) {
      res.status(200).json({
        status: 200,
        data,
        message: `${itemParam} items are shown`,
      });
    } else {
      res
        .status(404)
        .json({ status: 404, message: `No item can be found in ${itemParam}` });
    }
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

//gets 6 random item from items collection
const getRandomItems = async (req, res) => {
  try {
    const { db, client } = await connectToDB();

    //this action gets 6 random sample from collection
    const data = await db
      .collection("items")
      .aggregate([{ $sample: { size: 6 } }])
      .toArray();

    if (data) {
      res.status(200).json({
        status: 200,
        data,
        message: "All companies are shown",
      });
    } else {
      res.status(404).json({ status: 404, message: "No company can be found" });
    }
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

const purchaseOrder = async (req, res) => {
  try {
    const { db } = await connectToDB();
    const data = await db.collection("orders").insertOne(req.body);

    //changes quantity in the stock
    await req.body.purchasedItems.forEach((item) => {
      db.collection("items").updateOne(
        { _id: item.itemId },
        { $inc: { numInStock: -item.quantity } }
      );
    });

    if (data.acknowledged) {
      res.status(200).json({
        status: 200,
        data,
        message: "Your purchase has been confirmed!",
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Something is wrong! Please try again.",
      });
    }
  } catch (err) {
    console.log(err.stack);
  }
};

const getOrder = async (req, res) => {
  const id = req.params.orderId;
  try {
    const { db } = await connectToDB();

    await db
      .collection("orders")
      .findOne({ _id: ObjectId(id) }, async (err, result) => {
        const ids = []; //purchased items' IDs

        if (result) {
          result.purchasedItems.map((item) => ids.push({ _id: item.itemId }));

          //finds items according to IDs in ids array
          const data = await db
            .collection("items")
            .aggregate([
              { $match: { $or: ids } },
              {
                $lookup: {
                  from: "companies",
                  localField: "companyId",
                  foreignField: "_id",
                  as: "companyDetails",
                },
              },
            ])
            .toArray();

          res.status(200).json({
            status: 200,
            message: "Order found!",
            itemData: data,
            result,
          });
        } else {
          res.status(404).json({ status: 404, message: "Order not found!" });
        }
      });
  } catch (err) {
    console.log(err.stack);
  }
};
//exports all the endpoints
module.exports = {
  getAllItems,
  getItem,
  getAllCompanies,
  getCompany,
  getCompanyByCountry,
  getAllCategories,
  getItemsByParam,
  getRandomItems,
  getItemsWithCompany,
  getItemWithCompany,
  purchaseOrder,
  getOrder,
};
