import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../api/app';
import { loginDetails, user1, user2, invalidId, validId, testMail, testMail2 } from '../mockdata/usersdata';

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

describe('Users', () => {
  describe('POST /users - Create new user', () => {
    it('should create a new user', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send(user1)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(201);
          expect(res.body.data.firstName).equal('Carl');
          done();
        });
    });

    it('should not create a user with invalid data', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send({ a: 1 })
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should not create a user with an already existing email', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send(user2)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(401);
          expect(res).to.be.a.json();
          done();
        });
    });
  });

  describe('GET /users - Get all users', () => {
    it('should fetch all users', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.a.json();
          done();
        });
    });
  });

  describe('GET /users/:userId - Get user by id', () => {
    it('should fetch a particular user', (done) => {
      chai.request(app)
        .get(`/api/v1/users/${validId}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.a.json();
          done();
        });
    });

    it('should return an error if id is invalid', (done) => {
      chai.request(app)
        .get(`/api/v1/users/${invalidId}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(404);
          expect(res).to.be.a.json();
          done();
        });
    });
  });

  describe('PUT /users/:userId - Update a user', () => {
    it('should update user information', (done) => {
      chai.request(app)
        .put(`/api/v1/users/${validId}`)
        .send(testMail)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res.body.data.email).equal('tonycee@gmail.com');
          done();
        });
    });

    it('should return an error if id is invalid', (done) => {
      chai.request(app)
        .put(`/api/v1/users/${invalidId}`)
        .send(testMail)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(404);
          expect(res).to.be.a.json;
          done();
        });
    });
  });

  describe('DELETE /users/:userId - Delete a user', () => {
    it('should delete a user', (done) => {
      chai.request(app)
        .del(`/api/v1/users/${validId}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(204);
          done();
        });
    });

    it('should return an error if id is invalid', (done) => {
      chai.request(app)
        .del(`/api/v1/users/${invalidId}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(404);
          expect(res).to.be.a.json;
          done();
        });
    });
  });

  describe('POST /users/login - Log in the user', () => {
    it('should log the user into his application account', (done) => {
      chai.request(app)
        .get('/api/v1/users/logout')
        .end((err, res) => {
          if (err) return done(err);
          chai.request(app)
            .post('/api/v1/users/login')
            .send(loginDetails);
          expect(res).to.have.status(200);
          expect(res).to.be.a.json;
          done();
        });
    });

    it('should not log in a user with invalid details', (done) => {
      chai.request(app)
        .get('/api/v1/users/logout')
        .end((err, res) => {
          if (err) return done(err);
          chai.request(app)
            .post('/api/v1/users/login')
            .send(testMail2)
            .end((err, res) => {
              if (err) return done(err);
              expect(res).to.have.status(401);
              expect(res).to.be.a.json;
              done();
            });
        });
    });
  });

  describe('GET /users/logout - Log out the user', () => {
    it('should log the user out of the application', (done) => {
      chai.request(app)
        .get('/api/v1/users/logout')
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('GET / - Home Page', () => {
    it('should take the user to the home page', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
