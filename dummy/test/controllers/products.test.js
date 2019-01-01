import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../api/app';
import { loginDetails, product1, invalidId, validId, testProd } from '../mockdata/productsdata';

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

describe('Products', () => {
  describe('POST /products - Create new product', () => {
    it('should create a new product', (done) => {
      chai.request(app)
        .post('/api/v1/products')
        .send(product1)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(201);
          expect(res.body.data.name).equal('adidas x');
          done();
        });
    });

    it('should not create a product with invalid data', (done) => {
      chai.request(app)
        .post('/api/v1/products')
        .send({ a: 1 })
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('GET /products - Get all products', () => {
    it('should fetch all products', (done) => {
      chai.request(app)
        .get('/api/v1/products')
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.a.json();
          done();
        });
    });
  });

  describe('GET /products/:productId - Get product by id', () => {
    it('should fetch a particular product', (done) => {
      chai.request(app)
        .get(`/api/v1/products/${validId}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.a.json();
          done();
        });
    });

    it('should return an error if id is invalid', (done) => {
      chai.request(app)
        .get(`/api/v1/products/${invalidId}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(404);
          expect(res).to.be.a.json;
          done();
        });
    });
  });

  describe('PUT /products/products - Update a product', () => {
    it('should update product information', (done) => {
      chai.request(app)
        .put(`/api/v1/products/${validId}`)
        .send(testProd)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res.body.data.price).equal('20000');
          done();
        });
    });

    it('should return an error if id is invalid', (done) => {
      chai.request(app)
        .put(`/api/v1/products/${invalidId}`)
        .send(testProd)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(404);
          expect(res).to.be.a.json;
          done();
        });
    });
  });

  describe('DELETE /products/:productsId - Delete a product', () => {
    it('should delete a product', (done) => {
      chai.request(app)
        .del(`/api/v1/products//${validId}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(204);
          done();
        });
    });

    it('should return an error if id is invalid', (done) => {
      chai.request(app)
        .del(`/api/v1/products/${invalidId}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(404);
          expect(res).to.be.a.json();
          done();
        });
    });
  });
});
