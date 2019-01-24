export default (req, res, next) => {
  const errors = {};
  const user = req.body;

  if (!user.email) {
    errors.email = 'User email is required';
  }
  if (!user.password) {
    errors.password = 'User password is required';
  }
  if (Object.keys(errors).length !== 0) {
    return res.status(400).send({ success: false, errors });
  }
  next();
};
