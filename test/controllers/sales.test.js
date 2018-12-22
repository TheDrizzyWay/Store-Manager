import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../api/app';
import { correctLogin, attendantLogin } from '../mockdata/authdata';
import {
  validSale, missingSale, invalidSale,
  repeatSale, notExistSale, wrongQuantity,
  validId, invalidId,
} from '../mockdata/salesdata';

chai.use(chaiHttp);
let adminToken;
let attendantToken;

describe('Sales', () => {
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

  describe('POST /sales', () => {
    it('should return 403 if user is not an attendant', async () => {
      const res = await chai.request(app)
        .post('/api/v1/sales')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(validSale);

      expect(res).to.have.status(403);
      expect(res.body.success).to.equal(false);
    });

    it('should return 400 if one or more fields are missing', async () => {
      const res = await chai.request(app)
        .post('/api/v1/sales')
        .set({ Authorization: `Bearer ${attendantToken}` })
        .send(missingSale);

      expect(res).to.have.status(400);
      expect(res.body.success).to.equal(false);
      expect(res.body).to.have.property('data');
    });

    it('should return 400 if fields contain invalid details', async () => {
      const res = await chai.request(app)
        .post('/api/v1/sales')
        .set({ Authorization: `Bearer ${attendantToken}` })
        .send(invalidSale);

      expect(res).to.have.status(400);
      expect(res.body.success).to.equal(false);
      expect(res.body).to.have.property('data');
    });

    it('should return 400 if a product is repeated', async () => {
      const res = await chai.request(app)
        .post('/api/v1/sales')
        .set({ Authorization: `Bearer ${attendantToken}` })
        .send(repeatSale);

      expect(res).to.have.status(400);
      expect(res.body.success).to.equal(false);
    });

    it('should return 400 if product does not exist', async () => {
      const res = await chai.request(app)
        .post('/api/v1/sales')
        .set({ Authorization: `Bearer ${attendantToken}` })
        .send(notExistSale);

      expect(res).to.have.status(400);
      expect(res.body.success).to.equal(false);
    });

    it('should return 400 if quantity requested is not available', async () => {
      const res = await chai.request(app)
        .post('/api/v1/sales')
        .set({ Authorization: `Bearer ${attendantToken}` })
        .send(wrongQuantity);

      expect(res).to.have.status(400);
      expect(res.body.success).to.equal(false);
    });

    it('should return 201 for successfull transaction', async () => {
      const res = await chai.request(app)
        .post('/api/v1/sales')
        .set({ Authorization: `Bearer ${attendantToken}` })
        .send(validSale);

      expect(res).to.have.status(201);
      expect(res.body.success).to.equal(true);
      expect(res.body).to.have.property('data');
    });
  });

  describe('GET /sales', () => {
    it('should get all sales if user is an admin', async () => {
      const res = await chai.request(app)
        .get('/api/v1/sales')
        .set({ Authorization: `Bearer ${adminToken}` });

      expect(res).to.have.status(200);
      expect(res.body.success).to.equal(true);
      expect(res.body).to.have.property('data');
    });

    it('should get sales for a particular attendant', async () => {
      const res = await chai.request(app)
        .get('/api/v1/sales')
        .set({ Authorization: `Bearer ${attendantToken}` });

      expect(res).to.have.status(200);
      expect(res.body.success).to.equal(true);
      expect(res.body).to.have.property('data');
    });
  });

  describe('GET /sales/:id', () => {
    it('should return 400 if id does not exist', async () => {
      const res = await chai.request(app)
        .get(`/api/v1/sales/${invalidId}`)
        .set({ Authorization: `Bearer ${adminToken}` });

      expect(res).to.have.status(400);
      expect(res.body.success).to.equal(false);
    });

    /* it('should get a sale record and return 200', async () => {
      const res = await chai.request(app)
        .get(`/api/v1/sales/${validId}`)
        .set({ Authorization: `Bearer ${adminToken}` });

      expect(res).to.have.status(200);
      expect(res.body.success).to.equal(true);
      expect(res.body).to.have.property('data');
    }); */
  });
});
