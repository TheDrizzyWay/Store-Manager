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

const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhlNzVlZDFjLWM0OGEtNGRlMi05ZjhjLWRmNTk3YWVhY2U4ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU0NDcyODk0NCwiZXhwIjoxNTU1MDk2OTQ0fQ.MiT5CCR8CQbr-9m3h2BQcuN1BVAJlWV1_PfOrTdKjzE';

const attendantToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNiY2JmZjQxLTcyODUtNDJmNC1hOTM0LWUzNDYzODJmM2ZiYyIsInJvbGUiOiJhdHRlbmRhbnQiLCJpYXQiOjE1NDQ3MjkxODgsImV4cCI6MTU1NTA5NzE4OH0.MCXQh19YTC06p1WAVGwY_QnHttJHDgq41f5Me_kCZMk';

export {
  missingFieldLogin, notExistLogin,
  wrongPassword, correctLogin,
  missingFieldSignup, adminToken,
  attendantToken, invalidSignupData,
  existingEmail, validSignupData,
};
