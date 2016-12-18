var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
var Model = require('../db/models/Model');

chai.use(chaiHttp);

describe('Models', function(){
  
  Model.collection.drop();
  
  beforeEach(function(done){
    var newModel = new Model({
      name: "giant douche",
    });
    newModel.save(function(err){
      done();
    });
  });
  
  afterEach(function(done){
    Model.collection.drop();
    done();
  });
  
  it('GET should list All models at /api/models', function(done){
    chai.request(server)
    .get('/api/models')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.have.property('_id');
      res.body[0].should.have.property('name');
      done();
    });
  });
  
  it('GET should list a SINGLE model at /api/model/:id ', function(done) {
    var newModel = new Model({
      name: "giant douche",
    });
    newModel.save(function(err, data){
      chai.request(server)
      .get('/api/models/' + data.id)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.a.property('_id');
        res.body.should.have.a.property('name');
        res.body._id.should.equal(data.id);
        done();
      });
    });
  });
  
  it("POST should add a single model", function(done) {
    chai.request(server)
    .post('/api/models')
    .send({"name": "giant douche"})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property("success");
      res.body.success.should.be.a('object');
      res.body.success.should.have.property('name');
      res.body.success.name.should.equal("giant douche");
      done();
    });
  });
  
  it('PUT should update a single model at /api/models/:id', function(done) {
    chai.request(server)
    .get('/api/models')
    .end(function(err, res){
      chai.request(server)
      .put('/api/models/' + res.body[0]._id)
      .send({"name": "turd sandwich"})
      .end(function(error, response){
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('updated');
        response.body.updated.should.be.a('object');
        response.body.updated.should.have.property('name');
        response.body.updated.should.have.property('_id');
        response.body.updated.name.should.equal('turd sandwich');
        done();
      });
    });
  });
  
  it('DELETE should delete a single model at /api/models/:id', function(done) {
    chai.request(server)
    .get("/api/models")
    .end(function(err, res){
      chai.request(server)
      .delete("/api/models/" + res.body[0]._id)
      .end(function(error, response){
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('removed');
        response.body.removed.should.be.a('object');
        done();
      });
    });
  });
});