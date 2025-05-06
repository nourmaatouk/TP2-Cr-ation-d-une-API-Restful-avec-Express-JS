# API RESTful avec Express.js et SQLite3

Ce projet est une API RESTful développée avec Express.js et SQLite3, implémentant les bonnes pratiques de développement d'API et incluant une authentification avec Keycloak.

## Technologies Utilisées

- Node.js
- Express.js
- SQLite3
- Keycloak (pour l'authentification OAuth 2.0)
- Express-session
- Postman (pour les tests API)

## Prérequis

- Node.js (version 12 ou supérieure)
- npm (généralement installé avec Node.js)
- Keycloak Server (pour l'authentification)

## Installation

1. Cloner le repository :
```bash
git clone [URL_DU_REPO]
cd TP2-Cr-ation-d-une-API-Restful-avec-Express-JS-main
```

2. Installer les dépendances :
```bash
npm install
```

3. Configurer Keycloak :
   - Installer et configurer un serveur Keycloak
   - Créer un nouveau client dans Keycloak
   - Mettre à jour le fichier `keycloak-config.json` avec vos paramètres

## Configuration

1. Vérifier que le fichier `keycloak-config.json` contient les bonnes informations de configuration :
```json
{
  "realm": "votre-realm",
  "auth-server-url": "http://localhost:8080/auth",
  "ssl-required": "external",
  "resource": "votre-client",
  "public-client": true
}
```

2. La base de données SQLite est automatiquement initialisée lors du premier lancement.

## Démarrage du Serveur

```bash
node index.js
```

Le serveur démarrera sur le port 3000 (http://localhost:3000).

## Endpoints de l'API

Tous les endpoints sont protégés par Keycloak et nécessitent une authentification.

### Personnes

- `GET /personnes` - Récupérer toutes les personnes
- `GET /personnes/:id` - Récupérer une personne par ID
- `POST /personnes` - Créer une nouvelle personne
  ```json
  {
    "nom": "John Doe",
    "adresse": "123 Rue Example"
  }
  ```
- `PUT /personnes/:id` - Mettre à jour une personne
  ```json
  {
    "nom": "John Doe",
    "adresse": "456 Nouvelle Adresse"
  }
  ```
- `DELETE /personnes/:id` - Supprimer une personne

## Tests

Utilisez Postman ou un autre client HTTP pour tester les endpoints. N'oubliez pas d'inclure le token d'authentification Keycloak dans les headers de vos requêtes :

```
Authorization: Bearer <votre-token>
```

## Structure du Projet

- `index.js` - Point d'entrée de l'application et définition des routes
- `database.js` - Configuration de la base de données SQLite
- `keycloak-config.json` - Configuration de Keycloak



