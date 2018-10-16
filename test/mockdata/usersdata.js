import uuid from 'uuid';
import { User } from '../../api/v1/models/usermodel';

export const user1 = new User({
	id: uuid.v4(),
	firstName: 'Carl',
	lastName: 'Johnson',
	email: 'cj@gmail.com',
	password: '012345',
	role: 'Attendant',
});

export const user2 = {
	id: uuid.v4(),
	firstName: 'Tommy',
	lastName: 'Vercetti',
	email: 'tommyv@yahoo.com',
	password: '678910',
	role: 'attendant',
};

export const invalidId = null;