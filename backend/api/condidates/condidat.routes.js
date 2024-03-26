module.exports = (app) => {
    const condidatController = require("./condidat.controllers");
    const upload = require("../../middleware/multer");

    var router = require("express").Router();
router.post('/create', upload, condidatController.createCondidat);
 router.get("/", condidatController.getAllCondidats);

 router.get("/:id", condidatController.getCondidatById);
  router.delete("/:id", condidatController.deleteCondidatById);
 router.get('/con/acceptedcondidats', condidatController.getAcceptedCondidats);
 router.put('/:id/accept', condidatController.acceptCondidat);
    
    app.use("/condidates", router);
 };