-- Création de la base de données
CREATE DATABASE IF NOT EXISTS monteedb;
USE monteedb;

-- Table utilisateur
CREATE TABLE utilisateur (
    id_utilisateur INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    telephone VARCHAR(15),
    id_role INT NOT NULL,
    FOREIGN KEY (id_role) REFERENCES role(id_role) ON DELETE CASCADE
);

-- Table adresse
CREATE TABLE adresse (
    id_adresse INT AUTO_INCREMENT PRIMARY KEY,
    id_utilisateur INT NOT NULL,
    adresse VARCHAR(255) NOT NULL,
    ville VARCHAR(100) NOT NULL,
    code_postal VARCHAR(20) NOT NULL,
    pays VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id_utilisateur) ON DELETE CASCADE
);

-- Table produit
CREATE TABLE produit (
    id_produit INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(150) NOT NULL,
    description TEXT,
    prix DECIMAL(10,2) NOT NULL,
    theme VARCHAR(50),
    genre ENUM('homme', 'femme') NOT NULL,
    image VARCHAR(255)
);

-- Table panier
CREATE TABLE panier (
    id_panier INT AUTO_INCREMENT PRIMARY KEY,
    id_utilisateur INT NOT NULL,
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id_utilisateur) ON DELETE CASCADE
);

-- Table personnalisation
CREATE TABLE personnalisation (
    id_personnalisation INT AUTO_INCREMENT PRIMARY KEY,
    texte VARCHAR(255) DEFAULT NULL,
    image VARCHAR(255) DEFAULT NULL,
    couleur VARCHAR(20) NOT NULL
);

-- Table ligne_panier
CREATE TABLE ligne_panier (
    id_ligne_panier INT AUTO_INCREMENT PRIMARY KEY,
    id_panier INT NOT NULL,
    id_produit INT NOT NULL,
    quantite INT NOT NULL,
    id_personnalisation INT DEFAULT NULL,
    FOREIGN KEY (id_panier) REFERENCES panier(id_panier) ON DELETE CASCADE,
    FOREIGN KEY (id_produit) REFERENCES produit(id_produit) ON DELETE CASCADE,
    FOREIGN KEY (id_personnalisation) REFERENCES personnalisation(id_personnalisation)
);

-- Table commande
CREATE TABLE commande (
    id_commande INT AUTO_INCREMENT PRIMARY KEY,
    id_utilisateur INT NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    statut ENUM('en_attente', 'validee', 'annulee') DEFAULT 'en_attente',
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id_utilisateur) ON DELETE CASCADE
);

-- Table ligne_commande
CREATE TABLE ligne_commande (
    id_ligne_commande INT AUTO_INCREMENT PRIMARY KEY,
    id_commande INT NOT NULL,
    id_produit INT NOT NULL,
    quantite INT NOT NULL,
    prix_total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_commande) REFERENCES commande(id_commande) ON DELETE CASCADE,
    FOREIGN KEY (id_produit) REFERENCES produit(id_produit) ON DELETE CASCADE
);

-- Table role
CREATE TABLE role (
    id_role INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Table taille (facultatif)
CREATE TABLE taille (
    id_taille INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(10) NOT NULL UNIQUE
);

-- Insertion des rôles
INSERT INTO role (name)
VALUES 
    ('admin'),
    ('user');

-- Insertion des utilisateurs
INSERT INTO utilisateur (nom, email, mot_de_passe, telephone, id_role)
VALUES 
    ('Admin', 'admin@montee.com', '$argon2i$v=19$m=16,t=2,p=1$dnFzeGcwWWZnbTEwU0t4ag$R7UqUh9Zm+/shXBswcTqDw', '0600000000', 1),



    

-- Insertion de produits exemples
INSERT INTO produit (nom, description, prix, theme, genre, image)
VALUES 
    ('T-shirt Basique', 'Un t-shirt classique.', 10.00, 'casual', 'homme', 'image1.jpg'),
    ('T-shirt Femme', 'T-shirt stylé pour femme.', 15.00, 'fashion', 'femme', 'image2.jpg');

-- Insertion de tailles exemples
INSERT INTO taille (nom)
VALUES 
    ('S'),
    ('M'),
    ('L'),
    ('XL');
