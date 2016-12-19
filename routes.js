var express = require("express");
var router = express.Router();
var db = require("./queries");

router.route("/models")
  .get(db.getAllModels)
  .post(db.createModel)

router.route("/models/:id")
  .get(db.getSingleModel)
  .put(db.updateModel)
  .delete(db.removeModel)

module.exports = router;