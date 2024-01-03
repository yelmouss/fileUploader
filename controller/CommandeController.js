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

  // Modifier le statut d'une commande
exports.updateOrderStatus = async (req, res, next) => {
    const { orderId } = req.params;
    const { newStatus } = req.body;

    try {
        const updatedOrder = await Commande.findByIdAndUpdate(
            orderId,
            { Status: newStatus },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({
            message: 'Order status updated successfully',
            order: updatedOrder,
        });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Supprimer une commande
exports.deleteOrder = async (req, res, next) => {
    const { orderId } = req.params;

    try {
        const deletedOrder = await Commande.findOneAndDelete({ _id: orderId });

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({
            message: 'Order deleted successfully',
            order: deletedOrder,
        });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Modifier le contenu d'une commande
exports.updateOrderContent = async (req, res, next) => {
    const { orderId } = req.params;
    const { idProduits, quantites, prixUnitaire, prixTotal } = req.body;

    try {
        const updatedOrder = await Commande.findByIdAndUpdate(
            orderId,
            {
                idProduits: idProduits,
                quantites: quantites,
                prixUnitaire: prixUnitaire,
                prixTotal: prixTotal,
            },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({
            message: 'Order content updated successfully',
            order: updatedOrder,
        });
    } catch (error) {
        console.error('Error updating order content:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Obtenir toutes les commandes
exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await Commande.find();

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching all orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
