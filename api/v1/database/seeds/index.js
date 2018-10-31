import { hashPassword } from '../../controllers/helpers';

export default async (client) => {
  console.log('Seeding DB...');
  const adminPassword = await hashPassword('adminsecret');
  const userPassword = await hashPassword('secret');

  const adminUser = ['admin@admin.com', adminPassword, true];
  const user = ['johndoe@mail.com', userPassword];

  await client.query(
    `INSERT INTO users
    (email, password, is_admin) VALUES ($1, $2, $3)
    `,
    adminUser,
  );

  await client.query(
    `INSERT INTO users
    (email, password) VALUES ($1, $2)
    `,
    user,
  );

  // add dummy data
  await client.query(
    `INSERT INTO menus
    (name, price, imgUrl, description) VALUES ($1, $2, $3, $4)`,
    [
      'Ultimate pancakes',
      3000,
      'https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552__340.jpg',
      'Fluffy homemade pancakes with fresh fruit and your choice of maple syrup or house-made chocolate sauce',
    ],
  );

  await client.query(
    `INSERT INTO menus
    (name, price, imgUrl, description) VALUES ($1, $2, $3, $4)`,
    [
      'Smoked salmon & pumpernickel',
      5800,
      'https://cdn.pixabay.com/photo/2017/09/22/19/05/casserole-dish-2776735__340.jpg',
      'Superior Scandinavian salmon presented on our pumpernickel toast with cream cheese mix, Italian caper and lemon twist, along with a side salad',
    ],
  );

  await client.query(
    `INSERT INTO menus
    (name, price, imgUrl, description) VALUES ($1, $2, $3, $4)`,
    [
      'Tasty Cotton Tuna',
      139.0,
      'https://cdn.pixabay.com/photo/2015/03/26/09/45/grapes-690230__340.jpg',
      'Superior Scandinavian salmon presented on our pumpernickel toast with cream cheese mix, Italian caper and lemon twist, along with a side salad',
    ],
  );

  await client.query(
    `INSERT INTO menus
    (name, price, imgUrl, description) VALUES ($1, $2, $3, $4)`,
    [
      'Incredible Plastic Gloves',
      359.99,
      'https://cdn.pixabay.com/photo/2017/12/10/14/47/piza-3010062__340.jpg',
      'Superior Scandinavian salmon presented on our pumpernickel toast with cream cheese mix, Italian caper and lemon twist, along with a side salad',
    ],
  );

  await client.query(
    `INSERT INTO menus
    (name, price, imgUrl, description) VALUES ($1, $2, $3, $4)`,
    [
      'Tasty Meal Salad',
      159.99,
      'https://cdn.pixabay.com/photo/2017/05/07/08/56/pancakes-2291908__340.jpg',
      'Superior Scandinavian salmon presented on our pumpernickel toast with cream cheese mix, Italian caper and lemon twist, along with a side salad',
    ],
  );

  await client.query(
    `INSERT INTO menus
    (name, price, imgUrl, description) VALUES ($1, $2, $3, $4)`,
    [
      'Refined Granite Soap',
      999.99,
      'https://cdn.pixabay.com/photo/2018/08/29/19/01/fig-3640553__340.jpg',
      'Superior Scandinavian salmon presented on our pumpernickel toast with cream cheese mix, Italian caper and lemon twist, along with a side salad',
    ],
  );

  await client.query(
    `INSERT INTO menus
    (name, price, imgUrl, description) VALUES ($1, $2, $3, $4)`,
    [
      'Licensed Rubber Pizza',
      398.05,
      'https://cdn.pixabay.com/photo/2015/06/24/01/15/morning-819362__340.jpg',
      'Superior Scandinavian salmon presented on our pumpernickel toast with cream cheese mix, Italian caper and lemon twist, along with a side salad',
    ],
  );

  await client.query(
    `INSERT INTO menus
    (name, price, imgUrl, description) VALUES ($1, $2, $3, $4)`,
    [
      'Unbranded Rubber Bacon',
      398.05,
      'https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549__340.jpg',
      'Superior Scandinavian salmon presented on our pumpernickel toast with cream cheese mix, Italian caper and lemon twist, along with a side salad',
    ],
  );
  // add more seeds

  console.log('✨ Finished seeding');
};
