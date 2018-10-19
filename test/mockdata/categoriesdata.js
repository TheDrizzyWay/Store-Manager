import uuid from 'uuid';
import { Category } from '../../api/v1/models/categorymodel';

export const loginDetails = {
  email: 'tomvee@gmail.com',
  password: '012345',
};

export const category1 = new Category({
  id: uuid.v4(),
  name: 'predator series',
  description: 'Latest adidas predator soccer boots.',
});

export const testCat = {
  name: 'new name',
};

export const invalidId = '1234';

export const validId = 'bd80694c-a937-4378-aded-702207149757';
