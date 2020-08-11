require('dotenv').config();
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const signup = (req, res, next) => {
  User.find({ email: req.body.email }).then((user) => {
    if (user.length >= 1) {
      res.json({
        Mail: 'Mail Exited!',
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        console.log(hash);
        if (err) {
          res.status(500).json({
            error: err,
          });
        } else {
          const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
          });

          user
            .save()
            .then((data) => {
              res.status(201).json({
                message: 'User Created!',
              });
            })
            .catch((err) => {
              res.status(500).json({
                error: err,
              });
            });
        }
      });
    }
  });
};

const login = (req, res, next) => {
  User.find({ email: req.body.email })
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Auth Failed!',
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth Failed',
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_SECRET_KEY,
            {
              expiresIn: '1h',
            }
          );
          return res.status(200).json({
            message: 'Auth Success!',
            token: token,
          });
        }
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
module.exports = {
  signup,
  login,
};
