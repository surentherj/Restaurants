"use strict";
const ratingService = require("../services/rating.service");

exports.addrating = async (req, res) => {
  ratingService
    .addrating(req.body, req.headers.userid)
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      res.status(err.status || 500).json({
        message: err.message || `Error in adding a record`,
      });
    });
};

exports.updaterating = async (req, res) => {
  ratingService
    .updaterating(req.body)
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      res.status(err.status || 500).json({
        message: err.message || `Error in updating a record`,
      });
    });
};

exports.getratings = async (req, res) => {
  ratingService
    .getratings(req.query.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      res.status(err.status || 500).json({
        message: err.message || `Error in getting record of ratings`,
      });
    });
};

exports.deleterating = async (req, res) => {
  ratingService
    .deleterating(req.query.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      res.status(err.status || 500).json({
        message: err.message || `Error in deleting a record`,
      });
    });
};
