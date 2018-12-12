import Product from '../models/Products';

export default {
  verify: (req, res, next) => {
    const { sales } = req.body;
    const sellerId = req.user.id;
    let counter = 0;
    let total = 0;
    let newQuantity = 0;
    const productLength = sales.length;
    sales.forEach(async (sale) => {
      const { name, quantitySold } = sale;

      try {
        const result = await Product.getProductByName(name);
        if (!result) {
          return res.status(400).send({ success: false, message: `${name} does not exist.` });
        }
        const { id, price, quantity } = result;
        if (quantity < quantitySold) {
          return res.status(400).send({
            success: false,
            message: `The quantity of ${name} requested is more than we have in stock.`,
          });
        }
        total = price * quantitySold;
        newQuantity = quantity - quantitySold;
        sales[counter].price = price;
        sales[counter].saleTotal = total;
        sales[counter].productId = id;
        sales[counter].sellerId = sellerId;
        sales[counter].newQuantity = newQuantity;
        counter += 1;
      } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
      }
      if (counter === productLength) next();
      return true;
    });
  },
};
