use griosb_desa_coldcontainers;

create table tbl_evento_usuario(
	evus_id int NOT NULL AUTO_INCREMENT,
    evus_usu_id int,
    evus_fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    evus_con_id varchar(200),
    evus_tipo_evento varchar(1000),
    evus_origen_evento varchar(100),
    evus_identidad_ip varchar(100),
    evus_recursos_afectados varchar(100),
    evus_resultado varchar(1000),
    evus_actividad_realizada varchar(1000),
    PRIMARY KEY (evus_id)
);


