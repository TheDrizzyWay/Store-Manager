import isUUID from 'validator/lib/isUUID';

export default {
  idValid: (req, res, next) => {
    const { id } = req.params;

    if (!isUUID(id, 4)) {
      return res.status(422).send({
        success: false,
        message: 'Please insert a valid id',
      });
    }
    return next();
  },
};
