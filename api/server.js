const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authModel = require('./auth/authModel.js')

const authenticate = require('./auth/authenticate-middleware.js');
const validateFields = require('./auth/validateFieldsMiddleware.js')
const authRouter = require('./auth/auth-router.js');
const jokesRouter = require('./jokes/jokes-router.js');

const server = express();
const requireUsernameAndPassword = validateFields(['username', 'password'])

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/api/users', authenticate,  async (req, res) => {
    try {
      const users = await authModel.all()
      res.status(200).json(users)
    } catch(e) {
      res.status(404).json({ error: { message: 'There are no users stored in the database yet.'}})
    }
  })

server.use('/api/auth', requireUsernameAndPassword, authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

server.use(function NotFound(req, res, next) {
    const err = new Error('Not found.')
    err.status = 404

    next(err)
})

server.use(function errorHandler(error, req, res, next) {
    error.status = error.status || 500
    error.message = error.message || 'Internal server error.'

    res.status(error.status).json({ error: { message: error.message } })
})

module.exports = server;
