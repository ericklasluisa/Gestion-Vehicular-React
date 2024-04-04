import React, { useState, useEffect } from "react";
import "../../styles/chofer.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TarjetaChofer from "./TarjetaChofer";
import EditarChofer from "./EditarChofer";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Chofer = (props) => {
  const [showModal, setShowMantenimientoForm] = useState(false);
  const [choferes, setChoferes] = useState([]);
  const [choferData, setChoferData] = useState(null);
  const [alerta, setAlerta] = useState("");
  const [parametroBusqueda, setParametroBusqueda] = useState("todos");
  const [filtroNombres, setFiltroNombres] = useState([]);

  useEffect(() => {
    const getChoferes = async (url) => {
      let res = await fetch(url);
      let json = await res.json();

      const nuevosChoferes = json.choferes.map((el) => ({
        IDChofer: el.IDChofer,
        nombreChofer: el.nombreChofer,
        apellidoChofer: el.apellidoChofer,
        edad: el.edad,
        numTelefono: el.numTelefono,
        CI: el.CI,
        sexo: el.sexo,
        tipoSangre: el.tipoSangre,
        licencia: el.licencia,
        correo: el.correo,
        foto: el.foto,
      }));

      setChoferes(nuevosChoferes);
    };

    getChoferes("http://localhost:8000/choferes");
  }, []);

  const handleChoferData = (data) => {
    setChoferData(data);
  };

  const handleFiltroNombres = (data) => {
    setFiltroNombres(data);
  };

  const handleAlerta = () => {
    setAlerta("No se encontraron resultados para la cédula ingresada");
  };

  const openModal = () => {
    setShowMantenimientoForm(true);
  };

  const closeModal = () => {
    setShowMantenimientoForm(false);
  };

  const handleChangeParametro = (e) => {
    setParametroBusqueda(e.target.value);
    setChoferData(null);
  };

  const mostrarDatos = () => {
    if (choferData) {
      return <DatosChofer choferData={choferData} />;
    } else if (parametroBusqueda == "todos") {
      return (
        <section className="contenedorTodosChoferes">
          {choferes.map((chofer) => (
            <TarjetaChofer
              key={chofer.IDChofer}
              nombreChofer={chofer.nombreChofer}
              apellidoChofer={chofer.apellidoChofer}
              CI={chofer.CI}
              foto={chofer.foto}
              data={chofer}
              handleChoferData={handleChoferData}
            />
          ))}
        </section>
      );
    } else if (parametroBusqueda == "cedula") {
      return <p className="datosIngresar">Ingrese la cedula</p>;
    } else if (parametroBusqueda == "nombre") {
      return (
        <FiltroNombres
          filtroNombres={filtroNombres}
          handleChoferData={handleChoferData}
        />
      );
    } else {
      return "";
    }
  };

  return (
    <section className="barra-busqueda">
      <table className="barra-busquedas">
        <tr>
          <td>
            <section className="barra-navegacion">
              <section className="criterioBusqueda">
                <select
                  name="criterioBusqueda"
                  id="criterioBusqueda"
                  onChange={handleChangeParametro}
                >
                  <option value="todos">Todos</option>
                  <option value="cedula">Cedula</option>
                  <option value="nombre">Nombre</option>
                </select>
                {parametroBusqueda == "cedula" ? (
                  <BuscarChofer
                    handleChoferData={handleChoferData}
                    handleAlerta={handleAlerta}
                  />
                ) : parametroBusqueda == "nombre" ? (
                  <BuscarChoferNombre
                    handleFiltroNombres={handleFiltroNombres}
                    choferes={choferes}
                    setChoferData={setChoferData}
                  />
                ) : (
                  ""
                )}
              </section>

              <section className="buton">
                <button id="openDialog" onClick={openModal} type="button">
                  Agregar Chofer
                </button>
              </section>
            </section>
            <dialog className="modalChof" open={showModal}>
              <FormularioChofer closeModal={closeModal} />
            </dialog>
            {mostrarDatos()}
          </td>
        </tr>
      </table>
    </section>
  );
};

function BuscarChofer({ handleChoferData, handleAlerta }) {
  const [cedula, setCedula] = useState("");
  const navigate = useNavigate();

  const buscarChofer = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:8000/choferes/" + cedula)
      .then((response) => {
        handleChoferData(response.data[0]);
      })
      .catch((error) => {
        alert("DIGITE UNA CEDULA VALIDA");
        handleAlerta();
      });
  };

  return (
    <>
      <form onSubmit={buscarChofer}>
        <label htmlFor="busqueda">Buscar: </label>
        <input
          type="number"
          id="busqueda"
          placeholder="Ingresa Cedula"
          onChange={(e) => setCedula(e.target.value)}
          name="busqueda"
        />
        <button type="submit" value="Buscar">
          Buscar
        </button>
      </form>
    </>
  );
}

