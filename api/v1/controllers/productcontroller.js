import { allProducts, Product } from '../models/productmodel';

export default {
  createProduct: (req, res) => {
    const product = new Product(req.body);
    allProducts.push(product);
    res.status(201).send({ success: true, message: 'Product created.', data: product });
  },

  findAllProducts: (req, res) => {
    res.status(200).send({ success: true, message: 'Product found.', data: allProducts });
  },

  findProductById: (req, res) => {
    const productId = req.params.productId;
    const product = allProducts.find(obj => obj.id === productId);
    if (product === undefined) {
      return res.status(404).send({ success: false, message: 'Product not found.' });
    }
    return res.status(200).send({ success: true, message: 'Sale record found.', data: product });
  },

  updateProduct: (req, res) => {
    const productId = req.params.productId;
    const previousProduct = allProducts.find(obj => obj.id === productId);
    if (previousProduct === undefined) {
      return res.status(404).send({ success: true, message: 'Product not found.' });
    }
    const updatedProduct = { ...previousProduct, ...req.body };
    const index = allProducts.findIndex(obj => obj.id === previousProduct.id);

    allProducts.splice(index, 1, updatedProduct);
    return res.status(200).send({ success: true, data: updatedProduct });
  },

  deleteProduct: (req, res) => {
    const productId = req.params.productId;
    const index = allProducts.findIndex(obj => obj.id === productId);
    if (index === -1) {
      return res.status(404).send({ success: true, message: 'Product not found.' });
    }

    allProducts.splice(index, 1);
    return res.status(204).send({ success: true, message: 'Product deleted.', data: allProducts });
  },

};
