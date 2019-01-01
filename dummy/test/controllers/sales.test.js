import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../api/app';
import { loginDetails, invalidId, validId, saleOrder1, saleOrder2 } from '../mockdata/salesdata';
import { adminRole } from '../../api/v1/models/usermodel';

chai.use(chaiHttp);

beforeEach((done) => {
  chai.request(app)
    .post('/api/v1/users/login')
    .send(loginDetails)
    .end((err, res) => {
      if (err) return done(err);
      done();
    });
});

afterEach((done) => {
  chai.request(app)
    .get('/api/v1/users/logout')
    .end((err, res) => {
      if (err) return done(err);
      done();
    });
});

describe('Sales', () => {
  describe('POST /sales - Create new sale order', () => {
    it('should create a new sale order', (done) => {
      adminRole.splice(0, 1);
      chai.request(app)
        .post('/api/v1/sales')
        .send(saleOrder1)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(201);
          expect(res.body.data.name).equal('adidas x');
          done();
        });
    });

    it('should not create a sale order with invalid data', (done) => {
      adminRole.splice(0, 1);
      chai.request(app)
        .post('/api/v1/sales')
        .send({ a: 1 })
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should not create a sale order with excess quantity', (done) => {
      adminRole.splice(0, 1);
      chai.request(app)
        .post('/api/v1/sales')
        .send(saleOrder2)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(422);
          expect(res).to.be.a.json;
          done();
        });
    });
  });

  describe('GET /sales - Get all sales', () => {
    it('should fetch all sales records', (done) => {
      chai.request(app)
        .get('/api/v1/sales')
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.a.json;
          done();
        });
    });
  });

  describe('GET /sales/:salesId - Get sales record by id', () => {
    it('should fetch a particular sales record', (done) => {
      chai.request(app)
        .get(`/api/v1/sales/${validId}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.a.json();
          done();
        });
    });

    it('should return an error if id is invalid', (done) => {
      chai.request(app)
        .get(`/api/v1/sales/${invalidId}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(404);
          expect(res).to.be.a.json();
          done();
        });
    });
  });
});
