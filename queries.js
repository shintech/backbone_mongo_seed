var Model = require("./db").model;

function getAllModels(req, res){
  Model.find(function(err, model){
    if (err){ res.send(err); }
    res.json(model);
  });
}

function getSingleModel(req, res){
  Model.findById(req.params.id, function(err, model){
    if (err){ res.send(err); }
    res.status(200)
    .json(model);
  });
}

function createModel(req, res){
  var model = new Model();
  model.name = req.body.name;
  model.save(function(err){
    res.status(200)
      .json({ success: model, message: "Created one model...", })
  })
}

function updateModel(req, res){
  Model.findById(req.params.id, function(err, model){
    if (err){ res.send(err) }
    model.name = req.body.name;
    model.save(function(err){
      if (err){ res.send(err); }
      res.json({ updated: model, message: "Model updated..."});
    });
  });
  
}

function removeModel(req, res){
  Model.remove({
    _id: req.params.id
  }, function(err, model){
    if (err){
      res.send(err)
    }
    res.json({ removed: model, message: 'Model deleted...'})
  })
}

module.exports = {
  getAllModels: getAllModels,
  getSingleModel: getSingleModel,
  createModel: createModel,
  updateModel: updateModel,
  removeModel: removeModel
};