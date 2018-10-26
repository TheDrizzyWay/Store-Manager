import uuid from 'uuid';
import { SaleOrder } from '../../api/v1/models/saleordermodel';

export const loginDetails = {
  email: 'tonyc@gmail.com',
  password: 'abc123',
};

export const invalidId = '1234';

export const validId = 'd485e3b3-d210-43c2-aee0-753868c906b0';

export const saleOrder1 = new SaleOrder({
  id: uuid.v4(),
  name: 'adidas x',
  quantitySold: '1',
});

export const saleOrder2 = new SaleOrder({
  id: uuid.v4(),
  name: 'adidas x',
  quantitySold: '20',
});
