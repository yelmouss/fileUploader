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


// Ajoutez cette fonction dans votre fichier controller
// Modifiez cette fonction dans votre fichier controller
exports.getOrderBySearchInput = async (req, res, next) => {
    const { searchInput } = req.params;

    try {
        const orders = await Commande.find({
            $or: [
                { ClientPhone: searchInput }, // Recherche par numéro de téléphone
                { _id: searchInput }, // Recherche par ID
            ],
        });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching order by search input:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

  