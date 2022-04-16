-- // create initial tables

CREATE TABLE psicologo (
    id INT AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    cognome VARCHAR(50) NOT NULL,
    data_ins TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_mod TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE utente (
    email VARCHAR(40) NOT NULL,
    password VARCHAR(75) NOT NULL,
    active TINYINT(1) NOT NULL DEFAULT 0,
    role VARCHAR(10) NOT NULL,
    id_psicologo INT NOT NULL,
    data_ins TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_mod TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(email),
    CONSTRAINT FK_UT_psico FOREIGN KEY (id_psicologo) REFERENCES psicologo(id)
);

CREATE TABLE istituto (
    id INT AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    regione VARCHAR(50) NOT NULL,
    provincia VARCHAR(50) NOT NULL,
    comune VARCHAR(50) NOT NULL,
    indirizzo VARCHAR(50) NOT NULL,
    data_ins TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_mod TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE bambino (
    id INT AUTO_INCREMENT,
    id_istituto INT,
    sezione VARCHAR(3),
    nome VARCHAR(50) NOT NULL,
    cognome VARCHAR(50) NOT NULL,
    sesso VARCHAR(1) NOT NULL,
    data_nascita DATE NOT NULL,
    comune_nascita VARCHAR(30),
    comune_residenza VARCHAR(30),
    indirizzo_residenza VARCHAR(50),
    numero_fratelli TINYINT(2),
    numero_sorelle TINYINT(2),
    ordine_genitura TINYINT(2),
    lavoro_padre VARCHAR(50),
    lavoro_madre VARCHAR(50),
    titolo_studio_padre VARCHAR(50),
    titolo_studio_madre VARCHAR(50),
    figlio_adottivo CHAR(2),
    note VARCHAR(300),
    data_ins TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_mod TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT FK_BAM_istituto FOREIGN KEY (id_istituto) REFERENCES istituto(id)
);

CREATE TABLE rel_psicologo_bambino (
    id_psicologo INT NOT NULL,
    id_bambino INT NOT NULL,
    data_ins TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_mod TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id_psicologo, id_bambino),
    CONSTRAINT FK_RPB_psico FOREIGN KEY (id_psicologo) REFERENCES psicologo(id),
    CONSTRAINT FK_RPB_bambino FOREIGN KEY (id_bambino) REFERENCES bambino(id)
);

CREATE TABLE rel_psicologo_istituto (
    id_psicologo INT NOT NULL,
    id_istituto INT NOT NULL,
    data_ins TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_mod TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    caricato VARCHAR(1),
    codice INT NOT NULL,
    PRIMARY KEY(id_psicologo, id_istituto),
    CONSTRAINT FK_RPI_psico FOREIGN KEY (id_psicologo) REFERENCES psicologo(id),
    CONSTRAINT FK_RPI_istituto FOREIGN KEY (id_istituto) REFERENCES istituto(id)
);

CREATE TABLE scheda (
    numero TINYINT(2) NOT NULL,
    titolo VARCHAR(30) NOT NULL,
    obbiettivo VARCHAR(80) NOT NULL,
    immagini VARCHAR(10),
    data_ins TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_mod TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(numero)
);

CREATE TABLE prova_scheda (
    id TINYINT(2) NOT NULL,
    numero_scheda TINYINT(2) NOT NULL,
    tipo VARCHAR(10),
    testo VARCHAR(70) NOT NULL,
    anni TINYINT(2) NOT NULL,
    prova TINYINT(2),
    data_ins TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_mod TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    CONSTRAINT FK_PS_numScheda FOREIGN KEY (numero_scheda) REFERENCES scheda(numero)
);

CREATE TABLE rel_bambino_scheda (
    id_bambino INT NOT NULL,
    id_prova_scheda TINYINT(2) NOT NULL,
    data_ins TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_mod TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id_bambino, id_prova_scheda),
    CONSTRAINT FK_RBS_bambino FOREIGN KEY (id_bambino) REFERENCES bambino(id),
    CONSTRAINT FK_RBS_provaScheda FOREIGN KEY (id_prova_scheda) REFERENCES prova_scheda(id)
);

-- //@UNDO

DROP TABLE rel_psicologo_bambino;
DROP TABLE rel_bambino_scheda;
DROP TABLE prova_scheda;
DROP TABLE scheda;
DROP TABLE bambino;
DROP TABLE istituto;
DROP TABLE utente;
DROP TABLE psicologo;

