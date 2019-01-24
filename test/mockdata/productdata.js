const invalidProduct = {
  name: 'adidas x boots',
  description: 'new description blah blah',
  price: '10000',
  quantity: '',
  minimumQuantity: '',
  imgUrl: '',
};

const wrongProduct = {
  name: '%',
  description: '*',
  price: '10000bc',
  quantity: '10#',
  minimumQuantity: '3%',
  imgUrl: 'abcd',
};

const missingProduct = {
  name: '',
  description: '',
  price: '',
  quantity: '',
  minimumQuantity: '',
  imgUrl: '',
};

const existingProduct = {
  name: 'adidas x boot',
  description: 'new description blah blah',
  price: '10000',
  quantity: '10',
  minimumQuantity: '2',
  imgUrl: 'http://sampleimage/image.jpg',
};

const validProduct = {
  name: 'new boots',
  description: 'new description blah blah',
  price: '10000',
  quantity: '10',
  minimumQuantity: '2',
  imgUrl: 'http://sampleimage/image.jpg',
};

const updateProduct = {
  name: 'new boots 2020',
  description: 'new description blah blah',
  price: '10000',
};

const updateProduct2 = {
  quantity: '15',
  minimumQuantity: '5',
  imgUrl: 'http://sampleimage/image5.jpg',
};

const notExistId = '5a1f3030-cb52-462a-a81c-ab53f115ed22';

const validId = '5a1f3030-cb52-462a-a81c-ab53f115ed21';

export {
  invalidProduct, wrongProduct, existingProduct,
  validProduct, notExistId, validId,
  updateProduct, missingProduct, updateProduct2,
};
