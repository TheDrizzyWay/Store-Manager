import express from 'express';
import path from 'path';

import router from './v1/routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../UI')));

app.use('/', router);

app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Store Manager API!');
});
app.get('/api/v1/*', (req, res) => {
  res.status(404).send({ message: 'Invalid request.' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;
