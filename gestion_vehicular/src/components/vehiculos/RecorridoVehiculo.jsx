import React from 'react';
import { useState } from 'react';
import '../../styles/vehiculos.css';
import { useParams } from 'react-router';

const RecorridoVehiculo = (props) => {
    const { placa } = useParams();

    if (!props.vehiculo) {
        console.log("No hay datos de vehículo");
    } else {
        console.log("Placa del vehículo:", props.vehiculo.placa);
    }

    const [activeTab, setActiveTab] = useState(0);

    const seleccionar = (index) => {
        setActiveTab(index);
    }

    return (
        <div>
            <section id="actividadVehiculo" className="actividadVehiculo" style={{ backgroundColor: props.bgcolor2 }}>
                <h1>{props.tituloActividad}</h1>
                <section className="mant-container">
                    <section>
                        <ul className="options">
                            <li id="enProcesoViaje" className={activeTab == 0 ? "option option-active" : "option"} onClick={() => seleccionar(0)}>En Proceso</li>
                            <li id="historialViaje" className={activeTab == 1 ? "option option-active" : "option"} onClick={() => seleccionar(1)}>Historial</li>
                            <nav>
                                <button id="abrirForm">Poner en Ruta</button>
                            </nav>
                        </ul>
                        <section className="contents">
                            {activeTab === 0 &&
                                <section id="enProceso-content" className="content">
                                    <h3>En Proceso</h3>
                                    <section className='table-container'>
                                        {Array.isArray(props.actividadesEnProceso) && props.actividadesEnProceso.length > 0 ? (
                                            <table>
                                                <thead>
                                                    <tr>
                                                        {props.thActividadesEnProceso.map((title, index) => (
                                                            <th key={index}>{title}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {props.actividadesEnProceso.map((actividad, index) => {
                                                        console.log("Datos de actividad:", actividad); // Aquí se imprime la actividad actual
                                                        return (
                                                            <tr key={index} className="filaTablaMantenimiento">
                                                                <td>{placa}</td>
                                                                <td></td>
                                                                <td>{new Date (actividad.fechaInicio).toLocaleDateString()} <br></br>{actividad.horaInicio}</td>
                                                                <td>{actividad.ubiInicio}</td>
                                                                <td>{actividad.ubiFin}</td>
                                        

                                                                <td>
                                                                    <button type="button" className="btnTerminarAccion" /*onClick={abrirPopupEliminarMantenimiento}*/></button>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        ) : (
                                            // Aquí puedes colocar un mensaje alternativo si no hay datos
                                            <p>No hay datos disponibles</p>
                                        )}
                                    </section>
                                </section>}
                            {activeTab === 1 &&
                                <section id="historial-content" className="content">
                                    <h3>Historial</h3>
                                    <section className='table-container'>
                                        <table>
                                            <thead>
                                                <tr>
                                                    {props.thActividadesHistorial.map((title, index) => (
                                                        <th key={index}>{title}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.isArray(props.actividadesHistorial) && props.actividadesHistorial.length > 0 ? (
                                                    props.actividadesHistorial.map((actividad, index) => {
                                                        if (typeof actividad === "object" && actividad !== null) {
                                                            console.log("Datos de actividad en el historial:", actividad);
                                                            return (
                                                                <tr key={index} className="filaTablaMantenimiento">
                                                                    <td>{placa}</td>
                                                                    <td>{actividad.nombreMantenimiento}</td>
                                                                    <td>{actividad.tipoMantenimiento}</td>
                                                                    <td>{new Date(actividad.fechaInicio).toLocaleDateString()}</td>     
                                                                    <td>{actividad.costo}</td>
                                                                    <td>{new Date(actividad.fechaFin).toLocaleDateString()}</td>
                                                                    {/* Agrega más celdas para otras propiedades si es necesario */}
                                                                </tr>
                                                            );
                                                        } else {
                                                            console.log("El elemento en el historial no es un objeto:", actividad);
                                                            return null; // Otra opción es renderizar un mensaje de error aquí
                                                        }
                                                    })
                                                ) : (
                                                    <tr>
                                                        <td colSpan={props.thActividadesHistorial.length}>
                                                            No hay actividades en el historial.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </section>
                                </section>}
                        </section>
                    </section>
                </section>
            </section>
        </div>
    );
};

export default RecorridoVehiculo;
