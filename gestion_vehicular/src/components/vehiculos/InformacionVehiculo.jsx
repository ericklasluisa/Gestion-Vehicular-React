import React from 'react';
import '../../styles/vehiculos.css';


const InformacionVehiculo = (props) => {
    // Verificar si props.vehiculo tiene datos
    if (!props.vehiculo || props.vehiculo.length === 0) {
        return <div>No hay datos de vehículo</div>;
    }

    

    // Extraer el primer elemento del array de vehículos
    const vehiculo = props.vehiculo[0];
    console.log("epaaaa" + vehiculo);
    

    const codificarABase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        console.log("Contenido codificado en base64:", binary);
        if(binary.includes(';base64,')){
          return binary.split(";base64,")[1];
        }else{
          return binary;
        }
      };

    return (
        <section>
            <section className="seleccionado">
                <h2>Vehículo seleccionado: {vehiculo.placa}</h2>
            </section>
            <section className="grid">
                <section id="informacionVehi" className="informacionVehi">
                    <section className="contenedor-imagen">
                        {/* Asumiendo que foto es un objeto Buffer */}
                        {/* <img src={`data:image/jpeg;base64,${Buffer.from(vehiculo.foto.data).toString('base64')}`} className='fotoVehiculo' alt={vehiculo.placa}/> */}
                        
                        <img src={`data:image/jpeg;base64,${codificarABase64(vehiculo.foto.data)}`}  className='fotoVehiculo' alt={vehiculo.placa} />
                        <section id="contenedorChofer">
                            <button className="btnAsignarChofer">Asignar Chofer</button>
                        </section>
                    </section>
                    <article>
                        <h1>Información General</h1>
                        <p><strong>Placa: </strong>{vehiculo.placa}</p>
                        <p><strong>Modelo: </strong>{vehiculo.modelo}</p>
                        <p><strong>Año: </strong>{vehiculo.anio}</p>
                    </article>
                    <article>
                        <h1>Información Técnica</h1>
                        <p><strong>Combustible: </strong>{vehiculo.tipoCombustible}</p>
                        <p><strong>Kilometraje: </strong>{vehiculo.kilometraje}</p>
                        <p><strong>Peso: </strong>{vehiculo.peso}</p>
                    </article>
                    <article className='contenedorEstado'>
                        <h3>Estado - {vehiculo.estado}</h3>
                        <p className={`estadoVehiculo estadoVehiculo${vehiculo.estado}`}></p>
                    </article>
                </section>
            </section>
        </section>
    );
}

export default InformacionVehiculo;