function DatosChofer({ choferData }) {
  const [modalEditar, setModalEditar] = useState(false);

  const handleEliminar = async () => {
    MySwal.fire({
      title: "¿Estas seguro de eliminar el chofer?",
      text: "Esta acción no se podrá revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminar();
      }
    });
  };

  const eliminar = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:8000/choferes/" + choferData.IDChofer
      );
      MySwal.fire({
        title: "EL CHOFER HA SIDO ELIMINADO CORRECTAMENTE!",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          MySwal.fire({
            didOpen: () => {
              MySwal.showLoading();
            },
          });
        }
        window.location.reload();
      });
    } catch (error) {
      MySwal.fire({
        title: "No se pudo eliminar el chofer!",
        text: error,
        icon: "error",
      });
    }
  };

  const handleEditar = () => {
    // setModalEditar(true);
    MySwal.fire({
      title: "Editar Chofer",
      html: <EditarChofer chofer={choferData} />,
      showCloseButton: true,
      showConfirmButton: false,
      width: "80%",
    });
  };

  // Verificar si choferData está definido antes de intentar acceder a su longitud
  if (!choferData || choferData.length === 0 || !choferData.foto) {
    return (
      <p className="datosNoDisponibles">
        No hay datos de chofer disponibles con esa cédula
      </p>
    );
  }

  const chofer = choferData;

  const codificarABase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    if (binary.includes(";base64,")) {
      return binary.split(";base64,")[1];
    } else {
      return btoa(binary);
    }
  };

  const base64Content = codificarABase64(choferData.foto.data);

  return (
    <section className="contenedor-informacion">
      <section className="grid-container">
        <article className="grid-item">
          <h1 className="tituloSeccionInfo">Información del Chofer</h1>
          {chofer && (
            <>
              <p>
                <strong className="titulo">Nombre: </strong>
                {chofer.nombreChofer}
              </p>
              <p>
                <strong className="titulo">Apellido: </strong>
                {chofer.apellidoChofer}
              </p>
              <p>
                <strong className="titulo">Edad: </strong>
                {chofer.edad}
              </p>
              <p>
                <strong className="titulo">Número de cédula: </strong>
                {chofer.CI}
              </p>
              <p>
                <strong className="titulo">Sexo: </strong>
                {chofer.sexo}
              </p>
              <section className="acciones">
                <button
                  id="editar"
                  value="editar"
                  className="editar"
                  onClick={handleEditar}
                >
                  Editar
                </button>
                <button
                  id="eliminar"
                  value="eliminar"
                  className="eliminar"
                  onClick={handleEliminar}
                >
                  Eliminar
                </button>
              </section>
            </>
          )}
        </article>
        <article className="grid-item">
          <h1 className="tituloSeccionInfo">Información Técnica</h1>
          {chofer && (
            <>
              <p>
                <strong className="titulo">Tipo de licencia: </strong>
                {chofer.licencia}
              </p>
              <p>
                <strong className="titulo">Tipo de sangre: </strong>
                {chofer.tipoSangre}
              </p>
              <p>
                <strong className="titulo">Número celular: </strong>
                {chofer.numTelefono}
              </p>
              <p>
                <strong className="titulo">Correo: </strong>
                {chofer.correo}
              </p>
            </>
          )}
        </article>
        <article className="grid-item" style={{ textAlign: "center" }}>
          <h1 className="tituloSeccionInfo">Foto del Chofer</h1>
          {chofer && (
            <img
              src={`data:image/*;base64,${base64Content}`}
              width="50%"
              alt="Foto del Chofer"
            />
          )}
        </article>
      </section>
    </section>
  );
}

