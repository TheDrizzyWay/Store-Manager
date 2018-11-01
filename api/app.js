import express from 'express';

import router from './v1/routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.get('/', (req, res) => {
  res.status(200).send('Welcome to Store Manager!');
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;
