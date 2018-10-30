import users from './users';
import categories from './categories';
import products from './products';
import sales from './sales';

export default async (client) => {
	try {
		await client.query(users.CREATE_TABLE);
    	await client.query(categories.CREATE_TABLE);
    	await client.query(products.CREATE_TABLE);
    	await client.query(sales.CREATE_TABLE);
	} catch (error) {
		console.log(error);
	}
};