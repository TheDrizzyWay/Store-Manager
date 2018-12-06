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

  signIn: async (req, res) => {
    const { email, password } = (req.body);

    try {
      const result = await User.signIn(email);
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
      return res.status(200).send({ success: true, message: 'You are now logged in.' });
    } catch (error) {
      return res.status(500).send({ success: false, message: error.message });
    }
  },

// generate token next
/*
      const token = await jwt.generateToken({ id: userId });
      res.status(200).send({ token, message: 'You are logged in.' });
    } catch ({ message }) {
s
    .status(500)
        .send({ error: { message: 'Server encountered a problem while trying to log in.' } });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const result = await database.query('SELECT * FROM users');
      res.status(200).send(result.rows);
    } catch ({ message }) {
      res.status(500).send({ error: { message } });
    }
  }

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
