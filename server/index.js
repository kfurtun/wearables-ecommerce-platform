"use strict";

const express = require("express");
const morgan = require("morgan");
const {
  getAllItems,
  getItem,
  getAllCompanies,
  getCompany,
  getAllCategories,
  getItemsByParam,
  getRandomItems,
  getCompanyByCountry,
  getItemsWithCompany,
  getItemWithCompany,
  purchaseOrder,
  getOrder,
} = require("./handlers"); //import all endpoints

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints?
  .get("/api/items", getAllItems) // gets all items and return in data variable
  .get("/api/items/:start/:limit", getAllItems) // gets all items in the range
  .get("/api/item/:id", getItem) //gets individual item by id and return in data variable
  .get("/api/companies", getAllCompanies) // gets all companies and return in data variable
  .get("/api/company/:id", getCompany) //gets individual company by id and return in data variable
  .get("/api/companies/:country", getCompanyByCountry) //get all companies in specific country
  .get("/api/categories", getAllCategories) //gets all category names
  .get("/api/items/item", getItemsByParam) //get all items by specific category
  .get("/api/items/item/:start/:limit", getItemsByParam) //get all items by specific category in the range
  .get("/api/items/random", getRandomItems) //gets 6 random item from items collection
  .get("/api/items-with-company", getItemsWithCompany) //gets all items with company details in it
  .get("/api/item-with-company/:id", getItemWithCompany) //gets all items and joins with companies collection
  .post("/api/order", purchaseOrder) //post new order into DB
  .get("/api/order/:orderId", getOrder) //gets the specific order by orderId

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