function FormularioChofer({ closeModal }) {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    validarCampo(name, value);
  };

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [edad, setEdad] = useState("");
  const [sexo, setSexo] = useState("");
  const [licencia, setLicencia] = useState("");
  const [sangre, setSangre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [foto, setFoto] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64Data = reader.result;
      setFoto(base64Data);
    };

    reader.readAsDataURL(file);
  };

  const store = async (e) => {
    e.preventDefault();

    // Crear un objeto FormData para enviar los datos del formulario
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("apellido", apellido);
    formData.append("cedula", cedula);
    formData.append("edad", edad);
    formData.append("sexo", sexo);
    formData.append("licencia", licencia);
    formData.append("sangre", sangre);
    formData.append("correo", correo);
    formData.append("telefono", telefono);
    formData.append("foto", foto); // Agregar la foto al FormData

    try {
      const response = await axios.post(
        "http://localhost:8000/chofer",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Indicar que el contenido es de tipo form-data
          },
        }
      );
      MySwal.fire({
        title: "EL CHOFER HA SIDO INGRESADO CORRECTAMENTE!",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          MySwal.fire({
            didOpen: () => {
              MySwal.showLoading();
            },
          });
        }
        window.location.reload();
      });
    } catch (error) {
      MySwal.fire({
        title: "No se pudo ingresar el chofer!",
        text: error,
        icon: "error",
      });
    }
  };
  return (
    <>
      <form onSubmit={store} encType="multipart/form-data">
        <section className="ingreso">
          <button
            id="cancelBtn"
            value="cancel"
            type="button"
            onClick={closeModal}
          >
            &times;
          </button>
          <section className="ingreso">
            <article className="info-chof">
              <h1>Información del Chofer</h1>

              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                required
                onChange={(event) => {
                  handleInputChange(event);
                  setNombre(event.target.value);
                }}
              />
              <br></br>
              <br></br>
              <label htmlFor="apellido">Apellido:</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                required
                onChange={(event) => {
                  handleInputChange(event);
                  setApellido(event.target.value);
                }}
              />
              <br></br>
              <br></br>
              <label htmlFor="edad">Edad:</label>
              <input
                type="number"
                id="edad"
                name="edad"
                required
                min="18"
                onChange={(event) => {
                  handleInputChange(event);
                  setEdad(event.target.value);
                }}
              />
              <br></br>
              <br></br>
              <label htmlFor="numCedula">Número de Cédula:</label>
              <input
                type="number"
                id="numCedula"
                name="numCedula"
                min="0"
                max="9999999999"
                required
                onChange={(event) => {
                  handleInputChange(event);
                  setCedula(event.target.value);
                }}
              />
              <br></br>
              <br></br>
              <label htmlFor="sexo">Sexo:</label>
              <select
                name="sexo"
                id="sexo"
                required
                onChange={(event) => {
                  handleInputChange(event);
                  setSexo(event.target.value);
                }}
              >
                <option value=""></option>
                <option>Masculino</option>
                <option>Femenino</option>
              </select>
              <br></br>
              <br></br>
            </article>

            <article className="info-chof-prof">
              <h1>Información Profesional</h1>

              <label htmlFor="licencia">Tipo de licencia:</label>
              <select
                type="text"
                id="licencia"
                name="licencia"
                required
                onChange={(event) => {
                  handleInputChange(event);
                  setLicencia(event.target.value);
                }}
              >
                <option value=""></option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
                <option>E</option>
                <option>F</option>
              </select>
              <br></br>
              <br></br>
              <label htmlFor="sangre">Tipo de Sangre:</label>
              <select
                type="text"
                id="sangre"
                name="sangre"
                required
                onChange={(event) => {
                  handleInputChange(event);
                  setSangre(event.target.value);
                }}
              >
                <option value=""></option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
              <br></br>
              <br></br>
              <label htmlFor="correo">Correo:</label>
              <input
                type="email"
                id="correo"
                name="correo"
                required
                onChange={(event) => {
                  handleInputChange(event);
                  setCorreo(event.target.value);
                }}
              />
              <br></br>
              <br></br>
              <label htmlFor="telefono">Número de Teléfono:</label>
              <input
                type="number"
                id="telefono"
                name="telefono"
                min="0"
                max="9999999999"
                required
                onChange={(event) => {
                  handleInputChange(event);
                  setTelefono(event.target.value);
                }}
              />
              <br></br>
              <br></br>
              <label htmlFor="foto">Archivo de Foto:</label>
              <input
                type="file"
                name="fotoChofer"
                accept="image/jpeg , image/png, image/jpg"
                required
                onChange={(event) => {
                  handleInputChange(event);
                  handleFileChange(event);
                }}
              />
              <br></br>
              <button id="botonEnviar" value="Enviar">
                Confirmar
              </button>
            </article>
          </section>
        </section>
      </form>
    </>
  );
}

