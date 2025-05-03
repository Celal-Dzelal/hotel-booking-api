"use strict";

/*//! ---------------------------- Initial Commands ---------------------------- */

//* npm init -y
//* npm i express dotenv mongoose
//* npm i morgan swagger-autogen swagger-ui-express redoc-express zod
//* mkdir logs
//* node swaggerAutogen.js
//* nodemon or npm starts
//* npm i jsonwebtoken nodemailer multer

const express = require("express");
const app = express();

/*//! ---------------------------- Required Modules ---------------------------- */

require("dotenv").config();
const PORT = process.env?.PORT || 8000;

/*//! ----------------------------- Configurations ----------------------------- */

const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/*//! ------------------------------- Middlewares ------------------------------ */

app.use(express.json());

app.use(require("./src/middlewares/logger"));

// app.use(require('./src/middlewares/authentication'))

app.use(require("./src/middlewares/queryHandler"));

/*//! --------------------------------- Routes --------------------------------- */

app.use("/", require("./src/routes"));

app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to PIZZA API",
    docs: {
      swagger: "/document/swagger",
      redoc: "/document/redoc",
      json: "/document/json",
    },
    user: req.user,
  });
});

/*//! ------------------------------ errorHandler ------------------------------ */

app.use(require("./src/middlewares/errorHandler"));

/*//! ------------------------------- Run Server ------------------------------- */

app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/*//! ----------------------------- Syncronization ----------------------------- */

// require('./src/helpers/sync')() //? It clear database.(must be in commentLine)
