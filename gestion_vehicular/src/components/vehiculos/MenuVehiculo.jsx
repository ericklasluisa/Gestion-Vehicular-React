import React from 'react';
import fotoInfo from '../../img/BusMercedes.jpg';
import fotoMantenimiento from '../../img/mantenimiento.jpg';
import fotoRecorridos from '../../img/recorridos.jpg';
import fotoVehiculo from '../../img/lambo.png';
import '../../styles/vehiculos.css';



//Opciones del menu de vehiculos
const itemsMenu = [
    {
        direccion: '#informacion',
        titulo: 'INFORMACION',
        foto: fotoInfo
    },
    {
        direccion: '#mantenimiento',
        titulo: 'MANTENIMIENTOS',
        foto: fotoMantenimiento
    },
    {
        direccion: '#viajes',
        titulo: 'VIAJES',
        foto: fotoRecorridos
    }
];



//variables titulos tablas, contenido en proceso y cotenido historial
const mantenimientosEnProcesoData = [
    { placa: 'ABC123', fechaInicio: '12/02/2024', nombreMantenimiento: 'Cambio de aceite'},
    // Otros mantenimientos en proceso...
];

const mantenimientosTerminadosData = [
    { placa: 'DEF-4562', fechaInicio: '15/08/2023', fechaFin: '25/08/2023', nombreMantenimiento: 'Reparación de frenos', costo: '$500', observaciones: 'Se cambio el sistema de frenos'},
    { placa: 'TBH-7756', fechaInicio: '18/08/2023', fechaFin: '30/08/2023', nombreMantenimiento: 'Alineacion', costo: '$100', observaciones: 'Se cambio la alineacion'},
    { placa: 'PMD-1234', fechaInicio: '21/09/2023', fechaFin: '21/09/2023', nombreMantenimiento: 'ABS', costo: '$50', observaciones: 'Se cambio el sensor de ABS'},
    // Otros mantenimientos terminados...
];

const columnasEnProceso = ['Vehículo', 'Fecha Inicio', 'Descripción'];

const columnasHistorial = ['Vehículo', 'Fecha Inicio', 'Fecha Finalizacion', 'Descripción', 'Costo', 'Observaciones'];






//Menu de vehiculos
function MenuVehiculo() {
    return (
        <section className="menu">
            {itemsMenu.map((item, index) => (
                <MenuItem key={index} direccion={item.direccion} titulo={item.titulo} foto={item.foto} />
            ))}
        </section>
    );
}

//Item del menu de vehiculos
const MenuItem = ({ direccion, titulo, foto }) => {
    return (
        <a href={`#${direccion}`}>
            <img src={foto} alt={titulo} />
            <p>{titulo}</p>
        </a>
    );
}




//Componentes tablas informacion mantenimiento y viajes
//Contenedor de actividades
const ContenedorActividad = ({ idActividad, tituloActividad, columnTitles, actividadEnProceso, actividadTerminada }) => {
    return (
        <section id="{idActividad}" className="mantenimiento">
            {/* <h1>{actividad}</h1> */}
            <div className="mant-container">
                <Options />
                <Contents
                    columnTitles={columnTitles}
                    actividadEnProceso={actividadEnProceso}
                    actividadTerminada={actividadTerminada}
                />
            </div>
        </section>
    );
}

//Opciones de mantenimiento
const Options = () => {
    return (
        <ul className="options">
            <li id="enProceso" className="option option-active">En Proceso</li>
            <li id="historial" className="option">Historial</li>
            <nav>
                <button id="abrirFromM">Poner en Mantenimiento</button>
            </nav>
        </ul>
    );
}

//Contenido de actividades
const Contents = ({ columnTitles, actividadEnProceso, actividadTerminada }) => {
    return (
        <section className="contents">
            <EnProcesoContent columnTitles={columnTitles} actividadEnProceso={actividadEnProceso} />
            <HistorialContent columnTitles={columnTitles} actividadTerminada={actividadTerminada} />
        </section>
    );
}

//Contenido de actividad en proceso
const EnProcesoContent = ({ columnTitles, actividadEnProceso }) => {
    return (
        <section id="enProceso-content" className="content content-active">
            <h3>En Proceso</h3>
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            {columnTitles.map(title => (
                                <th key={title}>{title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {actividadEnProceso.map(actividad => (
                            <TableRow key={actividad.id} rowData={actividad} />
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

//Contenido de historial de actividad
const HistorialContent = ({ columnTitles, actividadTerminada }) => {
    return (
        <section id="historial-content" className="content">
            <h3>Historial</h3>
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            {columnTitles.map(title => (
                                <th key={title}>{title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {actividadTerminada.map(actividad => (
                            <TableRow key={actividad.id} rowData={actividad} />
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

const TableRow = ({ rowData }) => {
    return (
        <tr>
            {rowData.map((data, index) => (
                <td key={index}>{data}</td>
            ))}
        </tr>
    );
}






export default MenuVehiculo;