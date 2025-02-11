const express = require('express');
const db = require('./database');
const session = require('express-session');
const Keycloak = require('keycloak-connect');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Configuration de Keycloak
const memoryStore = new session.MemoryStore();
app.use(session({
  secret: 'api-secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore,
}));
const keycloak = new Keycloak({ store: memoryStore }, './keycloak-config.json');
app.use(keycloak.middleware());

// Routes
app.get('/', (req, res) => {
  res.json("Registre de personnes! Choisissez le bon routage!");
});

// Récupérer toutes les personnes (protégée par Keycloak)
app.get('/personnes', keycloak.protect(), (req, res) => {
  db.all("SELECT * FROM personne", [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({ "message": "success", "data": rows });
  });
});

// Récupérer une personne par ID
app.get('/personnes/:id', keycloak.protect(), (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM personne WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ "error": "Personne non trouvée" });
      return;
    }
    res.json({ "message": "success", "data": row });
  });
});

// Créer une nouvelle personne (protégée par Keycloak)
app.post('/personnes', keycloak.protect(), (req, res) => {
  const { nom, adresse } = req.body;
  db.run(
    `INSERT INTO personne (nom, adresse) VALUES (?, ?)`,
    [nom, adresse],
    function (err) {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.json({ "message": "success", "data": { id: this.lastID } });
    }
  );
});

// Mettre à jour une personne (protégée par Keycloak)
app.put('/personnes/:id', keycloak.protect(), (req, res) => {
  const id = req.params.id;
  const { nom, adresse } = req.body;
  db.run(
    `UPDATE personne SET nom = ?, adresse = ? WHERE id = ?`,
    [nom, adresse, id],
    function (err) {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.json({ "message": "success" });
    }
  );
});

// Supprimer une personne (protégée par Keycloak)
app.delete('/personnes/:id', keycloak.protect(), (req, res) => {
  const id = req.params.id;
  db.run(`DELETE FROM personne WHERE id = ?`, id, function (err) {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({ "message": "success" });
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});