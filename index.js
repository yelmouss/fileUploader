const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const saucesRoutes = require('./routes/Images');

const path = require('path');
const app = express();

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    // Obtenez le nom de la base de données à partir de l'objet de connexion Mongoose
    const databaseName = mongoose.connection.name;
    console.log(`Connexion à la base de données '${databaseName}' réussie !`);
  })
  .catch((error) => console.log('Connexion à MongoDB échouée !', error));

app.use(express.json());

// Header d'accès global à l'API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/', saucesRoutes);

module.exports = app;
