-- // add field temporary_code to utente

ALTER TABLE utente ADD temporary_code NUMERIC(6);

-- //@UNDO

ALTER TABLE utente DROP COLUMN temporary_code;
