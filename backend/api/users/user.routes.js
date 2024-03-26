module.exports = (app) => {
  const userController = require("./user.controllers");
  var router = require("express").Router();
  //const myMulter = require("../../../middleware/Multer");
  const { checkToken } = require("../../middleware/tokenValidation");

  //= ===============================
  // Public routes
  //myMulter.uploadImg.single("image")
  //= ===============================
  //TODO add to swagger
  router.get("/", userController.getAllUsers);
  router.get("/:id", userController.getUserById);
  router.patch("/:id", userController.updateUserById);
  router.delete("/:id", userController.deleteUserById);

  app.use("/users", router);
};
