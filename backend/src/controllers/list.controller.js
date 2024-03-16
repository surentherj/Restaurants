"use strict";
const listService = require("../services/list.service");

exports.addlist = async (req, res) => {
  listService
    .addlist(req.body)
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      res.status(err.status || 500).json({
        message: err.message || `Error in adding a record`,
      });
    });
};

exports.updatelist = async (req, res) => {
  listService
    .updatelist(req.body)
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      res.status(err.status || 500).json({
        message: err.message || `Error in updating a record`,
      });
    });
};

exports.getLists = async (req, res) => {
  listService
    .getLists(req.body)
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      res.status(err.status || 500).json({
        message: err.message || `Error in getting record of lists`,
      });
    });
};

exports.deleteList = async (req, res) => {
  listService
    .deleteList(req.query.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      res.status(err.status || 500).json({
        message: err.message || `Error in deleting a record`,
      });
    });
};

exports.getDashboardData = async (req, res) => {
  listService
    .getDashboardData()
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      res.status(err.status || 500).json({
        message: err.message || `Error in get Dashboard Data`,
      });
    });
};
