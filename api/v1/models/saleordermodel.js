import moment from 'moment';
import uuid from 'uuid';

export const allSales = [{
  id: 'd485e3b3-d210-43c2-aee0-753868c906b0',
  name: 'adidas f10',
  quantitySold: '1',
  dateCreated: '2018-10-19T15:57:18.377Z',
  total: '10000',
  seller: '99582984-0988-4d3e-a899-d027ca46dac5',
}];

export class SaleOrder {
  constructor(sale) {
    this.id = uuid.v4();
    this.name = sale.name ? sale.name.toString() : null;
    this.quantitySold = sale.quantitySold ? parseInt(sale.quantitySold, 10) : 0;
    this.dateCreated = moment();
  }
}
