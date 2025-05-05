"use strict";

const router = require("express").Router();

router.all("/", (req, res) => {
  res.send({
    swagger: "/documents/swagger",
    redoc: "/documents/redoc",
    json: "/documents/json",
  });
});

router.use("/json", (req, res) => {
  res.sendFile("/src/configs/swagger.json", { root: "." });
});

const redoc = require("redoc-express");
router.use("/redoc", redoc({ specUrl: "/documents/json", title: "API Docs" }));

const swaggerUi = require("swagger-ui-express");
router.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(require("../configs/swagger.json"), {
    swaggerOptions: { persistAuthorization: true },
  })
);

module.exports = router;
