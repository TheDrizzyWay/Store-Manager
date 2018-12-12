import validator from 'validator';

const convertText = a => (a.charAt(0).toUpperCase() + a.slice(1)).trim();

export default {
  createSaleValid: (req, res, next) => {
    const { sales } = req.body;
    let counter = 0;
    const productLength = sales.length;
    const errors = [];

    sales.forEach((sale) => {
      const { name, quantitySold } = sale;
      const newName = convertText(name);
      const newQuantitySold = quantitySold.trim();

      if (!newName || validator.isEmpty(newName)) {
        errors.push('Please input product name.');
      }
      if (!quantitySold || validator.isEmpty(quantitySold)
      || quantitySold <= 0 || !validator.isNumeric(quantitySold)) {
        errors.push(`Please input a valid quantity for ${newName}.`);
      }

      const newQuantitySold2 = parseInt(newQuantitySold.trim(), 10).toFixed(0);
      sales[counter].name = newName;
      sales[counter].quantitySold = newQuantitySold2;
      counter += 1;
      if (counter === productLength) {
        if (errors.length > 0) {
          return res.status(400).send({ success: false, data: errors });
        }
        next();
      }
      return true;
    });
  },

  checkRepeat: (req, res, next) => {
    const { sales } = req.body;
    let counter = 0;
    const productLength = sales.length;
    const keyArray = [];

    sales.forEach((sale) => {
      const { name } = sale;
      keyArray.push(name);
      counter += 1;

      if (counter === productLength) {
        const keySet = new Set(keyArray);
        if (keyArray.length !== keySet.size) {
          return res.status(400).send({
            success: false,
            message: 'No product should be selected more than once.',
          });
        }
        next();
      }
      return true;
    });
  },
};
