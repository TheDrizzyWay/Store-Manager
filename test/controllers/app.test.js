import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../api/app';

chai.use(chaiHttp);

describe('App', () => {
  describe('GET / - API welcome page', () => {
    it('Should display welcome page', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          return done();
        });
    });
  });

  describe('GET /* - Non-existent routes', () => {
    it('Should display an error for non-existent routes', (done) => {
      chai.request(app)
        .get('/whatever2')
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(404);
          return done();
        });
    });
  });
});

// "pretest": "npm run migrations && npm run seed",
