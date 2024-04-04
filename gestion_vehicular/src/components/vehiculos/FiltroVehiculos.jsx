import React, { useState, useEffect } from 'react';
import '../../styles/filtroVehiculos.css';
import '../../styles/form.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const URI = 'http://localhost:8000/vehiculos/'

export const FiltroVehiculos = () => {

  //useState para guardar el arreglo de vehiculos==========================
  const [vehiculos, setVehiculos] = useState([])
  useEffect(() => {
    getVehiculos()
  }, [])
  //Funcion para obtener los vehiculos
  const getVehiculos = async () => {
    try {
      const res = await axios.get(URI);
      const vehiculosConFotoBase64 = res.data.map((vehiculo) => ({
        ...vehiculo,
        foto: `data:image/jpeg;base64,${codificarABase64(vehiculo.foto.data)}`
      }));
      setVehiculos(vehiculosConFotoBase64);
    } catch (error) {
      console.error('Error al obtener vehículos:', error);
    }
  };

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

  //useSate para mostrar el dialogo=======================================
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  //useState para guardar el filtro=======================================
  const [filtro, setFiltro] = useState("*");

  const buscarFiltro = (filtro) => {
    setFiltro(filtro);
  }

  const [placa, setPlaca] = useState("");

  const buscarPlaca = (placa) => {
    setPlaca(placa);
  }

  return (
    <section>
      {/*Formulario para ingresar un nuevo vehiculo*/}
      <dialog className="form-container" open={showModal}>
        <FormIngresarVehiculo getVehiculos={getVehiculos} closeModal={closeModal} />
      </dialog>
      {/*Seccion de busqueda*/}
      <section className="busquedaVehi">
        <input type="text"
          placeholder="Buscar por placa"
          onChange={e => buscarPlaca(e.target.value)}
        />
        <select
          name="filtro"
          onChange={e => buscarFiltro(e.target.value)}
        >
          <option value="*">Todos</option>
          <option value="Activo">Activo</option>
          <option value="Mantenimiento">En Mantenimiento</option>
          <option value="Ruta">En Ruta</option>
          <option value="Baja">Dado de Baja</option>
        </select>
        <button id="abrirForm" onClick={openModal}>Ingresar Vehiculo</button>
      </section>
      <Vehiculos vehiculos={vehiculos} placa={placa.toUpperCase()} filtro={filtro} />
    </section>
  )
}

