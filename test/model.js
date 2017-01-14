var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var expect = chai.expect;
var Model = require('../db').model;

chai.use(chaiHttp);

describe('Models', function(){
  
  before(function(done){
    Model.collection.drop();
    done();
  });
  
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
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.a('array');
      expect(res.body[0]).to.have.property('_id');
      expect(res.body[0]).to.have.property('name');
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
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.a.property('_id');
        expect(res.body).to.have.a.property('name');
        expect(res.body._id).to.equal(data.id);
        expect(res.body.name).to.equal(data.name)
        done();
      });
    });
  });
  
  it("POST should add a single model", function(done) {
    chai.request(server)
    .post('/api/models')
    .send({"name": "giant douche"})
    .end(function(err, res){
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property("success");
      expect(res.body.success).to.be.a('object');
      expect(res.body.success).to.have.property('name');
      expect(res.body.success.name).to.equal("giant douche");
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
        expect(response).to.have.status(200);
        expect(response).to.be.json;
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('updated');
        expect(response.body.updated).to.be.a('object');
        expect(response.body.updated).to.have.property('name');
        expect(response.body.updated).to.have.property('_id');
        expect(response.body.updated.name).to.equal('turd sandwich');
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
        expect(response).to.have.status(200);
        expect(response).to.be.json;
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('removed');
        expect(response.body.removed).to.be.a('object');
        done();
      });
    });
  });
});