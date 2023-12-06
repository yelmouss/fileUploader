const mongoose = require('mongoose');
var mongodbErrorHandler = require('mongoose-mongodb-errors');

const sauceSchema = mongoose.Schema ({   
    name: { type: String, required: true },  
    prixUnite: { type: Number, required: true },  
    Unite: { type: String, required: true },    
    homeFilter: { type: String, required: true },    
    prixKilo: { type: Number, required: true },  
    imageUrl: { type: String,required: true  },  
});

sauceSchema.plugin(mongodbErrorHandler);
module.exports = mongoose.model('Sauce', sauceSchema);