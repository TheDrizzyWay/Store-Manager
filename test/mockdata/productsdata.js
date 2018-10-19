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

export const validId = 'd7ce85ef-8b29-418d-b79f-3bb597a12c1e';
