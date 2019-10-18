const router = require('express').Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const authModel = require('./authModel')
const { jwtSecret } = require('../config/secrets')

router.post('/register', async (req, res) => {
  try {
    const newUser = await authModel.create()
    res.status(201).json(newUser)

  } catch(e) {
    res.status(500).json({ error: { message: 'Internal server error.'}})
  }

});

router.post('/login', validateFields(['username', 'password']), async (req, res) => {
  try {
    const user = await authModel.findByUsername(req.body.username)
    bcrypt.compare(req.body.password, user.password, (err, passwordsMatch) => {
      if (err) res.status(500).json({ error: { message: 'Internal server error.'}})
      else {
        if (passwordsMatch) {
          res.status(200).json({
            success: `Welcome ${user.username}`,
            user,
            token: generateToken()
          })
        }
      }
    })
  } catch(e) {
    res.status(404).json({ error: { message: `Couldn't find the user ${req.body.username}`}})
  }

  function generateToken(user) {
    const payload = {
      username: user.username,
      subject: user.id,
    }
    const options = { expiresIn: '1h' }

    return jwt.sign(payload, jwtSecret, options)
  }
});

module.exports = router;
