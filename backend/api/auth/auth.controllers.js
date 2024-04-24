const UserSchema = require("../users/user.models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
require("dotenv").config();
const { toPlainObjectForJwt } = require("../../utils/FunctionUtils");

exports.register = async (req, res) => {
  const data = { ...req.body, role: req.body.role || "CONDIDAT" };

  try {
    // Vérification si l'e-mail existe déjà
    const existingUser = await UserSchema.findOne({ email: data.email });

    if (existingUser) {
      return res.status(400).json({ error: "Cet e-mail est déjà utilisé." });
    }

    // Si l'e-mail n'existe pas, procédez à l'enregistrement de l'utilisateur
    const newUser = new UserSchema(data);
    const salt = bcrypt.genSaltSync(10);
    const cryptedPass = await bcrypt.hashSync(data.password, salt);
    newUser.password = cryptedPass;

    const user = await newUser.save();
    const payload = toPlainObjectForJwt(user);
    token = sign(newUser.toObject(), process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    res.status(201).send({ mytoken: token, role: user.role });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de l'enregistrement de l'utilisateur." });
  }
};

exports.login = async (req, res) => {
  data = req.body;
  user = await UserSchema.findOne({ email: data.email });
  if (!user) {
    res.status(404).send("email or password invalid !");
  } else {
    validPass = bcrypt.compareSync(data.password, user.password);
    if (!validPass) {
      res.status(401).send("email or password invalid !");
    } else {
      const payload = toPlainObjectForJwt(user);
      token = sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });
      res
        .status(200)
        .send({ mytoken: token, role: user.role, userID: user._id });
    }
  }
};
