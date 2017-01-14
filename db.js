var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var config = require("./_config");

mongoose.Promise = require('bluebird');

var environment = process.env.NODE_ENV || 'development';
var connectionString = config.mongoURI[environment];

mongoose.connect(connectionString, function(err, res){
  if (err){
    console.log("Error: " + err);
  } else if (environment === 'development'){
      console.log("Connected to database: " + connectionString);
  }
});

var ModelSchema = new Schema({
  name: String
});

var Model = mongoose.model('Model', ModelSchema);

module.exports = {
  model: Model
};