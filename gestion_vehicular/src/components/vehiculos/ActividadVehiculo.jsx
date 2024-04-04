import React, { useEffect } from 'react';
import { useState } from 'react';
import '../../styles/vehiculos.css';
import { useParams } from 'react-router';
import '../../styles/form.css';
import axios from 'axios';

const ActividadVehiculo = (props) => {
    const { placa } = useParams();

    if (!props.vehiculo) {
        console.log("No hay datos de vehículo");
    } else {
        console.log("Placa del vehículo:", props.vehiculo.placa);
        //imprima por consola todo el props de vehiculo
        console.log("Datos del vehículo:", props.vehiculo);

    }

    const [activeTab, setActiveTab] = useState(0);
    const [showModal, setShowMantenimientoForm] = useState(false);

    const seleccionar = (index) => {
        setActiveTab(index);
    }



    const openModal = () => {
        setShowMantenimientoForm(true);
    }

    const closeModal = () => {
        setShowMantenimientoForm(false);
    }




    return (
        <div>
            <section id="actividadVehiculo" className="actividadVehiculo" style={{ backgroundColor: props.bgcolor }}>
                <h1>{props.tituloActividad}</h1>
                <section className="mant-container">
                    <section>
                        <ul className="options">
                            <li id="enProcesoViaje" className={activeTab == 0 ? "option option-active" : "option"} onClick={() => seleccionar(0)}>En Proceso</li>
                            <li id="historialViaje" className={activeTab == 1 ? "option option-active" : "option"} onClick={() => seleccionar(1)}>Historial</li>
                            <dialog id="popupFormMantenimiento" open={showModal}>
                                <MantenimientoForm closeModal={closeModal} todosMantenimientos={props.todosMantenimientos} vehiculoData={props.vehiculo} />
                            </dialog>
                            <nav>
                                <button id="abrirForm" onClick={openModal}>Poner en Mantenimiento</button>
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
                                                                <td>{actividad.nombreMantenimiento}</td>
                                                                <td>{actividad.tipoMantenimiento}</td>
                                                                <td>{new Date(actividad.fechaInicio).toLocaleDateString()}</td>
                                                                <td>{actividad.costo}</td>

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

        </div >
    );
};



