import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../api/app';
import { allUsers } from '../../api/v1/models/usermodel';
import { loginDetails, user1, invalidId } from '../mockdata/usersdata';

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

describe('POST /users', () => {
	it('should create a new user', (done) => {
		chai.request(app)
			.post('/api/v1/users')
			.send(user1)
			.end((err, res) => {
				if (err) return done(err);
				expect(res).to.have.status(201);
				expect(res.body.firstName).equal('Carl');
				done();
			});
	});
});