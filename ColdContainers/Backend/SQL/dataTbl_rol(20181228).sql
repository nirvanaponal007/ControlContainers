use griosb_desa_coldcontainers;
truncate table tbl_rol;
insert into tbl_rol(rol_descripcion,rol_estado) 
values 
('administrador',1),
('admin-cliente',1),
('user-cliente',1);
select * from tbl_rol;