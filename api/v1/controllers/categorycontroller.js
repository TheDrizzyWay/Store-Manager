import { allCategories, Category } from '../models/categorymodel';

export default {
  createCategory(req, res) {
    const category = new Category(req.body);
    allCategories.push(category);
    res.status(201).send(category);
  },

  findAllCategories(req, res) {
    res.status(200).send(allCategories);
  },

  findCategoryById(req, res) {
    const categoryId = req.params.categoryId;
    const category = allCategories.find(obj => obj.id === categoryId);
    if (category === undefined) {
      res.status(404).send({ errors: { message: 'Category not found.' } });
    }
    res.status(200).send(category);
  },

  updateCategory(req, res) {
    const categoryId = req.params.categoryId;
    const previousCategory = allCategories.find(obj => obj.id === categoryId);
    if (previousCategory === undefined) {
      return res.status(404).send({ errors: { message: 'Category not found.' } });
    }
    const updatedCategory = { ...previousCategory, ...req.body };
    const index = allCategories.findIndex(obj => obj.id === previousCategory.id);

    allCategories.splice(index, 1, updatedCategory);
    res.status(200).send(updatedCategory);
  },

  deleteCategory(req, res) {
    const categoryId = req.params.categoryId;
    const index = allCategories.findIndex(obj => obj.id === categoryId);
    if (index === -1) {
      return res.status(404).send({ errors: { message: 'Category not found.' } });
    }

    allCategories.splice(index, 1);
    res.status(204).send(allCategories);
  },
};
