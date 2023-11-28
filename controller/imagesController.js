const Sauce = require('../models/Image');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const { description, name } = req.body;
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

    console.log(description);

    const sauce = new Sauce({
        description: description,
        name: name,
        imageUrl: imageUrl,
        // Ajoutez d'autres propriétés en fonction de votre modèle Sauce
    });

    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce postée !' }))
        .catch((error) => res.status(400).json({ error: error }));
};



exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => res.status(200).json(sauce))
        .catch((error) => res.status(404).json({ error: error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => res.status(400).json({ error: error }));
};

exports.modifySauce = (req, res, next) => {

    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {

            Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                .then(() => res.status(201).json({ message: 'Sauce updated successfully!' }))
                .catch((error) => res.status(400).json({ error: error }));
        })
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (!sauce) {
                res.status(404).json({ error: 'Sauce non existante' });
            }
            if (sauce.userId !== req.auth.userId) {
                res.status(403).json({ error: 'Requête non authorisée' });
            }
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Deleted!' }))
                    .catch((error) => res.status(400).json({ error: error }));
            });
        })
        .catch(error => res.status(500).json({ error }))
};

