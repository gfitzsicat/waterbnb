// boat queries
export const allBoats = `SELECT * FROM rentals`;

export const boat =  `SELECT * FROM rentals WHERE id = $1`;

export const typeBoats = `SELECT * FROM rentals WHERE type = $1`;

export const boatSearch = `SELECT * FROM rentals WHERE location LIKE $1 AND date <= $2 AND group_size >= $3`;

export const likeBoatVer =  `SELECT * FROM my_rentals JOIN rentals ON my_rentals.rental_id = rentals.id WHERE my_rentals.rental_id = $1;`;

export const addLikeBoat= `INSERT INTO my_rentals (rental_id, location, price, date, group_size, image1) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;

export  const removeLikeBoat = `DELETE FROM my_rentals WHERE rental_id = $1 RETURNING *`

// user queries
export const allUsers = `SELECT * FROM users`;

export const userVer = `SELECT * FROM users WHERE username = $1`;

export const newUser = `INSERT INTO users(username, email, password) VALUES ($1, $2, $3) RETURNING *`;

export const emailVer = "SELECT * FROM users WHERE email = $1";

