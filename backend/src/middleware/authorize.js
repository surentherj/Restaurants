"use strict";
const jwt = require("jwt-decode");
const config = require("../config/config");

function isTokenExpired(decoded) {
  try {
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (decoded?.exp < currentTimestamp) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return true;
  }
}

exports.addHeaders = async (req, res, next) => {
  if (req?.headers?.authorization) {
    const auth = req.headers.authorization;
    const token = auth.split(" ")[1];
    const decoded = jwt(token);
    req.headers["username"] = decoded?.unique_name;
    req.headers["useremail"] = decoded?.given_name;
    req.headers["userid"] = decoded?.user_id;
    req.headers["roleid"] = decoded?.roleid;
  }
  next();
};

exports.authorize = async (req, res, next) => {
  if (req?.headers?.authorization) {
    const auth = req.headers.authorization;
    const token = auth.split(" ")[1];
    const decoded = jwt(token);
    if (isTokenExpired(decoded)) {
      return res
        .status(500)
        .json({ code: "logout", error: "Bearer Token Expired" });
    }
  }
  next();
};

exports.checkRoleAccess = (category, permission) => async (req, res, next) => {
  let roleId = req.headers.roleid;
  let privileges = config?.roles?.[roleId].privileges;
  if (!privileges?.[category]?.[permission]) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
