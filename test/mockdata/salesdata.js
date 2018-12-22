const validSale = {
  sales: [{
    name: 'Adidas x boot',
    quantitySold: '1',
  }, {
    name: 'New boots',
    quantitySold: '1',
  }],
};

const missingSale = {
  sales: [{
    name: '',
    quantitySold: '',
  }],
};

const invalidSale = {
  sales: [{
    name: 'name',
    quantitySold: 'abc',
  }],
};

const repeatSale = {
  sales: [{
    name: 'Adidas x boot',
    quantitySold: '1',
  }, {
    name: 'Adidas x boot',
    quantitySold: '1',
  }],
};

const notExistSale = {
  sales: [{
    name: 'not exists',
    quantitySold: 'abc',
  }],
};

const wrongQuantity = {
  sales: [{
    name: 'Adidas x boot',
    quantitySold: '30',
  }],
};

const validId = 'd88aea19-0e77-4134-a192-cb1048d13f8e';

const invalidId = 'd88aea19-0e77-4134-a192-cb1048d13f8f';

export {
  validSale, missingSale, invalidSale,
  repeatSale, notExistSale, wrongQuantity,
  validId, invalidId,
};
