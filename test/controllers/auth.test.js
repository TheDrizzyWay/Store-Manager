import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../api/app';
import {
  missingFieldLogin, notExistLogin, wrongPassword, correctLogin,
} from '../mockdata/authdata';

chai.use(chaiHttp);

describe('Authentication', () => {
  describe('login', () => {
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

      console.log(res.body);
      expect(res).to.have.status(200);
      expect(res.body.success).to.equal(true);
      expect(res.body).to.have.property('token');
    });
  });
});