//El dialogo recibe como parametro la funcion closeModal
const FormIngresarVehiculo = ({ closeModal, getVehiculos }) => {
  const insertarVehiculo = async (vehiculo) => {
    await axios.post(URI, vehiculo)
    getVehiculos()
  }

  const [foto, setFoto] = useState(null);

  const handleFotoChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64Data = reader.result;
      console.log("Contenido codificado en base64:", base64Data);
      setFoto(base64Data);
    };

    reader.readAsDataURL(file);
  };

  const mostrarAdvertenciaVehiculo = () => {
    const placaInput = document.getElementById('placa');
    const modeloInput = document.getElementById('modelo');
    const anioInput = document.getElementById('anio');
    const fotoInput = document.getElementById('fotoVehiculo');
    const kilometrajeInput = document.getElementById('kilometraje');
    const tipoCombustibleInput = document.getElementById('tipo_combustible');
    const pesoInput = document.getElementById('peso');
    const vehiculo = {
      placa: placaInput.value,
      modelo: modeloInput.value,
      anio: anioInput.value,
      estado: "Activo",
      tipoCombustible: tipoCombustibleInput.value,
      foto: foto,
      peso: pesoInput.value,
      kilometraje: kilometrajeInput.value,
      observacionEstado: "",
      fechaBaja: ""
    }

    //Verificar que todos los campos obligatorios estén llenos y válidos
    if (placaInput.validity.valid &&
      modeloInput.validity.valid &&
      anioInput.validity.valid &&
      fotoInput.validity.valid &&
      kilometrajeInput.validity.valid &&
      tipoCombustibleInput.value !== '' &&
      pesoInput.validity.valid) {
      // Mostrar alerta si todos los campos están válidos y llenos
      MySwal.fire({
        title: "Vehiculo Agregado Exitosamente",
        text: "El vehiculo ha sido agregado exitosamente al sistema",
        icon: "success"
      });
      // Insertar el vehículo en la base de datos
      insertarVehiculo(vehiculo);
      // Cerrar el formulario
      closeModal();
    } else {
      // Mostrar alerta de error si algún campo no es válido o está vacío
      MySwal.fire({
        title: "Error al Ingresar Vehiculo",
        text: "Por favor, ingrese todos los campos requeridos y válidos",
        icon: "error"
      });
    }
  }

  return (
    <>

      <section class="formHeader">
        <h2>Ingreso Nuevo Vehiculo</h2>
        <button class="cerrarForm" onClick={closeModal}>&times;</button>
      </section >

      <section>

        <section class="form-body">

          <section class="info-container">
            <h2>Información del Vehículo</h2>
            <section class="grupo">
              <input type="text" id="placa" name="placa"
                pattern="[A-Z]{3}-\d{3,4}"
                //onChange={e => setPlaca(e.target.value.toUpperCase())}
                title="" required /><br />
              <label for="placa">Placa</label>
            </section>
            <br />
            <section class="grupo">
              <input type="text" id="modelo" name="modelo"
                pattern="[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s]+"
                //onChange={e => setModelo(e.target.value)}
                title="" required /><br />
              <label for="marca">Marca/Modelo</label>
            </section>
            <br />
            <section class="grupo">
              <input type="number" id="anio" name="anio"
                min="1900" max="2023"
                pattern="\d+"
                //onChange={e => setAnio(e.target.value)}
                title="" required /><br />
              <label for="anio">Año</label>
            </section>
            <br />
            <section class="labelFoto">
              <input type="file" id="fotoVehiculo" name="fotoVehiculo"
                onChange={(e) => handleFotoChange(e)}
                accept="image/*" required />
            </section>
            <br />
            <br />
          </section>

          <section class="info-container">
            <h2>Datos Técnicos</h2>
            <section class="grupo">
              <input type="number" id="kilometraje" name="kilometraje"
                min="0"
                //onChange={e => setKilometraje(e.target.value)}
                required /><br />
              <label for="kilometraje">Kilometraje</label>
            </section>
            <br />
            <section class="grupo">
              <label for="tipo_combustible" class="tipoCombustible">Tipo de Combustible:</label>
              <br /><br />
              <select name="tipo_combustible" id="tipo_combustible"
                //onChange={e => setTipoCombustible(e.target.value)}
                required>
                <option value=""></option>
                <option>Super</option>
                <option>Extra</option>
                <option>Diesel</option>
                <option>Electrico</option>
              </select><br /><br />
            </section>
            <br />
            <section class="grupo">
              <input type="number" id="peso" name="peso"
                min="0"
                //onChange={e => setPeso(e.target.value)}
                required /><br />
              <label for="peso">Peso</label>
            </section>
            <br />
          </section>

        </section>

        <section class="formFooter">
          <button className='botonEnviar' onClick={e => mostrarAdvertenciaVehiculo()}>Enviar</button>
        </section>

      </section>
    </>
  )
}

const Vehiculos = ({ vehiculos, placa, filtro }) => {

  /*const deleteVehiculo = async (placa) => {
    await axios.delete('${URI}${placa}')
    getVehiculos()
  }*/

  return (
    <section className="contenedorVehiculos">
      {
        //Recorremos el arreglo de vehiculos y por cada uno creamos un componente Vehiculo
        vehiculos.map((vehiculo) => {
          var filtroBool = filtro === "*" || filtro === vehiculo.estado
          var busquedaBool = vehiculo.placa.includes(placa) || placa === ""
          if (filtroBool && busquedaBool) {
            return <Vehiculo key={vehiculo.idVehiculo} placa={vehiculo.placa} estado={vehiculo.estado} imagen={vehiculo.foto} />;
          }
        })
      }
    </section>
  )
};

const Vehiculo = ({ placa, estado, imagen }) => {
  return (
    //Creamos un link para redirigir a la pagina de vehiculo
    <Link to={`/vehiculo/${placa}`} className="vehiculo">
      <section className="contenedorInfo">
        <h1>{placa}</h1>
        <p className={`estado estado${estado}`}></p>
      </section>
      <img src={imagen} alt={placa} />
    </Link>
  )
};

export default FiltroVehiculos