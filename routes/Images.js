const express = require('express');
const router = express.Router();

const ctrlSauces = require('../controller/imagesController');
const multer = require('../middleware/multer-config');


router.get('/',  ctrlSauces.getAllSauces);

router.post('/',  multer, ctrlSauces.createSauce);
router.get('/:id',  ctrlSauces.getOneSauce);

router.put('/:id',  multer, ctrlSauces.modifySauce);
router.delete('/:id',  ctrlSauces.deleteSauce);


module.exports = router;