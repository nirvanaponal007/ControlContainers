use griosb_desa_coldcontainers;


create table tbl_contenedor(
	con_id int NOT NULL AUTO_INCREMENT,
    con_serial_contenedor varchar(300) not null,
    con_nombre varchar(2000) not null,
    con_estado int DEFAULT 1,
    con_url_foto varchar(300),
    con_fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (con_id)
);

create table tbl_parametros(
	par_id int NOT NULL AUTO_INCREMENT,
    par_clave varchar(300) not null,
    par_valor varchar(2000) not null,
    PRIMARY KEY (par_id)
);

create table tbl_Evento_contenedor(
	evnc_id int NOT NULL AUTO_INCREMENT,
	evnc_id_contenedor varchar(100) NOT NULL,
    evnc_fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    evnc_latitud DECIMAL(20,14),
    evnc_longitud DECIMAL(20,14),
    evnc_datos1 varchar(1000) not null,
    evnc_datos2 varchar(1000) not null,
    envc_delay_time DECIMAL(30,15),
    PRIMARY KEY (evnc_id)
);

create table tbl_rol(
	rol_id int NOT NULL AUTO_INCREMENT,
    rol_descripcion varchar(100) not null,
    rol_estado int default 1,
    PRIMARY KEY (rol_id)
);

create table tbl_usuarios(
	usu_id int NOT NULL AUTO_INCREMENT,
    usu_nombre varchar(200),
    usu_apellido varchar(200),
    usu_username varchar(100) not null,
    usu_contrasena varchar(100) not null,
    usu_id_rol int not null,
    usu_estado int default 1,
    usu_email varchar(100),
    usu_celular varchar(100),
    usu_fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (usu_id)
);

-- guarda los tipos de alarma (critica, moderada,debil)
create table tbl_tipo_alarma(
	 tala_id int NOT NULL AUTO_INCREMENT,
	 tala_descripcion varchar(200),
	 tala_estado int default 1,
	 PRIMARY KEY (tala_id)
);

create table tbl_alarma(
	ala_id int NOT NULL AUTO_INCREMENT,
    ala_descripcion varchar(400),
    ala_estado int default 1,
    ala_fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    ala_id_tipo int not null,
    PRIMARY KEY (ala_id)
);

create table tbl_usuario_contenedor(
	uscon_id int NOT NULL AUTO_INCREMENT,
	uscon_usu_id int NOT NULL,
	uscon_con_id int NOT NULL,
    uscon_fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    uscon_estado int default 1,
    PRIMARY KEY (uscon_id)
);

create table tbl_logs(
	log_id int NOT NULL AUTO_INCREMENT,
    log_usu_id int,
    log_fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    log_mecanismo_auth varchar(200),
    log_tipo_evento varchar(1000),
    log_origen_evento varchar(100),
    log_identidad varchar(100),
    log_recursos_afectados varchar(100),
    log_resultado varchar(1000),
    log_actividad_realizada varchar(1000),
    PRIMARY KEY (log_id)
);