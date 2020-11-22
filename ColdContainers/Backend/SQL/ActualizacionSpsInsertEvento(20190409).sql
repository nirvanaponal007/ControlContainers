use griosb_desa_coldcontainers;

drop procedure if exists insertEventoContenedor; 

delimiter $
CREATE PROCEDURE insertEventoContenedor(
	in `serial_contenedor` varchar(100),
    in `latitud` DECIMAL(20,14),
    in `longitud` DECIMAL(20,14),
    in `datos1` varchar(1000),
    in `datos2` varchar(1000),
    in `delay_time` DECIMAL(30,15))
begin 
	declare id_contenedor int ;
    declare nombreCon varchar(20);
    set id_contenedor = (select distinct con_id from tbl_contenedor where con_serial_contenedor=serial_contenedor limit 0,1);
    IF not ISNULL(id_contenedor) 
    THEN
		insert into tbl_Evento_contenedor 
		set evnc_id_contenedor=id_contenedor, 
			evnc_latitud=latitud,
            evnc_longitud=longitud,
            evnc_datos1=datos1,
            evnc_datos2=datos2,
            envc_delay_time=delay_time;
		update tbl_contenedor set con_latitud=latitud,con_longitud=longitud where con_serial_contenedor=serial_contenedor;
	ELSE
		
		insert into tbl_contenedor set con_serial_contenedor=serial_contenedor, con_nombre='', con_url_foto='',con_latitud=latitud,con_longitud=longitud;
        set id_contenedor = (select distinct con_id from tbl_contenedor where con_serial_contenedor=serial_contenedor limit 0,1);
        set nombreCon = CONCAT('Contenedor ',id_contenedor);
        update tbl_contenedor set con_nombre=nombreCon where con_id=id_contenedor;
        insert into tbl_Evento_contenedor 
		set evnc_id_contenedor=id_contenedor, 
			evnc_latitud=latitud,
            evnc_longitud=longitud,
            evnc_datos1=datos1,
            evnc_datos2=datos2,
            envc_delay_time=delay_time;
	END IF;
    select par_valor from tbl_parametros where par_clave='TimeSend';
end $