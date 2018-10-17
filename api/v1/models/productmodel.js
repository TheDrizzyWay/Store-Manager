import moment from 'moment';
import uuid from 'uuid';

export const allProducts = [];

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
