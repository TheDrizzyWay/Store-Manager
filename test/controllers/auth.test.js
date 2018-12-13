import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../api/app';
import {
  missingFieldLogin, notExistLogin, wrongPassword, correctLogin,
} from '../mockdata/authdata';

chai.use(chaiHttp);

describe('Authentication', () => {
  describe('login', () => {
    it('should return 400 if one or more fields are missing', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(missingFieldLogin)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(400);
          expect(res.body.success).to.equal(false);
          expect(res.body).to.have.property('data');
          return done();
        });
    });

    it('should return 401 if user account not found', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(notExistLogin)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(401);
          expect(res.body.success).to.equal(false);
          expect(res.body).to.have.property('message');
          return done();
        });
    });

    it('should return 401 if password is incorrect', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(wrongPassword)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(401);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.eql('Invalid email/password combination.');
          return done();
        });
    });

  /*  it('should return 200 for successfull login', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(correctLogin)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res.body.success).to.equal(true);
          expect(res.body).to.have.property('token');
          return done();
        });
    }); */
  });
});
