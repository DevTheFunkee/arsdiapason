-- // add field test_finito to bambino

ALTER TABLE bambino ADD test_finito TINYINT(1) NOT NULL DEFAULT 0;
ALTER TABLE bambino ADD data_test DATE;

-- //@UNDO

ALTER TABLE bambino DROP COLUMN test_finito;
ALTER TABLE bambino DROP COLUMN data_test;
