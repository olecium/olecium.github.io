const Pool = require('pg').Pool;
const pool = new Pool({
	user: 'library_admin',
	host: 'localhost',
	database: 'ebook_library',
	password: '123',
	port: 5432,
});

const getBooks = (request, response) => {
	pool.query('SELECT * FROM books LEFT JOIN authors ON books.author_id = authors.author_id', (error, results) => {
		if(error) {
			console.log(error);
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

const getBookById = (request, response) => {
	const id = parseInt(request.params.id);

	pool.query('SELECT * FROM books WHERE id = $1', [id], (error, results) => {
		if(error) {
			console.log(error);
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

const loginUser = (request, response) => {
	const login = request.body.login;
	const password = request.body.password;

	pool.query('SELECT * FROM users WHERE login = $1 AND password = $2', [login, password], (error, results) => {
		if(error) {
			console.log(error);
			throw error;
		}
		response.status(200).json(results.rows);
	});
};


module.exports = {
	loginUser,
	getBooks,
	getBookById
}
