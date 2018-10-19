import uuid from 'uuid';
import { User } from '../../api/v1/models/usermodel';

export const loginDetails = {
  email: 'tomvee@gmail.com',
  password: '012345',
};

export const user1 = new User({
  id: uuid.v4(),
  firstName: 'Carl',
  lastName: 'Johnson',
  email: 'cj@gmail.com',
  password: '678910',
  role: 'Attendant',
});

export const testMail = {
  email: 'tommyv@gmail.com',
};

export const invalidId = '1234';

export const validId = 'd73febc3-a60d-433a-af20-9f4f89290c17';
