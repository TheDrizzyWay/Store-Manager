export default (req, res, next) => {
  const errors = {};
  const category = req.body;

  if (!category.name) {
    errors.name = 'Category Name is required';
  }
  if (!category.description) {
    errors.description = 'Category description is required';
  }

  if (Object.keys(errors).length !== 0) {
    return res.status(400).send({success: false, errors });
  }
  next();
};
