const Pool = require('pg').Pool;
const pool = new Pool({
	user: 'emmygold',
	host: 'localhost',
	database: 'vendaware',
	password: '123',
	port: 5432,
});


const getTotalGoodSales = (request, response) => {
	pool.query("SELECT COUNT(*) FROM sales WHERE reply='ok'", (error, results) => {
		if(error) {
			console.log(error);
			throw error;
		}
		response.status(200).json(results.rows);
	});
};
const getTotalFailedSales = (request, response) => {
	pool.query("SELECT COUNT(*) FROM sales WHERE reply!='ok'", (error, results) => {
		if(error) {
			console.log(error);
			throw error;
		}
		response.status(200).json(results.rows);
	});
};
const getAllFailedSales = (request, response) => {
	pool.query("SELECT * FROM sales WHERE reply!='ok'", (error, results) => {
		if(error) {
			console.log(error);
			throw error;
		}
		response.status(200).json(results.rows);
	});
};
/*
const getUsers = (request, response) => {
	pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
		if(error) {
			console.log(error);
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

const getUserById = (request, response) => {
	const id = parseInt(request.params.id);

	pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
		if(error) {
			console.log(error);
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

//Authorise user
const authLogin = (request, response) => {
	const { email, password, rememberMe } = request.body;

	pool.query('UPDATE users SET rememberme = $1, authorised = true WHERE email = $2 AND password = $3 RETURNING users.id', [rememberMe, email, password], (error, results) => {

		console.log(results);
		if(error) {
			let errorCode = results.code ? results.code: 0;
			console.log(error);
			throw error;
		}

		response.status(200).json(results.rows);
	});
};
*/

module.exports = {
	getTotalGoodSales,
	getTotalFailedSales,
	getAllFailedSales,
}
