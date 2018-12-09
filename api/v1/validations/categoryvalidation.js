import validator from 'validator';
import Category from '../models/Categories';

export default {
  createCategoryValid: async (req, res, next) => {
    const { name } = req.body;
    const errors = [];
    const newName = name.trim().toUpperCase();
    const checkInput = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

    if (!newName || validator.isEmpty(newName)) {
      return res.status(400).send({ success: false, message: 'Please fill in name field.' });
    }
    if (checkInput.test(newName)) {
      errors.push('Category name should contain only alphabets and numbers.');
    }
    if (!validator.isLength(newName, { min: 2, max: 50 })) {
      errors.push('Category name should be between 2 and 50 characters long');
    }
    if (errors.length > 0) {
      return res.status(400).send({
        success: false,
        data: errors,
      });
    }
    req.body.name = newName;

    try {
      const result = await Category.getCategoryByName(newName);
      if (result) {
        res.status(400).send({ success: false, message: 'This category already exists' });
      }
    } catch (error) {
      return res.status(500).send({ success: false, message: error.message });
    }
    return next();
  },
};