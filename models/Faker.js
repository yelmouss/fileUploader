const faker = require('faker');
const Sauce = require('./Image'); // Assurez-vous d'ajuster le chemin selon votre structure de fichiers

const createFakeSauce = () => {
    return new Sauce({
        name: faker.lorem.word(),
        prixUnite: faker.random.number({ min: 1, max: 10, precision: 0.01 }),
        Unite: 'Bouteille', // Vous pouvez ajuster cela en fonction de vos besoins
        homeFilter: faker.random.arrayElement(['Promos de la semaine', 'C\'est la saison', 'Autre filtre']),
        prixKilo: faker.random.number({ min: 5, max: 20, precision: 0.01 }),
        imageUrl: faker.image.food(), // Utilisez faker.image.imageUrl() pour des images aléatoires
    });
};

// Exemple d'utilisation pour générer et sauvegarder 10 fausses sauces
for (let i = 0; i < 10; i++) {
    const fakeSauce = createFakeSauce();
    fakeSauce.save()
        .then(() => console.log(`Sauce ${i + 1} créée !`))
        .catch(error => console.error(error));
}
