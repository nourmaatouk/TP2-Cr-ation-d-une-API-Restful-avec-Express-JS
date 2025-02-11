const sqlite3 = require('sqlite3').verbose();

// Connexion à la base de données SQLite
const db = new sqlite3.Database('./maBaseDeDonnees.sqlite', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connecté à la base de données SQLite.');

        // Création de la table si elle n'existe pas
        db.run(`CREATE TABLE IF NOT EXISTS personne (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT NOT NULL,
            adresse TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                // Insertion de données initiales
                const personnes = ['Bob', 'Alice', 'Charlie'];
                const adresses = ['1 rue de Paris', '2 rue de Londres', '3 rue de Berlin'];

                personnes.forEach((personne, index) => {
                    db.run(`INSERT INTO personne (nom, adresse) VALUES (?, ?)`, 
                    [personne, adresses[index]], (err) => {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log(`Donnée insérée: ${personne} - ${adresses[index]}`);
                        }
                    });
                });
            }
        });
    }
});

module.exports = db;