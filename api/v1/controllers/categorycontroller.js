import { allCategories, Category } from '../models/categorymodel';

export default {
  createCategory: (req, res) => {
    const category = new Category(req.body);
    allCategories.push(category);
    res.status(201).send({ success: true, message: 'Product created.', data: category });
  },

  findAllCategories: (req, res) => {
    res.status(200).send({ success: true, message: 'All products found.', data: allCategories });
  },

  findCategoryById: (req, res) => {
    const categoryId = req.params.categoryId;
    const category = allCategories.find(obj => obj.id === categoryId);
    if (category === undefined) {
      return res.status(404).send({ success: false, message: 'Category not found.' });
    }
    return res.status(200).send({ success: true, message: 'Category found.', data: category });
  },

  updateCategory: (req, res) => {
    const categoryId = req.params.categoryId;
    const previousCategory = allCategories.find(obj => obj.id === categoryId);
    if (previousCategory === undefined) {
      return res.status(404).send({ success: false, message: 'Category not found.' });
    }
    const updatedCategory = { ...previousCategory, ...req.body };
    const index = allCategories.findIndex(obj => obj.id === previousCategory.id);

    allCategories.splice(index, 1, updatedCategory);
    return res.status(200).send({ success: true, message: 'Category updated.', data: updatedCategory });
  },

  deleteCategory: (req, res) => {
    const categoryId = req.params.categoryId;
    const index = allCategories.findIndex(obj => obj.id === categoryId);
    if (index === -1) {
      return res.status(404).send({ success: false, message: 'Category not found.' });
    }

    allCategories.splice(index, 1);
    return res.status(204).send({ success: true, message: 'Category deleted.', data: allCategories });
  },
};
