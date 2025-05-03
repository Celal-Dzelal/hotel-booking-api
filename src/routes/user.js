"use strict";

const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const { userCreateSchema, userUpdateSchema } = require("../models/zod");
const {
  list,
  create,
  read,
  update,
  deleteUser,
} = require("../controllers/user");

router.post("/", validate(userCreateSchema), create);
router.put("/:id", validate(userUpdateSchema), update);

router.get("/", list);
router.get("/:id", read);
router.delete("/:id", deleteUser);

module.exports = router;
