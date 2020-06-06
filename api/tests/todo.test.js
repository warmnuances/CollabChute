const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require("../../server"); 
const should = chai.should();

const basePath = "/v1/api";


chai.use(chaiHttp);


describe('/Post SignIn', () => {
  it('body should be valid', (done)=>{
    chai.request(server)
      .post(basePath + "/user/signin")
      .send({
        email: "admin@gmail.com",
        password: "123456"
      })
      .end((err,res) =>{
        res.should.have.status(200);
        res.body.should.have.property('id');
        res.body.should.have.property('email');
        res.body.should.have.property('roles');

        const { roles } = res.body;
        roles.should.be.a('array');

        done();
  
      })
  })
})