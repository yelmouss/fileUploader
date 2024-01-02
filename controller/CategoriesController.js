const Categorie = require('../models/Categorie');
const fs = require('fs');

exports.createCategory = (req, res, next) => {
    const { prixUnite, name, Unite, categorie, prixKilo } = req.body;
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    console.log(imageUrl)
    // const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;



    const sauce = new Categorie({
        name: name,
        prixUnite: prixUnite,
        Unite: Unite,
        categorie: categorie,
        prixKilo: prixKilo,
        imageUrl: imageUrl,
        // Ajoutez d'autres propriétés en fonction de votre modèle Sauce
    });

    sauce.save()
        .then(() => res.status(201).json({ message: 'Categorie postée !' }))
        .catch((error) => res.status(400).json({ error: error }));
};



exports.getOneSauce = (req, res, next) => {
    
    Categorie.findOne({ _id: req.params.id }) // Utilisez le modèle Categorie ici
        .then((sauce) => res.status(200).json(sauce))
        .catch((error) => res.status(404).json({ error: error }));
};

exports.getAllSauces = (req, res, next) => {
    console.log('hello')
    Categorie.find() // Utilisez le modèle Categorie ici
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => res.status(400).json({ error: error }));
};



exports.modifySauce = (req, res, next) => {
    console.log(req.body);

    const sauceObject = req.body.sauce ? JSON.parse(req.body.sauce) : req.body;
    sauceObject.imageUrl = req.file
        ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        : sauceObject.imageUrl;

        Categorie.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(201).json({ message: 'Categorie updated successfully!' }))
        .catch((error) => res.status(400).json({ error: error }));
};


exports.deleteSauce = (req, res, next) => {
    console.log( req.params.id )
    Categorie.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (!sauce) {
                res.status(404).json({ error: 'Sauce non existante' });
            }
            // if (sauce.userId !== req.auth.userId) {
            //     res.status(403).json({ error: 'Requête non authorisée' });
            // }
            // const filename = sauce.imageUrl.split('/images/')[1];
            // fs.unlink(`images/${filename}`, () => {
            //     Categorie.deleteOne({ _id: req.params.id })
            //         .then(() => res.status(200).json({ message: 'Deleted!' }))
            //         .catch((error) => res.status(400).json({ error: error }));
            // });

            Categorie.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Deleted!' }))
            .catch((error) => res.status(400).json({ error: error }));
        })
        .catch(error => res.status(500).json({ error }))
};
