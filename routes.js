var express = require("express");
var router = express.Router();
var time = require("./helpers").time;
var db = require("./queries");

if (process.env.NODE_ENV === 'development'){
  router.use(function(req, res, next){
    var d = new Date();
    var connection = req.connection.remoteAddress.split(":");
    var connectionString = connection[connection.length - 1];
    console.log("%s - %s - %s => %s", connectionString, time.currentTime(d), req.url, req.method);
    next();
  });
}

router.route("/models")
  .get(db.getAllModels)
  .post(db.createModel)

router.route("/models/:id")
  .get(db.getSingleModel)
  .put(db.updateModel)
  .delete(db.removeModel)

module.exports = router;