import moment from 'moment';
import uuid from 'uuid';

export const allCategories = [];

export class Category {
  constructor(category) {
    this.id = uuid.v4();
    this.name = category.name ? category.name.toString() : null;
    this.description = category.description ? category.description : null;
    this.dateCreated = moment();
  }
}
