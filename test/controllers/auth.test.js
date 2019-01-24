import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../api/app';
import {
  missingFieldLogin, notExistLogin, wrongPassword,
  correctLogin, missingFieldSignup, invalidSignupData,
  existingEmail, validSignupData, attendantLogin,
  invalidLength,
} from '../mockdata/authdata';

chai.use(chaiHttp);
let adminToken;
let attendantToken;

describe('Authentication', () => {
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

  describe('POST /login', () => {
    it('should return 400 if one or more fields are missing', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/login')
        .send(missingFieldLogin);

      expect(res).to.have.status(400);
      expect(res.body.success).to.equal(false);
      expect(res.body).to.have.property('data');
    });

    it('should return 401 if user account not found', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/login')
        .send(notExistLogin);

      expect(res).to.have.status(401);
      expect(res.body.success).to.equal(false);
      expect(res.body).to.have.property('message');
    });

    it('should return 401 if password is incorrect', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/login')
        .send(wrongPassword);

      expect(res).to.have.status(401);
      expect(res.body.success).to.equal(false);
      expect(res.body.message).to.eql('Invalid email/password combination.');
    });

    it('should return 200 for successfull login', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/login')
        .send(correctLogin);

      expect(res).to.have.status(200);
      expect(res.body.success).to.equal(true);
      expect(res.body).to.have.property('token');
    });
  });

  describe('POST /signup', () => {
    it('should return 401 if no token is received', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send(correctLogin);

      expect(res).to.have.status(401);
      expect(res.body.success).to.equal(false);
    });

    it('should return 403 if user is not an admin', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .set({ Authorization: `Bearer ${attendantToken}` })
        .send(missingFieldSignup);

      expect(res).to.have.status(403);
      expect(res.body.success).to.equal(false);
    });

    it('should return 400 if one or more fields are missing', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(missingFieldSignup);

      expect(res).to.have.status(400);
      expect(res.body.success).to.equal(false);
    });

    it('should return 400 for invalid request data', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(invalidSignupData);

      expect(res).to.have.status(400);
      expect(res.body.success).to.equal(false);
      expect(res.body).to.have.property('data');
    });

    it('should return 400 for invalid data length', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(invalidLength);

      expect(res).to.have.status(400);
      expect(res.body.success).to.equal(false);
      expect(res.body).to.have.property('data');
    });

    it('should return 400 if email already exists in database', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(existingEmail);

      expect(res).to.have.status(400);
      expect(res.body.success).to.equal(false);
      expect(res.body.message).to.eql('This email address is already taken.');
    });

    it('should return 201 for successfull signup', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(validSignupData);

      expect(res).to.have.status(201);
      expect(res.body.success).to.equal(true);
      expect(res.body).to.have.property('data');
    });
  });
});
