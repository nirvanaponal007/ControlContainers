use griosb_desa_coldcontainers;

ALTER TABLE tbl_usuario ADD COLUMN usu_estado INT;

ALTER TABLE `griosb_desa_coldcontainers`.`tbl_usuario_rol` DROP COLUMN `usr_estado`;
