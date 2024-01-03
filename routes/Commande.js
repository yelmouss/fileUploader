const express = require('express');
const router = express.Router();

const ctrlCommandes = require('../controller/CommandeController');


router.post('/', ctrlCommandes.createCommande);
router.get('/:searchInput', ctrlCommandes.getOrderBySearchInput);

// Ajoutez ces lignes dans votre fichier routes
router.put('/:orderId/status', ctrlCommandes.updateOrderStatus);
router.delete('/:orderId', ctrlCommandes.deleteOrder);
router.put('/:orderId/content', ctrlCommandes.updateOrderContent);
router.get('/', ctrlCommandes.getAllOrders);


module.exports = router;