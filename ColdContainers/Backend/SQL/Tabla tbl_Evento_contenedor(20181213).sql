use griosb_desa_coldcontainers;

create table tbl_Evento_contenedor(
	evnc_id int NOT NULL AUTO_INCREMENT,
	evnc_id_contenedor varchar(100) NOT NULL,
    evnc_fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    evnc_latitud DECIMAL(20,14),
    evnc_longitud DECIMAL(20,14),
    envc_temp_reto DECIMAL(8,4),
    envc_temp_sumi DECIMAL(8,4),
    envc_reintentos int,
    PRIMARY KEY (evnc_id)
);

