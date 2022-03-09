-- // add field test_finito to bambino

ALTER TABLE bambino ADD test_finito TINYINT(1) NOT NULL DEFAULT 0;

-- //@UNDO

ALTER TABLE bambino DROP COLUMN test_finito;
