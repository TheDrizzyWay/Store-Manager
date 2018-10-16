import moment from 'moment';
import uuid from 'uuid';

export const allUsers = [{
  id: '3a35339b-6dfb-442d-b274-b8763e905c44',
  firstName: 'Tommy',
  lastName: 'Vercetti',
  email: 'tommyv@gmail.com',
  password: '012345',
  role: 'admin',
  dateCreated: 1539722648395,
}];
export const loggedIn = [];
export const adminRole = [];

export class User {
  constructor(user) {
    this.id = uuid.v4();
    this.firstName = user.firstName ? user.firstName.toString() : null;
    this.lastName = user.lastName ? user.lastName.toString() : null;
    this.email = user.email ? user.email : null;
    this.password = user.password ? user.password : null;
    this.role = user.role ? user.role.toLowerCase() : null;
    this.dateCreated = moment();
  }
}
// create default admin account in allUsers
// delete user
// eslint
