use griosb_desa_coldcontainers;

create table tbl_parametros(
	par_id int NOT NULL AUTO_INCREMENT,
    par_clave varchar(300) not null,
    par_valor varchar(2000) not null,
    PRIMARY KEY (par_id)
);

create table tbl_contenedor(
	con_id int NOT NULL AUTO_INCREMENT,
    con_id_contenedor varchar(300) not null,
    con_nombre varchar(2000) not null,
    con_fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (con_id)
);


