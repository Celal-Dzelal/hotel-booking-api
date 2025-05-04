"use strict";

const Token = require("../models/token");

module.exports = {
  list: async (req, res) => {
    /*
        #swagger.ignore=true
    */
    const result = await res.getModelList(Token);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Token),
      result,
    });
  },
  create: async (req, res) => {
    /*
        #swagger.ignore=true
    */
    const result = await Token.create(req.body);
    res.status(200).send({
      error: false,
      result,
    });
  },
  read: async (req, res) => {
    /*
        #swagger.ignore=true
    */
    const result = await Token.findById(req.params.id);
    res.status(200).send({
      error: false,
      result,
    });
  },
  update: async (req, res) => {
    /*
        #swagger.ignore=true
    */
    const result = await Token.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    res.status(202).send({
      error: false,
      result,
    });
  },
  deleteToken: async (req, res) => {
    /*
        #swagger.ignore=true
    */
    const result = await Token.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(204).end();
    }
    return res.status(404).send({
      error: true,
      message: "Token not found or already deleted",
    });
  },
};
