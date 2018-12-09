import Category from '../models/Categories';

export default {
  createCategory: async (req, res) => {
    const category = new Category(req.body);
    try {
      const result = await category.create();
      return res.status(201).send({
        success: true,
        message: 'Category created successfully.',
        data: result,
      });
    } catch (error) {
      return res.status(500).send({ success: false, message: error.message });
    }
  },

  getAllCategories: async (req, res) => {
    try {
      const result = await Category.getAllCategories();
      if (result.length === 0) {
        return res.status(200).send({ success: false, message: 'No categories available yet' });
      }
      return res.status(200).send({ success: true, data: result });
    } catch (error) {
      return res.status(500).send({ success: false, message: error.message });
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Category.getCategoryById(id);
      if (!result) {
        return res.status(400).send({ success: false, message: 'Category not found' });
      }
      return res.status(200).send({ success: true, message: result });
    } catch (error) {
      return res.status(500).send({ success: false, message: error.message });
    }
  },

  updateCategory: async (req, res) => {
    const { id } = req.params;
    try {
      const category = await Category.getCategoryById(id);
      if (!category) {
        return res.status(400).send({ success: false, message: 'Category not found.' });
      }
      category.name = req.body.name;
      // category.description = req.body.description ? req.body.description : category.description;
      const result = await Category.updateCategory(id, category);
      return res.status(200).send({
        success: true,
        message: 'Category updated successfully',
        data: result,
      });
    } catch (error) {
      return res.status(500).send({ success: false, message: error.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const findCategory = await Category.getCategoryById(id);
      if (!findCategory) {
        return res.status(400).send({ success: false, message: 'Category not found.' });
      }
      await Category.deleteCategory(id);
      return res.status(200).send({ success: true, message: 'Category deleted successfully.' });
    } catch (error) {
      return res.status(500).send({ success: false, message: error.message });
    }
  },
};
