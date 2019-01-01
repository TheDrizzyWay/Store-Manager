import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../api/app';
import { loginDetails, category1, invalidId, validId, testCat } from '../mockdata/categoriesdata';

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

describe('Categories', () => {
  describe('POST /categories - Create new category', () => {
    it('should create a new category', (done) => {
      chai.request(app)
        .post('/api/v1/categories')
        .send(category1)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(201);
          expect(res.body.data.name).equal('predator series');
          done();
        });
    });

    it('should not create a category with invalid data', (done) => {
      chai.request(app)
        .post('/api/v1/categories')
        .send({ a: 1 })
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('GET /categories - Get all categories', () => {
    it('should fetch all categories', (done) => {
      chai.request(app)
        .get('/api/v1/categories')
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.a.json();
          done();
        });
    });
  });

  describe('GET /categories/:categoryId - Get category by id', () => {
    it('should fetch a particular category', (done) => {
      chai.request(app)
        .get(`/api/v1/categories/${validId}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.a.json();
          done();
        });
    });

    it('should return an error if id is invalid', (done) => {
      chai.request(app)
        .get(`/api/v1/categories/${invalidId}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(404);
          expect(res).to.be.a.json();
          done();
        });
    });
  });

  describe('PUT /categories/:categoryId - Update a category', () => {
    it('should update category information', (done) => {
      chai.request(app)
        .put(`/api/v1/categories/${validId}`)
        .send(testCat)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res.body.data.name).equal('new name');
          done();
        });
    });

    it('should return an error if id is invalid', (done) => {
      chai.request(app)
        .put(`/api/v1/categories/${invalidId}`)
        .send(testCat)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(404);
          expect(res).to.be.a.json();
          done();
        });
    });
  });

  describe('DELETE /categories/:categoryId - Delete a category', () => {
    it('should delete a category', (done) => {
      chai.request(app)
        .del(`/api/v1/categories/${validId}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(204);
          done();
        });
    });

    it('should return an error if id is invalid', (done) => {
      chai.request(app)
        .del(`/api/v1/categories/${invalidId}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(404);
          expect(res).to.be.a.json();
          done();
        });
    });
  });
});
