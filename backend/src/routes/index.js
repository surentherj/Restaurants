"use strict";

const { trimRequest, reqFiltering } = require("../middleware/validate");
const productRoutes = require("./product.routes");
const userRoutes = require("./user.routes");
const listRoutes = require("./list.routes");
const ratingRoutes = require("./rating.routes");
const { addHeaders } = require("../middleware/authorize");

module.exports = (app) => {
  app.use(trimRequest);

  app.use(reqFiltering);

  app.use(addHeaders);

  app.use("/product", productRoutes);

  app.use("/user", userRoutes);

  app.use("/list", listRoutes);

  app.use("/rating", ratingRoutes);
};
