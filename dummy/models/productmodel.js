import moment from 'moment';
import uuid from 'uuid';

export const allProducts = [{
  id: 'd7ce85ef-8b29-418d-b79f-3bb597a12c1e',
  name: 'adidas f10',
  imageUrl: 'sample-image.com',
  price: '10000',
  quantity: '10',
  minQuantity: '3',
  dateCreated: '2018-10-19T15:15:54.072Z',
},
{
  id: '8d007a83-f1d9-461b-a9c0-e09b5be3ac9d',
  name: 'adidas predator z10',
  imageUrl: 'sample-image3.com',
  price: '15500',
  quantity: '10',
  minQuantity: '3',
  dateCreated: '2018-10-21T13:32:12.968Z',
}];

export class Product {
  constructor(product) {
    this.id = uuid.v4();
    this.name = product.name ? product.name.toString() : null;
    this.imageUrl = product.imageUrl ? product.imageUrl.toString() : null;
    this.price = product.price ? parseInt(product.price, 10) : 0;
    this.quantity = product.quantity ? parseInt(product.quantity, 10) : 0;
    this.minQuantity = product.minQuantity ? parseInt(product.minQuantity, 10) : 0;
    this.dateCreated = moment();
  }
}