function MantenimientoForm({ closeModal, todosMantenimientos, vehiculoData }) {
    console.log("ID de todos los mantenimientos:", todosMantenimientos);
    if (vehiculoData && vehiculoData.length > 0) {
        // Acceder a vehiculoData[0]
        console.log(vehiculoData[0].IDVehiculo);
    } else {
        console.log("vehiculoData no está definido o está vacío.");
    }
    const [nuevoMantenimientoChecked, setNuevoMantenimientoChecked] = useState(false);
    const [nombreNuevoMantenimiento, setNombreNuevoMantenimiento] = useState('');
    const [tipoNuevoMantenimiento, setTipoNuevoMantenimiento] = useState('');
    const [costoMantenimiento, setCostoMantenimiento] = useState('');
    const [fechaInicio, setFechaInicio] = useState(new Date().toISOString().split("T")[0]);
    const [nombreMantenimientoValido, setNombreMantenimientoValido] = useState(true);
    const [costoMantenimientoValido, setCostoMantenimientoValido] = useState(true);

    const handleCheckboxChange = () => {
        setNuevoMantenimientoChecked(!nuevoMantenimientoChecked);
        // Reiniciar la validación de los campos al cambiar el checkbox
        setNombreMantenimientoValido(true);
        setCostoMantenimientoValido(true);
    };

    const handleNombreNuevoMantenimientoChange = (event) => {
        const value = event.target.value;
        setNombreNuevoMantenimiento(value);
        setNombreMantenimientoValido(esNombreValido(value));
    };

    const handleCostoMantenimientoChange = (event) => {
        const value = event.target.value;
        setCostoMantenimiento(value);
        setCostoMantenimientoValido(esNumeroValido(value));
    };
    const [idMantenimientoSeleccionado, setIdMantenimientoSeleccionado] = useState(null);

    const handleNombreMantenimientoChange = (event) => {
        const selectedMantenimiento = JSON.parse(event.target.value);
        const idMantenimiento = selectedMantenimiento.IDMantenimiento;
        console.log("Mantenimiento seleccionado:", selectedMantenimiento);
        console.log("ID del mantenimiento seleccionado:", idMantenimiento);
        setIdMantenimientoSeleccionado(idMantenimiento);
        // Aquí puedes realizar otras acciones con el mantenimiento seleccionado si es necesario
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (nombreMantenimientoValido && costoMantenimientoValido) {
            try {

                let formData = {
                    idMantenimiento: idMantenimientoSeleccionado,
                    idvehiculo: vehiculoData[0].IDVehiculo,
                    costo: costoMantenimiento,
                    fechaInicio: fechaInicio
                };

                if (nuevoMantenimientoChecked) {
                    // Si se agrega un nuevo mantenimiento, crear un nuevo registro en la tabla 'mantenimiento'
                    formData.nombreMantenimiento = nombreNuevoMantenimiento;
                    formData.tipoMantenimiento = tipoNuevoMantenimiento;

                    // Envío de datos al backend para crear un nuevo mantenimiento
                    const response = await axios.post('http://localhost:8000/mantenimiento', formData);
                    console.log('Respuesta del servidor:', response.data);
                } else {


                    // Envío de datos al backend para asociar un mantenimiento existente al vehículo
                    const response = await axios.post('http://localhost:8000/mantenimiento', formData);
                    console.log('Respuesta del servidor:', response.data);
                    window.location.reload();
                }

                // Aquí puedes hacer algo después de que los datos se hayan guardado en la base de datos
            } catch (error) {
                console.error('Error al enviar los datos:', error);
            }
        } else {
            console.log("Hay errores en el formulario, por favor revisa los campos.");
        }
    };

    return (
        <>
            <section className="formHeader">
                <h2>Iniciar Nuevo Mantenimiento</h2>
                <button id="cerrarFormMantenimiento" className="cerrarForm" onClick={closeModal}>&times;</button>
            </section>
            <form id="formularioMantenimiento" onSubmit={handleSubmit}>
                <input type="hidden" name="IDVehiculo" id="IDVehiculoFormMantenimiento" value="{IDVehiculo} " />
                <section className="contenedorFormularioMantenimiento">
                    <section className="informacionMantenimiento">
                        <h2>MANTENIMIENTO</h2>

                        <section className="checkboxNuevoMantenimiento">
                            <label className="content-input">
                                <input type="checkbox" name="nuevoMantenimiento" id="nuevoMantenimiento"
                                    checked={nuevoMantenimientoChecked}
                                    onChange={handleCheckboxChange} />
                                Agregar Mantenimiento
                                <i></i>
                            </label>
                        </section>

                        <section id="contenedorTodosMantenimientos">
                            <section className="inputsFormMantenimiento" hidden={nuevoMantenimientoChecked}>
                                <label htmlFor="nombreMantenimiento" className="seleccionarMantenimiento" hidden={nuevoMantenimientoChecked}>Nombre del Mantenimiento:</label>
                                <select name="nombreMantenimiento" id="nombreMantenimiento" hidden={nuevoMantenimientoChecked} onChange={handleNombreMantenimientoChange} required={!nuevoMantenimientoChecked}>
                                    <option value="" selected disabled>Seleccione el nombre del mantenimiento</option>
                                    {todosMantenimientos.map((actividad, index) => (
                                        <option key={index} value={JSON.stringify(actividad)} data-tipo={actividad.tipoMantenimiento}>{actividad.nombreMantenimiento}</option>
                                    ))}
                                </select>
                                
                            </section>
                        </section>

                        <section className="nuevoMantenimiento" id="contenedorNuevoMantenimiento" hidden={!nuevoMantenimientoChecked}>
                            <section className="inputsFormMantenimiento">
                                <label htmlFor="nombreNuevoMantenimiento">Ingrese el nombre del nuevo mantenimiento</label>
                                <input type="text" id="nombreNuevoMantenimiento" name="nombreNuevoMantenimiento"
                                    value={nombreNuevoMantenimiento}
                                    onChange={handleNombreNuevoMantenimientoChange}
                                    required={nuevoMantenimientoChecked} />
                                <section>{!nombreMantenimientoValido && "El nombre del mantenimiento solo puede contener letras y espacios."}</section>
                            </section>

                            <section className="inputsFormMantenimiento">
                                <label htmlFor="tipoNuevoMantenimiento">Ingrese el tipo de mantenimiento</label>
                                <select id="tipoNuevoMantenimiento" name="tipoNuevoMantenimiento" required={nuevoMantenimientoChecked}>
                                    <option value="" selected disabled>Seleccione el tipo de mantenimiento</option>
                                    <option value="preventivo">Preventivo</option>
                                    <option value="correctivo">Correctivo</option>
                                </select>
                                
                            </section>
                        </section>

                    </section>
                    <section className="informacionMantenimiento">
                        <h2>DATOS DEL MANTENIMIENTO</h2>
                        <section className="inputsFormMantenimiento">
                            <label htmlFor="costoMantenimiento">Costo</label>
                            <input type="number" id="costoMantenimiento" name="costoMantenimiento"
                                value={costoMantenimiento}
                                onChange={handleCostoMantenimientoChange}
                                required />
                            <section>{!costoMantenimientoValido && "El costo debe ser un número válido."}</section>
                        </section>

                        <section className="inputsFormMantenimiento">
                            <label htmlFor="fechaInicioMantenimiento">Fecha de Inicio</label>
                            <input type="text" id="fechaInicioMantenimiento" name="fechaInicioMantenimiento"
                                value={fechaInicio}
                                onChange={(event) => setFechaInicio(event.target.value)}
                                readOnly />
                        </section>
                    </section>
                </section>
                <section className="formFooter">
                    <button id="enviarFormularioMantenimiento" type="submit" disabled={!nombreMantenimientoValido || !costoMantenimientoValido}>Enviar</button>
                </section>
            </form>
        </>
    );
}

function esNombreValido(nombre) {
    const validacion = /^[a-zA-ZÀ-ÿ\s]{1,70}$/;
    return validacion.test(nombre);
}

function esNumeroValido(numero) {
    return !isNaN(numero);
}


export default ActividadVehiculo;
