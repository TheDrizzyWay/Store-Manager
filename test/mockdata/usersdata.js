import uuid from 'uuid';
import { User } from '../../api/v1/models/usermodel';

export const loginDetails = {
	email: 'tomvee@gmail.com',
	password: '012345'
}

export const user1 = new User({
	id: uuid.v4(),
	firstName: 'Carl',
	lastName: 'Johnson',
	email: 'cj@gmail.com',
	password: '678910',
	role: 'Attendant',
});


export const invalidId = null;