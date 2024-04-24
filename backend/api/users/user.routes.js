module.exports = (app) => {
  const userController = require("./user.controllers");
  var router = require("express").Router();
  const myMulter = require("../../middleware/Multer");
  const { checkToken } = require("../../middleware/tokenValidation");

  //= ===============================
  // Public routes
  
  //= ===============================
  //TODO add to swagger
  router.get("/", userController.getAllUsers);
  router.get("/:id", userController.getUserById);
  router.put("/:id", userController.updateUserById);
  router.delete("/:id", userController.deleteUserById);
  router.get('/role/admin', userController.getAdminUsers);
router.get('/my-condidats/:userId',userController.getUserCondidats);
router.post("/upload-image", myMulter, userController.uploadImage);

  app.use("/users", router);
};
