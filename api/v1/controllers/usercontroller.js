import hashes from '../middleware/hashes';
import User from '../models/Users';

export default {
  signUp: async (req, res) => {
    const user = new User(req.body);
    user.password = hashes.hashPassword(user.password);

    try {
      const newUser = await user.signUp();
      return res.status(201).send({
        success: true,
        message: 'User account created successfully',
        data: newUser,
      });
    } catch (error) {
      return res.status(500).send({ success: false, message: error.message });
    }
  },

  logIn: async (req, res) => {
    const { email, password } = (req.body);

    try {
      const result = await User.logIn(email);
      if (!result) {
        return res.status(401).send({ success: false, message: 'User account not found.' });
      }
      const { password: userPassword } = result;
      if (!hashes.comparePassword(password, userPassword)) {
        return res.status(401).send({
          success: false,
          message: 'Invalid email/password combination.',
        });
      }
      const { id, role } = result;
      const token = await hashes.generateToken({ id, role });
      return res.status(200).send({ success: true, message: 'You are now logged in.', token });
    } catch (error) {
      return res.status(500).send({ success: false, message: error.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const result = await User.getAllUsers();
      return res.status(200).send({ success: true, data: result });
    } catch (error) {
      return res.status(500).send({ success: false, message: error.message });
    }
  },
/*

// update user
  static async getUserById(req, res) {
    const { id } = req.params;
    try {
      const result = await database.query('SELECT * FROM users WHERE id = $1', [id]);
      if (result.rowCount <= 0) {
        res.status(400).send({ error: 'User not found' });
      }
      res.send(result.rows[0]);
    } catch ({ message }) {
      res.status(500).send({ error: { message } });
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const result = await database.query('DELETE FROM users WHERE id = $1', [id]);
      if (result.rowCount <= 0) {
        res.status(400).send({ error: 'User not found' });
      }
      res.status(204).send();
    } catch ({ message }) {
      res.status(500).send({ error: { message } });
 ;;   }
  } */
};
