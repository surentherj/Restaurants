"use strict";

const express = require("express");
const router = express.Router();

const ratingController = require("../controllers/rating.controller");
const { authorize, checkRoleAccess } = require("../middleware/authorize");

router.post(
  "/addrating",
  authorize,
  checkRoleAccess("review", "create"),
  ratingController.addrating
);

router.post(
  "/updaterating",
  authorize,
  checkRoleAccess("review", "update"),
  ratingController.updaterating
);

router.get(
  "/getratings",
  checkRoleAccess("review", "read"),
  authorize,
  ratingController.getratings
);

router.delete(
  "/deleterating",
  checkRoleAccess("review", "delete"),
  authorize,
  ratingController.deleterating
);

module.exports = router;
