import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../api/app';
import { allUsers } from '../../api/v1/models/usermodel';
import { user1, user2, invalidId } from '../mockdata/usersdata';

chai.use(chaiHttp);

beforeEach((done) => {
	chai.request(app)
		.post('api/v1/users')
		.send(user1)
		.end((err, res) => {
			if (err) return done(err);
			done();
	});
});

afterEach((done) => {
	allUsers.length = 0;
	done();
});

describe('POST /users', () => {
	it('should create a new user', (done) => {
		chai.request(app)
			.post('api/v1/users')
			.send(user2)
			.end((err, res) => {
				if (err) return done(err);
				expect(res).to.have.status(201);
				expect(res.body.firstName).equal('Tommy');
				done();
			})
	});
});