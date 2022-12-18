var assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
const server = require('../index');
const removeUser = require('../controllers/userController').removeUser;

chai.use(chaiHttp);

describe('Testing backend of users', function () {
  describe('Checking Login...', () => {
    it('correct credentials', (done) => {
      let loginCred = { email: 'luffy@gmail.com', password: 'luffy' };
      chai
        .request(server)
        .post('/api/users/login')
        .send(loginCred)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('token');
          res.body.email.should.equal('luffy@gmail.com');
          done();
        });
    });

    it('wrong password', (done) => {
      let loginCred = { email: 'luffy@gmail.com', password: 'fluffy' };
      chai
        .request(server)
        .post('/api/users/login')
        .send(loginCred)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('message');
          res.body.message.should.equal('Invalid email or password');
          done();
        });
    });

    it('user does not exist', (done) => {
      let loginCred = { email: 'luffy1@email.com', password: 'fluffy' };
      chai
        .request(server)
        .post('/api/users/login')
        .send(loginCred)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('message');
          res.body.message.should.equal('Invalid email or password');
          done();
        });
    });
  });

  describe('Checking Register...', () => {
    afterEach(function () {
      removeUser('tester123@email.com');
    });

    it('correct credentials', (done) => {
      let registerCred = {
        username: 'tester123',
        email: 'tester123@email.com',
        password: 'tester123',
      };
      chai
        .request(server)
        .post('/api/users/register')
        .send(registerCred)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('token');
          res.body.email.should.equal('tester123@email.com');
          done();
        });
    });

    it('account already exists', (done) => {
      let registerCred = {
        username: 'tester123',
        email: 'luffy@email.com',
        password: 'tester123',
      };
      chai
        .request(server)
        .post('/api/users/register')
        .send(registerCred)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message');
          res.body.message.should.equal('User already exists');
          done();
        });
    });
  });
});
