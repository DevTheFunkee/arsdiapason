-- // create first tables

CREATE TABLE psicologo (
    id INT AUTO_INCREMENT,
    mail varchar(40) NOT NULL UNIQUE,
    password varchar(20) NOT NULL,
    nome varchar(50) NOT NULL,
    cognome varchar(50) NOT NULL,
    data_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_mod TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE bambino (
    id INT AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    cognome VARCHAR(50) NOT NULL,
    data_nascita DATE NOT NULL,
    citta_nascita VARCHAR(30) NOT NULL,
    numero_fratelli  TINYINT(3) NOT NULL,
    numero_sorelle TINYINT(3) NOT NULL,
    ordine_genitura TINYINT(3) NOT NULL,
    lavoro_padre VARCHAR(50) NOT NULL,
    lavoro_madre VARCHAR(50) NOT NULL,
    titolo_studio_padre  VARCHAR(50) NOT NULL,
    titolo_studio_madre  VARCHAR(50) NOT NULL,
    figlio_adottivo char(2) NOT NULL,
    data_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_mod TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE rel_psicologo_bambino (
    id_psicologo int NOT NULL,
    id_bambino int NOT NULL,
    data_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_mod TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id_psicologo, id_bambino)
);

CREATE TABLE scheda (
    numero TINYINT(2) NOT NULL,
    titolo VARCHAR(15) NOT NULL,
    obbiettivo VARCHAR(40) NOT NULL,
    url_img  VARCHAR(15) NOT NULL,
    data_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_mod TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(numero)
);

CREATE TABLE prova_scheda (
    id TINYINT(3) NOT NULL,
    numero_scheda TINYINT(2) NOT NULL,
    tipo VARCHAR(10),
    testo VARCHAR(30),
    anni TINYINT(1) NOT NULL,
    prova TINYINT(1),
    data_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_mod TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE rel_bambino_scheda (
    id_bambino INT NOT NULL,
    id_prova_scheda TINYINT(3) NOT NULL,
    data_ins TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_mod TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id_bambino, id_prova_scheda)
);

-- //@UNDO

DROP TABLE psicologo;
DROP TABLE bambino;
DROP TABLE rel_psicologo_bambino;
DROP TABLE scheda;
DROP TABLE prova_scheda;
DROP TABLE rel_bambino_scheda;
