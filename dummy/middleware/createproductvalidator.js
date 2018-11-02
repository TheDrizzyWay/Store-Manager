export default (req, res, next) => {
  const errors = {};
  const product = req.body;

  if (!product.name) {
    errors.name = 'Product Name is required';
  }
  if (!product.imageUrl) {
    errors.imageUrl = 'Product image is required';
  }
  if (!product.quantity) {
    errors.quantity = 'Product quantity is required';
  }
  if (!product.price) {
    errors.price = 'Product price is required';
  }
  if (!product.minQuantity) {
    errors.minQuantity = 'Product price is required';
  }

  if (Object.keys(errors).length !== 0) {
    return res.status(400).send({ success: false, errors });
  }
  next();
};
