import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../api/app';
import { loginDetails, invalidId, validId } from '../mockdata/salesdata';

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
          expect(res).to.be.a.json;
          done();
        });
    });

    it('should return an error if id is invalid', (done) => {
      chai.request(app)
        .get(`/api/v1/sales/${invalidId}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('errors');
          done();
        });
    });
  });
});
