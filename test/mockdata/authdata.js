const missingFieldLogin = {
  email: '',
  password: '',
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

const attendantLogin = {
  email: 'jasonv@email.com',
  password: 'jasonv',
};

const missingFieldSignup = {
  firstName: 'firstname',
  lastName: 'lastname',
  email: 'user@email.com',
  password: '',
  role: '',
};

const invalidSignupData = {
  firstName: 'firstname',
  lastName: 'lastname',
  email: 'email.com',
  password: 'pass$%word',
  role: 'attendant',
};

const invalidLength = {
  firstName: '%',
  lastName: '$',
  email: 'email.com',
  password: 'pas',
  role: 'role',
};

const existingEmail = {
  firstName: 'firstname',
  lastName: 'lastname',
  email: 'mikemyers@email.com',
  password: 'password',
  role: 'attendant',
};

const validSignupData = {
  firstName: 'firstname',
  lastName: 'lastname',
  email: 'testuser@email.com',
  password: 'password',
  role: 'attendant',
};

export {
  missingFieldLogin, notExistLogin,
  wrongPassword, correctLogin,
  missingFieldSignup, invalidSignupData,
  existingEmail, validSignupData,
  attendantLogin, invalidLength,
};
