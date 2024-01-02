const express = require('express');
const router = express.Router();

const ctrlCommandes = require('../controller/CommandeController');


router.post('/', ctrlCommandes.createCommande);
router.get('/:searchInput', ctrlCommandes.getOrderBySearchInput);

module.exports = router;