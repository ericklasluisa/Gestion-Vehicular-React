import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InformacionVehiculo from './InformacionVehiculo';
import MenuVehiculo from './MenuVehiculo';
import ActividadVehiculo from './ActividadVehiculo';
import RecorridoVehiculo from './RecorridoVehiculo';
import { useParams } from 'react-router-dom';



const bgcolor = 'rgb(218, 217, 217)';
const bgcolor2 = '#FFFFFF';
const thMantenimientosEnProceso = ['Vehículo', 'Nombre', 'Tipo', 'Fecha Inicio', 'Costo', 'Terminar'];
const thMantenimientosHistorial = ['Vehículo', 'Nombre', 'Tipo', 'Fecha Inicio', 'Costo', 'Fecha Fin'];
const thRecorridosEnProceso = ['Vehiculo', 'Chofer', 'Fecha y Hora de Salida', 'Ubicacion de Salida', 'Ubicacion de Llegada', 'Terminar'];
const thRecorridosHistorial = ['Ubicacion de Salida', 'Ubicacion de Llegada', 'Fecha y Hora de Salida', 'Fecha y Hora de Llegada', 'Kilometros Recorridos'];

const URI = 'http://localhost:8000/vehiculos/';

const CompGeneralVehiculo = () => {
    // Estado para almacenar los datos del vehículo
    const [vehiculoData, setVehiculoData] = useState();
    const { placa } = useParams();


    useEffect(() => {
        // Función asincrónica para obtener los datos del vehículo
        const getVehiculo = async () => {
            try {
                const res = await axios.get(URI + placa);
                const data = res.data;
                // Actualizar el estado con los datos del vehículo
                setVehiculoData(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };

        // Llamar a la función para obtener los datos del vehículo al montar el componente
        getVehiculo();
    }, []); // Se pasa un arreglo vacío para que useEffect se ejecute solo una vez al montar el componente


    //ESTADO PARA ALMACENAR MANTENIMIENTOS PROCESO
    const [mantenimientosProceso, setMantenimientosProceso] = useState([]);
    useEffect(() => {
        const getMantenimientosProceso = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/mantenimientosProceso/${placa}`);
                const data = res.data || [];
                setMantenimientosProceso(data);
            } catch (error) {
                console.log(error);
            }
        }
        getMantenimientosProceso();
    }, []);
    console.log(mantenimientosProceso);

    //ESTADO PARA ALMACENAR MANTENIMIENTOS HISTORIAL
    const [mantenimientosHistorial, setMantenimientosHistorial] = useState([]);
    useEffect(() => {
        const getMantenimientosHistorial = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/mantenimientosHistorial/${placa}`);
                const data = res.data || [];
                setMantenimientosHistorial(data);
            } catch (error) {
                console.log(error);
            }
        }
        getMantenimientosHistorial();
    }, []);
    console.log(mantenimientosHistorial);


    //ESTADO ALMACENAR RECORRIDOS PROCESO
    const [recorridosProceso, setRecorridosProceso] = useState([]);
    useEffect(() => {
        const getRecorridosProceso = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/recorridosProceso/${placa}`);
                const data = res.data || [];
                setRecorridosProceso(data);
            } catch (error) {
                console.log(error);
            }
        }
        getRecorridosProceso();
    }, []);
    console.log(recorridosProceso);


    //ESTADO ALMACENAR RECORRIDOS HISTORIAL
    const [recorridosHistorial, setRecorridosHistorial] = useState([]);
    useEffect(() => {
        const getRecorridosHistorial = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/recorridosHistorial/${placa}`);
                const data = res.data || [];
                setRecorridosHistorial(data);
            } catch (error) {
                console.log(error);
            }
        }
        getRecorridosHistorial();
    }, []);
    console.log(recorridosHistorial);

    //TODOS LOS MANTENIMIENTOS
    const [todosMantenimientos, setTodosMantenimientos] = useState([]);
    useEffect(() => {
        const getTodosMantenimientos = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/mantenimiento`);
                const data = res.data;
                setTodosMantenimientos(data);
            } catch (error) {
                console.log(error);
            }
        }
        getTodosMantenimientos();
    }, []);
    console.log(todosMantenimientos);
    return (
        <div>
            <MenuVehiculo />
            {/* Verificar si vehiculoData está disponible antes de renderizar el componente InformacionVehiculo */}
            <InformacionVehiculo vehiculo={vehiculoData} />
            <ActividadVehiculo
                vehiculo={vehiculoData}
                tituloActividad={"Mantenimientos"}
                bgcolor={bgcolor}
                thActividadesEnProceso={thMantenimientosEnProceso}
                thActividadesHistorial={thMantenimientosHistorial}
                actividadesEnProceso={mantenimientosProceso}
                actividadesHistorial={mantenimientosHistorial}
                todosMantenimientos={todosMantenimientos}
            />

            <RecorridoVehiculo
                vehiculo={vehiculoData}
                tituloActividad={"Recorridos"}
                bgcolor={bgcolor}
                thActividadesEnProceso={thRecorridosEnProceso}
                thActividadesHistorial={thRecorridosHistorial}
                actividadesEnProceso={recorridosProceso}
                actividadesHistorial={recorridosHistorial}
            />
        </div>
    );
};

export default CompGeneralVehiculo;
