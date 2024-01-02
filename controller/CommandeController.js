delete require.cache[require.resolve('../models/Commande')];
const Commande = require('../models/Commande');

// Créer une commande
exports.createCommande = async (req, res, next) => {
    try {
        // Récupérer les données de la requête
        const { idProduits,
            quantites,
            prixUnitaire,
            prixTotal,
            AdresseLivraison,
            ClientMail,
            ClientPhone } = req.body;

        // Créer une nouvelle instance de la commande
        const commande = new Commande({
            idProduits: idProduits,
            quantites: quantites,
            prixUnitaire: prixUnitaire,
            prixTotal: prixTotal,
            AdresseLivraison: AdresseLivraison,
            ClientMail: ClientMail,
            ClientPhone: ClientPhone,
            /* autres champs */
        });

        // Sauvegarder la commande dans la base de données
        const savedCommande = await commande.save();

        // Répondre avec un statut 201 et les détails de la commande créée
        res.status(201).json({
            message: 'Commande créée avec succès',
            commande: savedCommande,
        });
    } catch (error) {
        // Gérer les erreurs et répondre avec un statut 400 en cas d'erreur
        console.error('Erreur lors de la création de la commande:', error);
        res.status(400).json({
            error: 'Erreur lors de la création de la commande',
        });
    }
};
