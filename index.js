const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const saucesRoutes = require('./routes/Images');
const CommandesRoutes = require('./routes/Commande');
var cors = require('cors')

const path = require('path');
const app = express();
app.use(cors())
dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    const databaseName = mongoose.connection.name;
    console.log(`Connexion à la base de données '${databaseName}' réussie !`);
  })
  .catch((error) => console.log('Connexion à MongoDB échouée !', error));

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Définissez le chemin du répertoire images pour servir des fichiers statiques
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/', saucesRoutes);
app.use('/api/commandes/', CommandesRoutes);

module.exports = app;
