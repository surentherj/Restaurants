"use strict";

const mongoose = require("mongoose");

const config = require("../config/config");

const conn = mongoose.createConnection(
  config.mongoDB.DB_URI,
  config.mongoDB.OPTIONS
);

const toJSON = require("./plugins/toJson.plugin");

const listSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
    },
    nonVeg: {
      type: Boolean,
      default: false,
    },
    costPerPerson: {
      type: Number,
      default: 0,
    },
    imageUrl: {
      type: String,
      default:
        "https://www.shutterstock.com/image-photo/restaurant-chilling-out-classy-lifestyle-260nw-507639565.jpg",
    },
  },
  {
    timestamps: true,
  }
);

listSchema.plugin(toJSON);

const lists = conn.model("lists", listSchema);

module.exports = lists;