function validarCampo(campo, valor) {
  var inputElement = document.getElementById(campo);
  var botonEnviar = document.getElementById("botonEnviar");

  switch (campo) {
    case "edad":
      if (
        valor === "" ||
        isNaN(valor) ||
        parseInt(valor) < 18 ||
        parseInt(valor) > 60
      ) {
        inputElement.classList.add("error");
        botonEnviar.disabled = true;
      } else {
        inputElement.classList.remove("error");
        botonEnviar.disabled = false;
      }
      break;

    case "numCedula":
      if (valor === "" || isNaN(valor) || valor.length !== 10) {
        inputElement.classList.add("error");
        botonEnviar.disabled = true;
      } else if (!validarCedulaEcuatoriana(valor)) {
        inputElement.classList.add("error");
        botonEnviar.disabled = true;
      } else {
        inputElement.classList.remove("error");
        botonEnviar.disabled = false;
      }
      break;

    case "telefono":
      if (
        valor === "" ||
        isNaN(valor) ||
        valor.length !== 10 ||
        valor.length > 10 ||
        !/^09\d{8}$/.test(valor)
      ) {
        inputElement.classList.add("error");
        botonEnviar.disabled = true;
      } else {
        inputElement.classList.remove("error");
        botonEnviar.disabled = false;
      }
      break;

    case "nombre":
    case "apellido":
      if (!/^[a-zA-Z]+$/.test(valor)) {
        inputElement.classList.add("error");
        botonEnviar.disabled = true;
      } else {
        inputElement.classList.remove("error");
        botonEnviar.disabled = false;
      }
      break;

    case "correo":
      if (!/^[a-zA-Z0-9._-]+@[a-zA-Z]+\.(com|net|ec)$/.test(valor)) {
        inputElement.classList.add("error");
        botonEnviar.disabled = true;
      } else {
        inputElement.classList.remove("error");
        botonEnviar.disabled = false;
      }
      break;

    case "costo":
      if (!/^(\d+(\.\d{1,2})?)?$/.test(valor)) {
        inputElement.classList.add("error");
        botonEnviar.style.backgroundColor = "gray";
        botonEnviar.style.cursor = "not-allowed";
        botonEnviar.disabled = true;
      } else {
        inputElement.classList.remove("error");
        botonEnviar.style.backgroundColor = "#1b3665";
        botonEnviar.style.cursor = "pointer";
        botonEnviar.disabled = false;
      }
      break;

    default:
      break;
  }
}

function validarCedulaEcuatoriana(cedula) {
  if (!/^\d{10}$/.test(cedula)) {
    return false;
  }

  // Obtener los primeros 9 dígitos de la cédula
  var cedulaSinDigitoVerificador = cedula.substring(0, 9);

  // Calcular el dígito verificador esperado
  var digitoVerificadorEsperado = calcularDigitoVerificador(
    cedulaSinDigitoVerificador
  );

  var digitoVerificadorIngresado = parseInt(cedula.substring(9, 10));

  // Comparar el dígito verificador ingresado con el esperado
  return digitoVerificadorEsperado === digitoVerificadorIngresado;
}

function calcularDigitoVerificador(cedulaSinDigitoVerificador) {
  var coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];

  var suma = 0;
  for (var i = 0; i < 9; i++) {
    var producto =
      parseInt(cedulaSinDigitoVerificador.charAt(i)) * coeficientes[i];
    suma += producto >= 10 ? producto - 9 : producto;
  }

  var residuo = suma % 10;

  return residuo !== 0 ? 10 - residuo : residuo;
}

function BuscarChoferNombre({ handleFiltroNombres, choferes, setChoferData }) {
  const buscarChofer = (e) => {
    setChoferData(null);
    let filtro = e.target.value.toLowerCase();
    if (filtro === "") {
      handleFiltroNombres([]);
      return;
    }
    let resultado = choferes.filter((chofer) => {
      return (
        chofer.nombreChofer.toLowerCase().includes(filtro) ||
        chofer.apellidoChofer.toLowerCase().includes(filtro)
      );
    });

    handleFiltroNombres(resultado);
  };
  return (
    <>
      <form>
        <label htmlFor="busquedaNombre">Buscar: </label>
        <input
          type="text"
          id="busquedaNombre"
          placeholder="Ingresa Nombre"
          name="busquedaNombre"
          onChange={buscarChofer}
        />
      </form>
    </>
  );
}

function FiltroNombres({ filtroNombres, handleChoferData }) {
  return (
    <section className="contenedorTodosChoferes">
      {filtroNombres.length === 0 ? (
        <p className="datosIngresar">Ingrese un nombre</p>
      ) : (
        filtroNombres.map((chofer) => (
          <TarjetaChofer
            key={chofer.IDChofer}
            nombreChofer={chofer.nombreChofer}
            apellidoChofer={chofer.apellidoChofer}
            CI={chofer.CI}
            foto={chofer.foto}
            data={chofer}
            handleChoferData={handleChoferData}
          />
        ))
      )}
    </section>
  );
}

export default Chofer;
