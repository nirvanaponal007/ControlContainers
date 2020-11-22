use griosb_desa_coldcontainers;

create table tbl_cliente(
	cli_id int NOT NULL AUTO_INCREMENT,
    cli_nit_empresa varchar(100),
    cli_razon_social varchar(200),
    cli_estado int,
    cli_email varchar(100),
    cli_direccion varchar(100),
    cli_telefono varchar(50),
    cli_pagina_web varchar(100),
    cli_n_empleados int,
    cli_celular varchar(50),
    cli_imagen varchar(200),
    cli_fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (cli_id)
);

create table tbl_usuario(
	usu_id int NOT NULL AUTO_INCREMENT,
    usu_nombre varchar(200),
    usu_apellido varchar(200),
    usu_username varchar(100) not null,
    usu_contrasena varchar(100) not null,
    usu_email varchar(100),
    usu_celular varchar(100),
    usu_fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    usu_id_cliente int,
    PRIMARY KEY (usu_id)
);

create table tbl_usuario_rol(
	usr_id int NOT NULL AUTO_INCREMENT,
    usr_token_activacion varchar(300),
    usr_fecha_activacion DATETIME,
    usr_token_recuperacion varchar(300),
    usr_fecha_recuperacion DATETIME,
    usr_id_rol int,
    usr_id_usuario int,
    PRIMARY KEY (usr_id)
);

create table tbl_cliente_contenedor(
	uscon_id int NOT NULL AUTO_INCREMENT,
	uscon_cli_id int NOT NULL,
	uscon_con_id int NOT NULL,
    uscon_fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    uscon_estado int default 1,
    PRIMARY KEY (uscon_id)
);

