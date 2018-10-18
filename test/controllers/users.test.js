import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../api/app';
import { allUsers } from '../../api/v1/models/usermodel';
import { loginDetails, user1, invalidId, validId, testMail } from '../mockdata/usersdata';

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

describe('POST /users - Create new user', () => {
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

	it('should not create a user with invalid data', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send({ a: 1 })
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(400);
          done();
        });
    });
});

describe('GET /users - Get all users', () => {
	it('should fetch all users', (done) => {
		chai.request(app)
		  .get('/api/v1/users')
		  .end((err, res) => {
		  	if (err) return done(err);
		  	expect(res).to.have.status(200);
		  	expect(res).to.be.a.json;
		  	done();
		  });
	});
});

describe('GET /users/:userId - Get user by id', () => {
	it('should fetch a particular user', (done) => {
		chai.request(app)
		  .get(`/api/v1/users/${validId}`)
		  .end((err, res) => {
		  	if (err) return done(err);
		  	expect(res).to.have.status(200);
		  	expect(res).to.be.a.json;
		  	done();
		  });
	});

	it('should return an error if id is invalid', (done) => {
		chai.request(app)
		  .get(`/api/v1/users/${invalidId}`)
		  .end((err, res) => {
		  	if (err) return done(err);
		  	expect(res).to.have.status(404);
		  	expect(res.body).to.have.property('errors');
		  	done();
		  });
	});
});

describe('PUT /users - Update a user', () => {
	it('should update user information', (done) => {
		chai.request(app)
	  	.put(`/api/v1/users/${validId}`)
	  	.send(testMail)
	  	.end((err, res) => {
	  		if (err) return done(err);
	  		expect(res).to.have.status(200);
	  		expect(res.body.email).equal('tommyv@gmail.com');
	  		done();
		  });
	});
});