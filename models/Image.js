const mongoose = require('mongoose');
var mongodbErrorHandler = require('mongoose-mongodb-errors');

const sauceSchema = mongoose.Schema ({   
    name: { type: String, required: true },  
    description: { type: String, required: true },  
    imageUrl: { type: String,required: true  },  
});
sauceSchema.plugin(mongodbErrorHandler);
module.exports = mongoose.model('Sauce', sauceSchema);