import validator from 'validator';
import Product from '../models/Products';

export default {
  createProductValid: async (req, res, next) => {
    const {
      name, description, price, quantity, minimumQuantity, imgUrl,
    } = req.body;
    const errors = [];
    const checkInput = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    const checkImgUrl = /(http(s?):(\/){2})([^/])([/.\w\s-])*\.(?:jpg|png)/g;
    const newName = name.trim().toUpperCase();
    const newDescription = description.trim();
    const newImgUrl = imgUrl.trim();

    if (!newName || validator.isEmpty(newName)
    || !newDescription || validator.isEmpty(newDescription)
    || !price || validator.isEmpty(price)
    || !quantity || validator.isEmpty(quantity)
    || !minimumQuantity || validator.isEmpty(minimumQuantity)
    || !newImgUrl || validator.isEmpty(newImgUrl)) {
      return res.status(400).send({ success: false, message: 'Please fill in all fields.' });
    }

    if (checkInput.test(newName)) {
      errors.push('Product name should contain only alphabets and numbers.');
    }
    if (!validator.isLength(newName, { min: 2, max: 50 })) {
      errors.push('Product name should be between 2 and 50 characters long');
    }
    if (!validator.isLength(newDescription, { min: 2, max: 200 })) {
      errors.push('Product description should be between 2 and 200 characters long');
    }
    if (checkInput.test(newDescription)) {
      errors.push('Product description should contain only alphabets and numbers.');
    }
    if (!validator.isNumeric(price)) {
      errors.push('Product price should contain only numbers');
    }
    if (!validator.isNumeric(quantity)) {
      errors.push('Product quantity should contain only numbers');
    }
    if (!validator.isNumeric(minimumQuantity)) {
      errors.push('Product minimum quantity should contain only numbers');
    }
    if (!checkImgUrl.test(newImgUrl)) {
      errors.push('Please insert a valid image link.');
    }
    const newPrice = parseFloat(price.trim(), 10).toFixed(2);
    const newQuantity = parseInt(quantity.trim(), 10);
    const newMinimumQuantity = parseInt(minimumQuantity.trim(), 10);

    if (errors.length > 0) {
      return res.status(400).send({
        success: false,
        data: errors,
      });
    }

    req.body.name = newName;
    req.body.description = newDescription;
    req.body.price = newPrice;
    req.body.quantity = newQuantity;
    req.body.minimumQuantity = newMinimumQuantity;
    req.body.imgUrl = newImgUrl;

    try {
      const result = await Product.getProductByName(newName);
      if (result) {
        return res.status(400).send({ success: false, message: 'This product already exists.' });
      }
    } catch (error) {
      return res.status(500).send({ success: false, message: error.message });
    }
    return next();
  },

  updateProductValid: async (req, res, next) => {
    const {
      name, description, price, quantity, minimumQuantity, imgUrl,
    } = req.body;
    const errors = [];
    const checkInput = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    const checkImgUrl = /(http(s?):(\/){2})([^/])([/.\w\s-])*\.(?:jpg|png)/g;

    if (!name && !description && !price && !quantity
    && !minimumQuantity && !imgUrl) {
      return res.status(400).send({ success: false, message: 'Please fill in one or more fields.' });
    }
    if (name) {
      const newName = name.trim().toUpperCase();
      if (checkInput.test(newName)) {
        errors.push('Product name should contain only alphabets and numbers.');
      }
      if (!validator.isLength(newName, { min: 2, max: 50 })) {
        errors.push('Product name should be between 2 and 50 characters long');
      }
      req.body.name = newName;
    }
    if (description) {
      const newDescription = description.trim();
      if (!validator.isLength(newDescription, { min: 2, max: 200 })) {
        errors.push('Product description should be between 2 and 200 characters long');
      }
      if (checkInput.test(newDescription)) {
        errors.push('Product description should contain only alphabets and numbers.');
      }
      req.body.description = newDescription;
    }
    if (imgUrl) {
      const newImgUrl = imgUrl.trim();
      if (!checkImgUrl.test(newImgUrl)) {
        errors.push('Please insert a valid image link.');
      }
      req.body.imgUrl = newImgUrl;
    }
    if (price) {
      if (!validator.isNumeric(price)) {
        errors.push('Product price should contain only numbers');
      }
      const newPrice = parseFloat(price.trim(), 10).toFixed(2);
      req.body.price = newPrice;
    }
    if (quantity) {
      if (!validator.isNumeric(quantity)) {
        errors.push('Product quantity should contain only numbers');
      }
      const newQuantity = parseInt(quantity.trim(), 10);
      req.body.quantity = newQuantity;
    }
    if (minimumQuantity) {
      if (!validator.isNumeric(minimumQuantity)) {
        errors.push('Product minimum quantity should contain only numbers');
      }
      const newMinimumQuantity = parseInt(minimumQuantity.trim(), 10);
      req.body.minimumQuantity = newMinimumQuantity;
    }

    if (errors.length > 0) {
      return res.status(400).send({
        success: false,
        data: errors,
      });
    }

    try {
      if (req.body.name) {
        const result = await Product.getProductByName(req.body.name);
        if (result) {
          return res.status(400).send({ success: false, message: 'This product already exists.' });
        }
      }
    } catch (error) {
      return res.status(500).send({ success: false, message: error.message });
    }
    return next();
  },
};
