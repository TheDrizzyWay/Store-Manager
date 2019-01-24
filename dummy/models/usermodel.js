import moment from 'moment';
import uuid from 'uuid';

export const allUsers = [{
  id: 'd73febc3-a60d-433a-af20-9f4f89290c17',
  firstName: 'Tommy',
  lastName: 'Vercetti',
  email: 'tomvee@gmail.com',
  password: '012345',
  role: 'admin',
  dateCreated: '2018-10-18T19:37:49.217Z',
},
{
  id: '99582984-0988-4d3e-a899-d027ca46dac5',
  firstName: 'Toni',
  lastName: 'Ciprianni',
  email: 'tonyc@gmail.com',
  password: 'abc123',
  role: 'attendant',
  dateCreated: '2018-10-20T22:38:56.271Z',
}];

export const loggedIn = [];
export const adminRole = [];

export class User {
  constructor(user) {
    this.id = uuid.v4();
    this.firstName = user.firstName ? user.firstName.toString() : null;
    this.lastName = user.lastName ? user.lastName.toString() : null;
    this.email = user.email ? user.email.toString() : null;
    this.password = user.password ? user.password : null;
    this.role = user.role ? user.role.toLowerCase() : null;
    this.dateCreated = moment();
  }
}
