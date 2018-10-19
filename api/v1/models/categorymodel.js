import moment from 'moment';
import uuid from 'uuid';

export const allCategories = [{
	id: 'bd80694c-a937-4378-aded-702207149757',
    name: 'x-series',
    description: 'Latest adidas x soccer boots.',
    dateCreated: '2018-10-18T19:46:53.034Z',
}];

export class Category {
  constructor(category) {
    this.id = uuid.v4();
    this.name = category.name ? category.name.toString() : null;
    this.description = category.description.toString() ? category.description : null;
    this.dateCreated = moment();
  }
}
