import database from '../database';

export default class CategoryController {
	static async createCategory(req, res) {
    const {
      name = '', description = '',
    } = req.body;

    if (!name || !description) {
      res.status(400).send({ message: 'All fields are required.' });
      return;
    }

    try {
      let result = await database.query('SELECT name FROM products WHERE name = $1', [name]);

      if (result.rowCount > 0) {
        res.status(409).send({ message: 'This category already exists.' });
        return;
      }

      result = await database.query(
        `INSERT INTO categories 
      (
        name,
        description)
        VALUES
        ($1, $2)
      `,
        [name, description],
      );

      res.status(201).send({ message: 'Category created successfully' });
      return;
    } catch ({ message }) {
      res.status(500).send({ error: { message } });
    }
  }

  static async getAllCategories(req, res) {
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
  }
}
