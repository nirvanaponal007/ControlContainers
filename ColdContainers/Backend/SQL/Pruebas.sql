use griosb_desa_coldcontainers;

select * from tbl_Evento_contenedor;

insert into tbl_Evento_contenedor(evnc_id_contenedor,evnc_latitud,evnc_longitud,envc_temp_reto,envc_temp_sumi,envc_reintentos)
values('AXJRN$JANSJVKA',45.5,32.6,16.10,19.3,0);

truncate table tbl_Evento_contenedor;