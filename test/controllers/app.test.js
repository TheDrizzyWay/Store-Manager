import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../api/app';

chai.use(chaiHttp);

describe('App', () => {
  describe('GET / - API welcome page', () => {
    it('Should display welcome page', async () => {
      const res = await chai.request(app)
        .get('/');

      expect(res).to.have.status(200);
    });
  });

  describe('GET /* - Non-existent routes', () => {
    it('Should display an error for non-existent routes', async () => {
      const res = await chai.request(app)
        .get('/whatever2');

      expect(res).to.have.status(404);
    });
  });
});
