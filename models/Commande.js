const mongoose = require('mongoose');
var mongodbErrorHandler = require('mongoose-mongodb-errors');
const commandeSchema = new mongoose.Schema({

  idProduits: [String],
  quantites: [Number],
  prixUnitaire: [Number],
  prixTotal: [Number],
  Status: { type: String, default: 'En attente de confirmation' },
  AdresseLivraison: { type: String, required: true },
  ClientMail: { type: String, required: true },
  ClientPhone: { type: String, required: true },
}, {
  timestamps: true // Cette option ajoute les champs createdAt et updatedAt au schéma
});


commandeSchema.plugin(mongodbErrorHandler);
const Commande = mongoose.model('Commande', commandeSchema);

module.exports = Commande;
