import Category from '../models/Categories';

export default {
  createCategory: async (req, res) => {
    const category = new Category(req.body);
    try {
      const result = await category.create();
      return res.status(201).send({
        success: true,
        message: 'Category created successfully.',
        data: result,
      });
    } catch (error) {
      return res.status(500).send({ success: false, message: error.message });
    }
  },

/*  static async getAllCategories(req, res) {
    try {
      const result = await database.query('SELECT * FROM categories');
      res.status(200).send(result.rows);
    } catch ({ message }) {
      res.status(500).send({ error: { message } });
    }
  }

  static async getCategoryById(req, res) {
    const { id } = req.params;
    try {
      const result = await database.query('SELECT * FROM categories WHERE id = $1', [id]);
      if (result.rowCount <= 0) {
        return res.status(400).send({ error: 'Category id not found'});
      }
      return res.send(result.rows[0]);
    } catch ({ message }) {
      res.status(500).send({ error: { message } });
    }
  }

  static async updateCategory(req, res) {
    const {
      name: cName, description: cDescription, id,
    } = req.params;
    const {
      name, description,
    } = req.body || {};

    try {
      await database.query(
        'UPDATE categories SET name = $1, description = $2 WHERE id = $3',
        [name || cName, description || cDescription, id],
      );

      res.status(200).send({ message: 'Category details updated successfully' });
    } catch ({ message }) {
      res.status(500).send({ error: { message } });
    }
  }

  static async deleteCategory(req, res) {
    const { id } = req.params;
    try {
      const result = await database.query('DELETE FROM categories WHERE id = $1', [id]);
      if (result.rowCount <= 0) {
        res.status(400).send({ error: 'Category not found' });
      }
      res.status(204).send();
    } catch ({ message }) {
      res.status(500).send({ error: { message } });
    }
  } */
};
