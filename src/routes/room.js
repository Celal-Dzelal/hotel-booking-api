"use strict";

const router = require("express").Router();
const {
  list,
  create,
  read,
  update,
  deleteRoom,
} = require("../controllers/room");

const upload = require("../middlewares/upload");

router.route("/").get(list).post(upload.array("image")).post(create);

router.route("/:id").get(read).put(update).delete(deleteRoom);

module.exports = router;
