const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config(); // Charger les variables d'environnement

const app = express();
app.use(cors());
app.use(express.json()); // Pour traiter les requêtes JSON

// Configuration de la connexion MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
  } else {
    console.log("Connecté à la base de données MySQL.");
  }
});

// Route de test
app.get("/", (req, res) => {
  res.send("Backend API fonctionne !");
});

// Récupérer tous les départements
app.get("/departments", (req, res) => {
  const query = "SELECT * FROM departments";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Erreur SQL lors de la récupération des départements :", err);
      return res.status(500).json({ error: "Erreur interne du serveur" });
    }
    res.json(results);
  });
});

// Route pour récupérer les infos nécessaire a la page CircuitList.vue
app.get("/tracks", (req, res) => {
  const departmentId = req.query.department_id;

  // Vérification si le paramètre est présent
  if (!departmentId) {
    return res.status(400).json({ error: "Le paramètre department_id est requis." });
  }

  const query = `
    SELECT 
      t.id,
      t.name,
      t.terrain_type,
      COALESCE(GROUP_CONCAT(DISTINCT tt.type), '') AS track_types,
      COALESCE(GROUP_CONCAT(DISTINCT va.vehicle_type), '') AS vehicles_allowed
    FROM tracks t
    LEFT JOIN track_types tt ON t.id = tt.track_id
    LEFT JOIN vehicles_allowed va ON t.id = va.track_id
    WHERE t.department_id = ?
    GROUP BY t.id;
  `;

  db.query(query, [departmentId], (err, results) => {
    if (err) {
      console.error("Erreur SQL lors de la récupération des circuits :", err);
      return res.status(500).json({ error: "Erreur interne du serveur." });
    }

    res.json(results);
  });
});


// === Route pour récupérer les infos nécessaire a la page TrackDetails.vue ===
app.get("/track/:id", (req, res) => {
  const trackId = req.params.id;

  // Vérification de l'ID
  if (!trackId) {
    return res.status(400).json({ error: "L'ID du circuit est requis." });
  }

  const query = `
    SELECT 
      t.id,
      t.name,
      t.city,
      t.street_address,
      t.description,
      t.gps_coordinates,
      t.owner_email,
      t.owner_phone,
      t.length,
      t.width,
      t.terrain_type,
      COALESCE(GROUP_CONCAT(DISTINCT tt.type), '') AS track_types,
      COALESCE(GROUP_CONCAT(DISTINCT va.vehicle_type), '') AS vehicles_allowed
    FROM tracks t
    LEFT JOIN track_types tt ON t.id = tt.track_id
    LEFT JOIN vehicles_allowed va ON t.id = va.track_id
    WHERE t.id = ?;
  `;

  db.query(query, [trackId], (err, results) => {
    if (err) {
      console.error("Erreur SQL lors de la récupération des détails du circuit :", err);
      return res.status(500).json({ error: "Erreur interne du serveur." });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Circuit non trouvé." });
    }

    res.json(results[0]);
  });
});







// Route pour la connexion
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis." });
  }

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Erreur lors de la requête SQL :", err);
      return res.status(500).json({ message: "Erreur interne du serveur." });
    }

    if (results.length === 0) {
      return res
        .status(401)
        .json({ message: "Nom d'utilisateur ou mot de passe incorrect." });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Erreur lors de la comparaison des mots de passe :", err);
        return res.status(500).json({ message: "Erreur interne du serveur." });
      }

      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Nom d'utilisateur ou mot de passe incorrect." });
      }

      // Envoyer les informations nécessaires (sans JWT)
      res.json({ success: true, role: user.role, username: user.email });
    });
  });
});

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
