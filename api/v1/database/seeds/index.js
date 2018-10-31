import { hashPassword } from '../../helpers/inputvalidator';

export default async (client) => {
  console.log('Seeding Database...');
  const adminPassword = await hashPassword('adminpassword');
  const attendantPassword = await hashPassword('password');

  const admin = ['Tommy', 'Vercetti', 'tomvee@gmail.com', adminPassword, true];
  const attendant = ['Carl', 'Johnson', 'cj@gmail.com', attendantPassword];

  await client.query(
    `INSERT INTO users
    (firstName, lastName, email, password, is_admin) VALUES ($1, $2, $3, $4, $5)
    `,
    admin,
  );

  await client.query(
    `INSERT INTO users
    (firstName, lastName, email, password) VALUES ($1, $2, $3, $4)
    `,
    attendant,
  );
  
  console.log('✨ Finished seeding');
};
