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

export const user2 = new User({
  id: uuid.v4(),
  firstName: 'Carl',
  lastName: 'Johnson',
  email: 'tomvee@gmail.com',
  password: '123xyz',
  role: 'Attendant',
});

export const testMail = {
  email: 'tonycee@gmail.com',
};

export const testMail2 = {
  email: 'abc@yahoo.com',
  password: 'abc123',
};

export const invalidId = '1234';

export const validId = '99582984-0988-4d3e-a899-d027ca46dac5';
