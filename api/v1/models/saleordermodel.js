import moment from 'moment';
import uuid from 'uuid';

export const allSales = [];

export class SaleOrder {
  constructor(sale) {
    this.id = uuid.v4();
    this.name = sale.name ? sale.name.toString() : null;
    this.quantitySold = sale.quantitySold ? parseInt(sale.quantitySold, 10) : 0;
    this.dateCreated = moment();
  }
}
