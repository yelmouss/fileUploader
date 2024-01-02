// Mise à jour du routeur (routes/categories.js)

const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const ctrlCategories = require('../controller/CategoriesController'); // Mettez à jour l'import ici

router.get('/get',  ctrlCategories.getAllSauces);
router.post('/',   multer, ctrlCategories.createCategory);
router.get('/:id',  ctrlCategories.getOneSauce);
router.put('/:id',  multer, ctrlCategories.modifySauce);
router.delete('/:id',  ctrlCategories.deleteSauce);

module.exports = router;
