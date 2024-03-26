const mongoose = require('mongoose');

const { Schema } = mongoose;

const condidatSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, 'is required']
    },


        email:{
            type:String,
            required:[true, 'is required'],
            unique:true,
            index:true,
            
        },
 
  lettre_de_motivation: { type: String },
  file: { type: String },
  
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  accepted: { type: Boolean, default: false },
  titrePoste: { type: String, required: [true, 'Titre du poste is required'] },
}
);
const CondidatSchema = mongoose.model("condidats", condidatSchema);

module.exports = CondidatSchema;
