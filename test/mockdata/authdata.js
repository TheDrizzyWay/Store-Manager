const missingFieldLogin = {
  email: '',
  password: 'password',
};

const notExistLogin = {
  email: 'notexist@email.com',
  password: 'password',
};

const wrongPassword = {
  email: 'mikemyers@email.com',
  password: 'wrongpass',
};

const correctLogin = {
  email: 'mikemyers@email.com',
  password: 'micheal',
};

export {
  missingFieldLogin, notExistLogin, wrongPassword, correctLogin,
};
