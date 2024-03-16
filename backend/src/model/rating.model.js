"use strict";

const mongoose = require("mongoose");

const config = require("../config/config");

const conn = mongoose.createConnection(
  config.mongoDB.DB_URI,
  config.mongoDB.OPTIONS
);

const toJSON = require("./plugins/toJson.plugin");
const users = require("./user.model");
const lists = require("./list.model");

const ratingSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    list: {
      type: mongoose.Schema.Types.ObjectId,
      ref: lists,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: users,
    },
    reply: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ratings",
    },
  },
  {
    timestamps: true,
  }
);

ratingSchema.plugin(toJSON);

const ratings = conn.model("ratings", ratingSchema);

module.exports = ratings;
