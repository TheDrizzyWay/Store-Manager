import uuid from 'uuid';
import { Product } from '../../api/v1/models/productmodel';

export const loginDetails = {
  email: 'tomvee@gmail.com',
  password: '012345',
};

export const product1 = new Product({
  id: uuid.v4(),
  name: 'adidas x',
  imageUrl: 'sampleimage2.com',
  price: '15000',
  quantity: '10',
  minQuantity: '3',
});

export const testProd = {
  price: '20000',
};

export const invalidId = '1234';

export const validId = '8d007a83-f1d9-461b-a9c0-e09b5be3ac9d';
