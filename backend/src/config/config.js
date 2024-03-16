"use strict";

module.exports = {
  app: {
    title: "Online Restaurant Review",
    version: "1.0.0",
    description: "Restauransts Listing And Review Management",
    url: process.env.REDIRECT_URL,
  },
  hostname: "localhost",
  mongoDB: {
    DB_URI: process.env.MONGODB_URI.replace("WebOrigin", process.env.WebOrigin),
    OPTIONS: {},
  },
  mailer: {
    smtpPort: 587,
    smtpServer: process.env.SMTP_SERVER,
    usermail: process.env.SMTP_MAIL_ID,
    password: process.env.SMTP_MAIL_PASSWORD,
  },
  roles: {
    1: {
      roleName: "Business Owner",
      privileges: {
        listing: {
          create: true,
          read: true,
          update: true,
          delete: false,
        },
        review: {
          create: false,
          read: true,
          update: true,
          delete: false,
        },
      },
    },
    2: {
      roleName: "User",
      privileges: {
        listing: {
          create: false,
          read: true,
          update: false,
          delete: false,
        },
        review: {
          create: true,
          read: true,
          update: true,
          delete: true,
        },
      },
    },
    3: {
      roleName: "Admin",
      privileges: {
        listing: {
          create: true,
          read: true,
          update: true,
          delete: true,
        },
        review: {
          create: true,
          read: true,
          update: true,
          delete: true,
        },
      },
    },
  },
};
