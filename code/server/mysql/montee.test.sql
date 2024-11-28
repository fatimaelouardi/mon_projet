-- Création de la base de données
CREATE DATABASE IF NOT EXISTS monteedb_test;
USE monteedb_test;

-- Table Utilisateur
CREATE TABLE Utilisateur (
    id_utilisateur INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    telephone VARCHAR(15),
    id_role
);

-- Table Adresses
CREATE TABLE adresse (
    id_adresse INT AUTO_INCREMENT PRIMARY KEY,
    id_utilisateur INT NOT NULL,
    adresse VARCHAR(255) NOT NULL,
    ville VARCHAR(100) NOT NULL,
    code_postal VARCHAR(20) NOT NULL,
    pays VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_utilisateur) REFERENCES Utilisateur(id_utilisateur) ON DELETE CASCADE
);

-- Table Produit
CREATE TABLE Produit (
    id_produit INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(150) NOT NULL,
    description TEXT,
    prix DECIMAL(10,2) NOT NULL,
    theme VARCHAR(50),
    genre ENUM('homme', 'femme') NOT NULL,
    image VARCHAR(255)
);

-- Table Panier
CREATE TABLE Panier (
    id_panier INT AUTO_INCREMENT PRIMARY KEY,
    id_utilisateur INT NOT NULL,
    FOREIGN KEY (id_utilisateur) REFERENCES Utilisateur(id_utilisateur) ON DELETE CASCADE
);

-- Table Personnalisation
CREATE TABLE Personnalisation (
    id_personnalisation INT AUTO_INCREMENT PRIMARY KEY,
    texte VARCHAR(255) DEFAULT NULL,
    image VARCHAR(255) DEFAULT NULL,
    couleur VARCHAR(20) NOT NULL
);

-- Table LignePanier
CREATE TABLE LignePanier (
    id_ligne_panier INT AUTO_INCREMENT PRIMARY KEY,
    id_panier INT NOT NULL,
    id_produit INT NOT NULL,
    quantite INT NOT NULL,
    id_personnalisation INT DEFAULT NULL,
    FOREIGN KEY (id_panier) REFERENCES Panier(id_panier) ON DELETE CASCADE,
    FOREIGN KEY (id_produit) REFERENCES Produit(id_produit) ON DELETE CASCADE,
    FOREIGN KEY (id_personnalisation) REFERENCES Personnalisation(id_personnalisation)
);

-- Table Commande
CREATE TABLE Commande (
    id_commande INT AUTO_INCREMENT PRIMARY KEY,
    id_utilisateur INT NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    statut ENUM('en_attente', 'validee', 'annulee') DEFAULT 'en_attente',
    FOREIGN KEY (id_utilisateur) REFERENCES Utilisateur(id_utilisateur) ON DELETE CASCADE
);

-- Table LigneCommande
CREATE TABLE LigneCommande (
    id_ligne_commande INT AUTO_INCREMENT PRIMARY KEY,
    id_commande INT NOT NULL,
    id_produit INT NOT NULL,
    quantite INT NOT NULL,
    prix_total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_commande) REFERENCES Commande(id_commande) ON DELETE CASCADE,
    FOREIGN KEY (id_produit) REFERENCES Produit(id_produit) ON DELETE CASCADE
);

-- Table de jointure Produit_Taille (facultative, pour les tailles)
CREATE TABLE Produit_Taille (
    id_produit INT NOT NULL,
    id_taille INT NOT NULL,
    PRIMARY KEY (id_produit, id_taille),
    FOREIGN KEY (id_produit) REFERENCES Produit(id_produit) ON DELETE CASCADE
);

-- Table de jointure Produit_Couleur (facultative, pour les couleurs)
CREATE TABLE Produit_Couleur (
    id_produit INT NOT NULL,
    id_couleur INT NOT NULL,
    PRIMARY KEY (id_produit, id_couleur),
    FOREIGN KEY (id_produit) REFERENCES Produit(id_produit) ON DELETE CASCADE
);

CREATE TABLE Role (
    id_role INT NOT NULL  AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE 
);



CREATE TABLE Taille (
    id_taille INT NOT NULL  AUTO_INCREMENT,
    nom VARCHAR(10) NOT NULL UNIQUE 
);
