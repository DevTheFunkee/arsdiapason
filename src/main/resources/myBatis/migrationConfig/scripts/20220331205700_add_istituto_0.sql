-- // add field temporary_code to utente

SET FOREIGN_KEY_CHECKS=0;

INSERT INTO istituto (id, id_psicologo, nome, regione, provincia, comune, indirizzo, data_ins, data_mod)
VALUES(1, 0, 'Nessuno', 'Nessuna', 'Nessuna', 'Nessuno', 'Nessuno', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

SET FOREIGN_KEY_CHECKS=1;

-- //@UNDO

DELETE FROM istituto WHERE id = 1;
