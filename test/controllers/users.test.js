import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../api/app';
import { correctLogin, attendantLogin } from '../mockdata/authdata';
import { invalidId, validId } from '../mockdata/userdata';

chai.use(chaiHttp);
let adminToken;
let attendantToken;

describe('Users', () => {
  before(async () => {
    const response = await chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(correctLogin);

    adminToken = response.body.token;

    const attendantResponse = await chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(attendantLogin);
    attendantToken = attendantResponse.body.token;
  });

  describe('GET /users', () => {
    it('should return 401 if no token is received', async () => {
      const res = await chai.request(app)
        .get('/api/v1/users');

      expect(res).to.have.status(401);
      expect(res.body.success).to.equal(false);
    });

    it('should return 401 for invalid token', async () => {
      const res = await chai.request(app)
        .get('/api/v1/users')
        .set({ Authorization: null });

      expect(res).to.have.status(401);
      expect(res.body.success).to.equal(false);
    });

    it('should return 500 for internal error', async () => {
      const res = await chai.request(app)
        .get('/api/v1/users')
        .set({ Authorization: 'Bearer abcd' });

      expect(res).to.have.status(500);
      expect(res.body.success).to.equal(false);
    });

    it('should return 403 if user is not an admin', async () => {
      const res = await chai.request(app)
        .get('/api/v1/users')
        .set({ Authorization: `Bearer ${attendantToken}` });

      expect(res).to.have.status(403);
      expect(res.body.success).to.equal(false);
    });

    it('should get all users and return 200', async () => {
      const res = await chai.request(app)
        .get('/api/v1/users')
        .set({ Authorization: `Bearer ${adminToken}` });

      expect(res).to.have.status(200);
      expect(res.body.success).to.equal(true);
      expect(res.body).to.have.property('data');
    });
  });

  describe('GET /users/profile', () => {
    it('should get current user data and return 200', async () => {
      const res = await chai.request(app)
        .get('/api/v1/users/profile')
        .set({ Authorization: `Bearer ${adminToken}` });

      expect(res).to.have.status(200);
      expect(res.body.success).to.equal(true);
      expect(res.body).to.have.property('data');
    });
  });

  describe('GET /users/:id', () => {
    it('should return 400 if user does not exist', async () => {
      const res = await chai.request(app)
        .get(`/api/v1/users/${invalidId}`)
        .set({ Authorization: `Bearer ${adminToken}` });

      expect(res).to.have.status(400);
      expect(res.body.success).to.equal(false);
    });

    it('should get a user and return 200', async () => {
      const res = await chai.request(app)
        .get(`/api/v1/users/${validId}`)
        .set({ Authorization: `Bearer ${adminToken}` });

      expect(res).to.have.status(200);
      expect(res.body.success).to.equal(true);
      expect(res.body).to.have.property('data');
    });
  });

  describe('DELETE /users/:id', () => {
    it('should return 400 if user does not exist', async () => {
      const res = await chai.request(app)
        .delete(`/api/v1/users/${invalidId}`)
        .set({ Authorization: `Bearer ${adminToken}` });

      expect(res).to.have.status(400);
      expect(res.body.success).to.equal(false);
    });

    it('should delete a user and return 200', async () => {
      const res = await chai.request(app)
        .delete(`/api/v1/users/${validId}`)
        .set({ Authorization: `Bearer ${adminToken}` });

      expect(res).to.have.status(200);
      expect(res.body.success).to.equal(true);
    });
  });
});
