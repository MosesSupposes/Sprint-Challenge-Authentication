const jwt = require('jsonwebtoken')
const jwtSecret = require('../config/secrets').JWT_SECRET
/* 
	complete the middleware code to check if the user is logged in
	before granting access to the next middleware/route handler
*/

module.exports = (req, res, next) => {
	const token = req.headers.authorization

	if (token) {
		jwt.verify(token, jwtSecret, (err, decodedToken) => {
			if (err) {
				res.status(400).json({ error: { message: 'Invalid token.'}})				
			} else {
				req.user = decodedToken.username
				next()
			}
		})
	} else {
		res.status(401).json({ error: { message: 'You need a token to access this endpoint. Login and set it your request header under the "authoriazation" field.' } })
	}
};
