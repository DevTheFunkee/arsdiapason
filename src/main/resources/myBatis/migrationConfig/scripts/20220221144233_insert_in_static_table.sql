-- // insert in static table

INSERT INTO scheda (numero, titolo, obbiettivo, immagini) VALUES (1, 'Figura complessa di Rey B', 'Copiare la figura e riprodurla a memoria', 'A');
INSERT INTO scheda (numero, titolo, obbiettivo, immagini) VALUES (2, 'Quadrato e losanga', 'Copiare le figure', 'A');
INSERT INTO scheda (numero, titolo, obbiettivo, immagini) VALUES (3, 'Figure lacunari', 'Disegnare ciò che manca', 'A');
INSERT INTO scheda (numero, titolo, obbiettivo, immagini) VALUES (4, 'Somiglianze e differenze', 'Mettere una crocetta sulla figura diversa', 'A');
INSERT INTO scheda (numero, titolo, obbiettivo, immagini) VALUES (5, 'Disegni  da completare', 'Completare i disegni', 'A');
INSERT INTO scheda (numero, titolo, obbiettivo, immagini) VALUES (6, 'Cubi da completare', 'Completare le figure', 'A');
INSERT INTO scheda (numero, titolo, obbiettivo, immagini) VALUES (7, 'Assurdità', 'Mettere una crocetta su ciò che non centra con l\'insieme del disegno', 'A');
INSERT INTO scheda (numero, titolo, obbiettivo, immagini) VALUES (8, 'Facce', 'Disegnare parti mancanti', 'A');
INSERT INTO scheda (numero, titolo, obbiettivo, immagini) VALUES (9, 'Labirinti', 'Tirare una riga nel binario più corto dal bambino alla casetta', 'A;B;C');
INSERT INTO scheda (numero, titolo, obbiettivo, immagini) VALUES (10, 'Omino', 'Disegnare elementi mancanti', 'A');
INSERT INTO scheda (numero, titolo, obbiettivo, immagini) VALUES (11, 'Piegatura', 'Piegare un foglio in diagonale', NULL);

INSERT INTO prova_scheda (id, numero_scheda, tipo, testo, anni, prova) VALUES (1, 1, 'Copia', 'Copiata con 2 figure geometriche incastrate', 6, 1);
INSERT INTO prova_scheda (id, numero_scheda, tipo, testo, anni, prova) VALUES (3, 1, 'Copia', 'Copiata con 4 figure geometriche incastrate', 8, 5);
INSERT INTO prova_scheda (id, numero_scheda, tipo, testo, anni, prova) VALUES (4, 1, 'Memoria', 'Disegnata a memoria con 2 figure geometriche incastrate', 6, 6);
INSERT INTO prova_scheda (id, numero_scheda, tipo, testo, anni, prova) VALUES (5, 1, 'Memoria', 'Disegnata a memoria con 3 figure geometriche incastrate', 7, 6);
INSERT INTO prova_scheda (id, numero_scheda, tipo, testo, anni, prova) VALUES (6, 1, 'Memoria', 'Disegnata a memoria con 4 figure geometriche incastrate', 8, 6);
INSERT INTO prova_scheda (id, numero_scheda, tipo, testo, anni, prova) VALUES (7, 2, NULL, 'Riproduzione del quadrato', 5, 3);
INSERT INTO prova_scheda (id, numero_scheda, tipo, testo, anni, prova) VALUES (8, 2, NULL, 'Riproduzione del quadrato e della losanga', 6, 3);
INSERT INTO prova_scheda (id, numero_scheda, tipo, testo, anni, prova) VALUES (11, 3, NULL, 'Completate 4 figure', 7, 3);
INSERT INTO prova_scheda (id, numero_scheda, tipo, testo, anni, prova) VALUES (12, 3, NULL, 'Completate 5 figure', 8, 3);
INSERT INTO prova_scheda (id, numero_scheda, tipo, testo, anni, prova) VALUES (15, 4, NULL, 'Trovate 4 differenze', 7, 1);
INSERT INTO prova_scheda (id, numero_scheda, tipo, testo, anni, prova) VALUES (16, 4, NULL, 'Trovate 5 differenze', 8, 1);
INSERT INTO prova_scheda (id, numero_scheda, tipo, testo, anni, prova) VALUES (17, 5, NULL, 'Completate 3 greche', 5, 5);
INSERT INTO prova_scheda (id, numero_scheda, tipo, testo, anni, prova) VALUES (18, 5, NULL, 'Completate 5 greche', 6, 5);
INSERT INTO prova_scheda (id, numero_scheda, tipo, testo, anni, prova) VALUES (21, 6, NULL, 'Completato 1 cubo', 5, 2);
INSERT INTO prova_scheda (id, numero_scheda, tipo, testo, anni, prova) VALUES (22, 6, NULL, 'Completato 2 cubi', 7, 2);
INSERT INTO prova_scheda (id, numero_scheda, tipo, testo, anni, prova) VALUES (23, 6, NULL, 'Completato 2 cubi perfetti', 8, 2);
INSERT INTO prova_scheda (id, numero_scheda, tipo, testo, anni, prova) VALUES (24, 6, NULL, 'Completato 3 cubi', 8, 4);
INSERT INTO prova_scheda (id, numero_scheda, tipo, testo, anni, prova) VALUES (25, 7, NULL, 'Trovate 3 o più assurdità', 7, 5);
INSERT INTO prova_scheda (id, numero_scheda, tipo, testo, anni, prova) VALUES (26, 8, NULL, 'Completati 3 visi', 5, 4);
INSERT INTO prova_scheda (id, numero_scheda, tipo, testo, anni, prova) VALUES (27, 8, NULL, 'Completati 4 visi (non più di 4 elementi mancanti)', 6, 4);
INSERT INTO prova_scheda (id, numero_scheda, tipo, testo, anni, prova) VALUES (28, 8, NULL, 'Completati 4 visi perfetti', 7, 4);
INSERT INTO prova_scheda (id, numero_scheda, tipo, testo, anni, prova) VALUES (29, 9, NULL, 'Completati 3 labirinti', 6, 2);
INSERT INTO prova_scheda (id, numero_scheda, tipo, testo, anni, prova) VALUES (30, 10, NULL, 'Disegnati 2 elementi mancanti', 5, 1);
INSERT INTO prova_scheda (id, numero_scheda, tipo, testo, anni, prova) VALUES (31, 11, NULL, 'Piegatura in diagonale corretta', 5, 6);

-- //@UNDO

SET FOREIGN_KEY_CHECKS=0;
DELETE FROM prova_scheda;
DELETE FROM scheda;
SET FOREIGN_KEY_CHECKS=1;
