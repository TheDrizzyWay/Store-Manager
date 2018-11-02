import { adminRole } from '../models/usermodel';

export default (req, res, next) => {
  const errors = {};
  const saleOrder = req.body;

  if (adminRole.length > 0) {
    return res.status(403).send({ success: false, message: 'You are not permitted to access this page.' });
  }

  if (!saleOrder.name) {
    errors.name = 'Product Name is required';
  }
  if (!saleOrder.quantitySold) {
    errors.quantitySold = 'Product quantity is required';
  }
  if (saleOrder.quantitySold < 1) {
    errors.quantitySold = 'Please enter a valid quantity';
  }

  if (Object.keys(errors).length !== 0) {
    return res.status(400).send({ success: false, errors });
  }
  next();
};
