import { allProducts, Product } from '../models/productmodel';

export default {
  createProduct(req, res) {
    const product = new Product(req.body);
    allProducts.push(product);
    res.status(201).send(product);
  },

  findAllProducts(req, res) {
    res.status(200).send(allProducts);
  },

  findProductById(req, res) {
    const productId = req.params.productId;
    const product = allProducts.find(obj => obj.id === productId);
    if (product === undefined) {
      res.status(404).send({ errors: { message: 'Product not found.' } });
    }
    res.status(200).send(product);
  },

  updateProduct(req, res) {
    const productId = req.params.productId;
    const previousProduct = allProducts.find(obj => obj.id === productId);
    if (previousProduct === undefined) {
      return res.status(404).send({ errors: { message: 'Product not found.' } });
    }
    const updatedProduct = { ...previousProduct, ...req.body };
    const index = allProducts.findIndex(obj => obj.id === previousProduct.id);

    allProducts.splice(index, 1, updatedProduct);
    res.status(200).send(allProducts);
  },

  deleteProduct(req, res) {
    const productId = req.params.productId;
    const index = allProducts.findIndex(obj => obj.id === productId);
    if (index === -1) {
      return res.status(404).send({ errors: { message: 'Product not found.' } });
    }

    allProducts.splice(index, 1);
    res.status(204).send(allProducts);
  },

};
