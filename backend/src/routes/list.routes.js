"use strict";

const express = require("express");
const router = express.Router();

const listController = require("../controllers/list.controller");
const { authorize, checkRoleAccess } = require("../middleware/authorize");

router.post(
  "/addlist",
  authorize,
  checkRoleAccess("listing", "create"),
  listController.addlist
);

router.post(
  "/updatelist",
  authorize,
  checkRoleAccess("listing", "update"),
  listController.updatelist
);

router.post(
  "/getLists",
  checkRoleAccess("listing", "read"),
  authorize,
  listController.getLists
);

router.delete(
  "/deleteList",
  checkRoleAccess("listing", "delete"),
  authorize,
  listController.deleteList
);

router.get("/dashboardData", authorize, listController.getDashboardData);

module.exports = router;
