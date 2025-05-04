"use strict";

const router = require("express").Router();
const { login, logout, refresh } = require("../controllers/auth");

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);

module.exports = router;
