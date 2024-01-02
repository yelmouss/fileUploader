const mongoose = require('mongoose');
var mongodbErrorHandler = require('mongoose-mongodb-errors');

const categorieSchema = mongoose.Schema({
    name: { type: String, required: true },
    prixUnite: { type: Number, required: true },
    Unite: { type: String, required: true },
    categorie: { type: String, required: true },
    prixKilo: { type: Number, required: true },
    imageUrl: { type: String, required: true },
}, {
    timestamps: true // Cette option ajoute les champs createdAt et updatedAt au schéma
});

categorieSchema.plugin(mongodbErrorHandler);
module.exports = mongoose.model('Categorie', categorieSchema);
