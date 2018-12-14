import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../api/app';
import { adminToken, attendantToken } from '../mockdata/authdata';
import {
  validCategory, invalidCategory, invalidData,
  existingCategory, validId, invalidId,
  notExistId,
} from '../mockdata/categorydata';

chai.use(chaiHttp);

describe('Categories', () => {
  describe('POST /categories', () => {
    it('should return 401 if no token is received', async () => {
      const res = await chai.request(app)
        .post('/api/v1/categories')
        .send(validCategory);

      expect(res).to.have.status(401);
      expect(res.body.success).to.equal(false);
    });

    it('should return 403 if user is not an admin', async () => {
      const res = await chai.request(app)
        .post('/api/v1/categories')
        .set({ Authorization: `Bearer ${attendantToken}` })
        .send(validCategory);

      expect(res).to.have.status(403);
      expect(res.body.success).to.equal(false);
    });

    it('should return 400 if one or more fields are missing', async () => {
      const res = await chai.request(app)
        .post('/api/v1/categories')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(invalidCategory);

      expect(res).to.have.status(400);
      expect(res.body.success).to.equal(false);
    });

    it('should return 400 for invalid request data', async () => {
      const res = await chai.request(app)
        .post('/api/v1/categories')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(invalidData);

      expect(res).to.have.status(400);
      expect(res.body.success).to.equal(false);
      expect(res.body).to.have.property('data');
    });

    it('should return 400 if category already exists', async () => {
      const res = await chai.request(app)
        .post('/api/v1/categories')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(existingCategory);

      expect(res).to.have.status(400);
      expect(res.body.success).to.equal(false);
      expect(res.body.message).to.eql('This category already exists.');
    });

    it('should return 201 for successfull creation', async () => {
      const res = await chai.request(app)
        .post('/api/v1/categories')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(validCategory);

      expect(res).to.have.status(201);
      expect(res.body.success).to.equal(true);
      expect(res.body).to.have.property('data');
    });
  });

  describe('GET /categories', () => {
    it('should return 401 if no token is received', async () => {
      const res = await chai.request(app)
        .get('/api/v1/categories');

      expect(res).to.have.status(401);
      expect(res.body.success).to.equal(false);
    });

    it('should get all categories and return 200', async () => {
      const res = await chai.request(app)
        .get('/api/v1/categories')
        .set({ Authorization: `Bearer ${adminToken}` });

      expect(res).to.have.status(200);
      expect(res.body.success).to.equal(true);
      expect(res.body).to.have.property('data');
    });
  });

  describe('GET /categories/:id', () => {
    it('should return 401 if no token is received', async () => {
      const res = await chai.request(app)
        .get(`/api/v1/categories/${validId}`);

      expect(res).to.have.status(401);
      expect(res.body.success).to.equal(false);
    });

    it('should return 422 if id is invalid', async () => {
      const res = await chai.request(app)
        .get(`/api/v1/categories/${invalidId}`)
        .set({ Authorization: `Bearer ${adminToken}` });

      expect(res).to.have.status(422);
      expect(res.body.success).to.equal(false);
    });

    it('should return 400 if id does not exist', async () => {
      const res = await chai.request(app)
        .get(`/api/v1/categories/${notExistId}`)
        .set({ Authorization: `Bearer ${adminToken}` });

      expect(res).to.have.status(400);
      expect(res.body.success).to.equal(false);
    });

    it('should get a category and return 200', async () => {
      const res = await chai.request(app)
        .get(`/api/v1/categories/${validId}`)
        .set({ Authorization: `Bearer ${adminToken}` });

      expect(res).to.have.status(200);
      expect(res.body.success).to.equal(true);
      expect(res.body).to.have.property('data');
    });
  });
});
