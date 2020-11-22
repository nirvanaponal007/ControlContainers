use griosb_desa_coldcontainers;

ALTER TABLE tbl_contenedor ADD COLUMN con_latitud decimal(20,14) default 0.0;
ALTER TABLE tbl_contenedor ADD COLUMN con_longitud decimal(20,14) default 0.0;

