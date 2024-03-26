const CondidatSchema = require("../condidates/condidat.models");
require("dotenv").config();

// Créer un nouveau condidat
exports.createCondidat = async (req, res, next) => {
    const { name, email, lettre_de_motivation, titrePoste } = req.body; // Ajoutez le titre du poste à la requête
    const { file } = req;
    let owner = null;
    if (req.user) {
        owner = req.user;
    }
    const newCondidat = new CondidatSchema({
        name,
        email,
        lettre_de_motivation,
        titrePoste, // Ajoutez le titre du poste à l'objet newCondidat
        owner,
    file: (file && file.filename) || null,
    });
  
    try {
        const saved = await newCondidat.save();
        return res.send({
            success: true,
            information: saved,
        });
    } catch (e) {
        next(e);
    }
};  


// Obtenir tous les condidats
exports.getAllCondidats = async (req, res, next) => {
    try {
        const condidats = await CondidatSchema.find();
        return res.send({
            success: true,
            condidats: condidats,
        });
    } catch (e) {
        next(e);
    }
};

// Obtenir un condidat par son ID
exports.getCondidatById = async (req, res, next) => {
    const condidatId = req.params.id;
    try {
        const condidat = await CondidatSchema.findById(condidatId);
        if (!condidat) {
            return res.status(404).send({
                success: false,
                message: "Condidat not found",
            });
        }
        return res.send({
            success: true,
            condidat: condidat,
        });
    } catch (e) {
        next(e);
    }
};

// Supprimer un condidat par son ID
exports.deleteCondidatById = async (req, res, next) => {
    const condidatId = req.params.id;
    try {
        const deletedCondidat = await CondidatSchema.findByIdAndDelete(condidatId);
        if (!deletedCondidat) {
            return res.status(404).send({
                success: false,
                message: "condidat not delete",
            });
        }
        return res.send({
            success: true,
            message: "condidat deleted successfully",
        });
    } catch (e) {
        next(e);
    }
};

// Obtenir tous les condidats acceptés
exports.getAcceptedCondidats = async (req, res, next) => {
    try {
        // Récupérer tous les condidats acceptés depuis la base de données
        const acceptedCondidats = await CondidatSchema.find({ accepted: true });
        res.json(acceptedCondidats);
    } catch (error) {
        console.error('Error fetching accepted condidats:', error);
        res.status(500).json({ error: 'Failed to fetch accepted condidats' });
    }
};

// Accepter un condidat par son ID
exports.acceptCondidat = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedCondidat = await CondidatSchema.findByIdAndUpdate(id, { accepted: true }, { new: true });
        res.json(updatedCondidat);
      } catch (error) {
        console.error('Error accepting condidat:', error);
        res.status(500).json({ error: 'Failed to accept condidat' });
      }
};
