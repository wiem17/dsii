const UserSchema = require("../users/user.models");
require("dotenv").config();

exports.getAllUsers = async (req, res) => {
  UserSchema.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.getUserById = (req, res) => {
  myid = req.params.id;
  UserSchema.findOne({ _id: myid })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.updateUserById = (req, res) => {
  //TODO update
  id = req.params.id;
  newData = req.body;
  UserSchema.findByIdAndUpdate({ _id: id }, newData)
    .then((updated) => {
      res.send(updated);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.deleteUserById = (req, res) => {
  id = req.params.id;
  UserSchema.findOneAndDelete({ _id: id })
    .then((deletedUser) => {
      res.send(deletedUser);
    })
    .catch((err) => {
      res.send(err);
    });
};
