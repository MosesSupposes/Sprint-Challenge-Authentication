const router = require('express').Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const authModel = require('./authModel')
const { JWT_SECRET } = require('../config/secrets')

router.post('/register', (req, res) => {
  try {
    bcrypt.hash(req.body.password, 8, async (err, encryptedPw) => {
      if (err) res.status(500).json({error: { message: 'Internal server error.'}})
      else {
        req.body.password = encryptedPw
        const newUser = await authModel.create(req.body)
        res.status(201).json(newUser)
      }
    })

  } catch(e) {
    res.status(500).json({ error: { message: 'Internal server error.'}})
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await authModel.findByUsername(req.body.username)
    
    bcrypt.compare(req.body.password, user.password, (err, passwordsMatch) => {
      if (err) res.status(500).json({ error: { message: 'Internal server error.'}})
      else {
        if (passwordsMatch) {
          res.status(200).json({
            success: `Welcome ${user.username}!`,
            user,
            token: generateToken(user)
          })
        } else {
          res.status(400).json({ error: { message: "Invalid password."}})
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

    return jwt.sign(payload, JWT_SECRET, options)
  }
});

module.exports = router;
