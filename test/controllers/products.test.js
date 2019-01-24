import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../api/app';
import { correctLogin } from '../mockdata/authdata';
import {
  invalidProduct, wrongProduct, existingProduct, validProduct,
  notExistId, validId, updateProduct, missingProduct,
  updateProduct2,
} from '../mockdata/productdata';

chai.use(chaiHttp);
let adminToken;

describe('Products', () => {
  before(async () => {
    const response = await chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(correctLogin);

    adminToken = response.body.token;
  });

  describe('POST /products', () => {
    it('should return 400 if one or more fields are missing', async () => {
      const res = await chai.request(app)
        .post('/api/v1/products')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(invalidProduct);

      expect(res).to.have.status(400);
      expect(res.body.success).to.equal(false);
    });

    it('should return 400 if fields contain invalid details', async () => {
      const res = await chai.request(app)
        .post('/api/v1/products')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(wrongProduct);

      expect(res).to.have.status(400);
      expect(res.body.success).to.equal(false);
      expect(res.body).to.have.property('data');
    });

    it('should return 400 if product already exists', async () => {
      const res = await chai.request(app)
        .post('/api/v1/products')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(existingProduct);

      expect(res).to.have.status(400);
      expect(res.body.success).to.equal(false);
      expect(res.body.message).to.eql('This product already exists.');
    });

    it('should return 201 for successfull creation', async () => {
      const res = await chai.request(app)
        .post('/api/v1/products')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(validProduct);

      expect(res).to.have.status(201);
      expect(res.body.success).to.equal(true);
      expect(res.body).to.have.property('data');
    });
  });

  describe('GET /products', () => {
    it('should get all products and return 200', async () => {
      const res = await chai.request(app)
        .get('/api/v1/products')
        .set({ Authorization: `Bearer ${adminToken}` });

      expect(res).to.have.status(200);
      expect(res.body.success).to.equal(true);
      expect(res.body).to.have.property('data');
    });
  });

  describe('GET /products/records/:id', () => {
    it('should return 400 if id does not exist', async () => {
      const res = await chai.request(app)
        .get(`/api/v1/products/records/${notExistId}`)
        .set({ Authorization: `Bearer ${adminToken}` });

      expect(res).to.have.status(400);
      expect(res.body.success).to.equal(false);
    });

    it('should get a product records and return 200', async () => {
      const res = await chai.request(app)
        .get(`/api/v1/products/records/${validId}`)
        .set({ Authorization: `Bearer ${adminToken}` });

      expect(res).to.have.status(200);
      expect(res.body.success).to.equal(true);
    });
  });

  describe('GET /products/:id', () => {
    it('should return 400 if id does not exist', async () => {
      const res = await chai.request(app)
        .get(`/api/v1/products/${notExistId}`)
        .set({ Authorization: `Bearer ${adminToken}` });

      expect(res).to.have.status(400);
      expect(res.body.success).to.equal(false);
    });

    it('should get a product and return 200', async () => {
      const res = await chai.request(app)
        .get(`/api/v1/products/${validId}`)
        .set({ Authorization: `Bearer ${adminToken}` });

      expect(res).to.have.status(200);
      expect(res.body.success).to.equal(true);
      expect(res.body).to.have.property('data');
    });
  });

  describe('PUT /products/:id', () => {
    it('should return 400 if all fields are missing', async () => {
      const res = await chai.request(app)
        .put(`/api/v1/products/${validId}`)
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(missingProduct);

      expect(res).to.have.status(400);
      expect(res.body.success).to.equal(false);
    });

    it('should return 400 if fields contain invalid details', async () => {
      const res = await chai.request(app)
        .put(`/api/v1/products/${validId}`)
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(wrongProduct);

      expect(res).to.have.status(400);
      expect(res.body.success).to.equal(false);
      expect(res.body).to.have.property('data');
    });

    it('should return 400 if product name already exists', async () => {
      const res = await chai.request(app)
        .put(`/api/v1/products/${validId}`)
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(existingProduct);

      expect(res).to.have.status(400);
      expect(res.body.success).to.equal(false);
      expect(res.body.message).to.eql('This product already exists.');
    });

    it('should return 400 if id does not exist', async () => {
      const res = await chai.request(app)
        .put(`/api/v1/products/${notExistId}`)
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(updateProduct);

      expect(res).to.have.status(400);
      expect(res.body.success).to.equal(false);
    });

    it('should update a product and return 200', async () => {
      const res = await chai.request(app)
        .put(`/api/v1/products/${validId}`)
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(updateProduct);

      expect(res).to.have.status(200);
      expect(res.body.success).to.equal(true);
      expect(res.body).to.have.property('data');
    });

    it('should perform partial updating successfully', async () => {
      const res = await chai.request(app)
        .put(`/api/v1/products/${validId}`)
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(updateProduct2);

      expect(res).to.have.status(200);
      expect(res.body.success).to.equal(true);
      expect(res.body).to.have.property('data');
    });
  });

  describe('DELETE /products/:id', () => {
    it('should return 400 if id does not exist', async () => {
      const res = await chai.request(app)
        .delete(`/api/v1/products/${notExistId}`)
        .set({ Authorization: `Bearer ${adminToken}` });

      expect(res).to.have.status(400);
      expect(res.body.success).to.equal(false);
    });

    it('should delete a product and return 200', async () => {
      const res = await chai.request(app)
        .delete(`/api/v1/products/${validId}`)
        .set({ Authorization: `Bearer ${adminToken}` });

      expect(res).to.have.status(200);
      expect(res.body.success).to.equal(true);
    });
  });
});
