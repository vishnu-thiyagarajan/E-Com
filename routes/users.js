const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.route('/').post((req, res) => {
    if (!req.body.username || !req.body.password) res.status(403).send({ message: 'username and password needed' })
    User.findOne({username: req.body.username},async function (err, docs) {
        if (err) throw (err)
        if (!docs) return res.status(404).send({ message: 'cannot find user' })
        try {
          if (await bcrypt.compare(req.body.password, docs.password)) {
            const accessToken = jwt.sign({ userID: docs._id }, process.env.ACCESS_TOKEN_SECRET)
            return res.status(200).send({ accessToken: accessToken, loggedUser: docs.username, userID: docs._id })
          }
          return res.status(403).send({ message: 'wrong password' })
        } catch (err) {
          console.log(err)
          res.status(500).send({ message: 'server side error' })
        }
      })
});

router.route('/add').post(async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) res.status(403).send({ message: 'username and password needed' })
  const hassedPswd = await bcrypt.hash(password, 10)
  const newUser = new User({username, password: hassedPswd});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;