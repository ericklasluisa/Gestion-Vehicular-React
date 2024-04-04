import React, { useState } from "react";
import axios from "axios";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function EditarChofer({ chofer }) {
  const infoChofer = chofer;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    validarCampo(name, value);
  };

  const [nombre, setNombre] = useState(infoChofer.nombreChofer);
  const [apellido, setApellido] = useState(infoChofer.apellidoChofer);
  const [cedula, setCedula] = useState(infoChofer.CI);
  const [edad, setEdad] = useState(infoChofer.edad);
  const [sexo, setSexo] = useState(infoChofer.sexo);
  const [licencia, setLicencia] = useState(infoChofer.licencia);
  const [sangre, setSangre] = useState(infoChofer.tipoSangre);
  const [correo, setCorreo] = useState(infoChofer.correo);
  const [telefono, setTelefono] = useState("0" + infoChofer.numTelefono);
  const [foto, setFoto] = useState(null);

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
    if (foto) formData.append("foto", foto); // Agregar la foto al FormData

    try {
      const response = await axios.put(
        "http://localhost:8000/chofer/" + infoChofer.IDChofer,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Indicar que el contenido es de tipo form-data
          },
        }
      );
      MySwal.fire({
        title: "EL CHOFER HA SIDO EDITADO CORRECTAMENTE!",
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
          <section className="ingreso">
            <article className="info-chof">
              <h1>Información del Chofer</h1>

              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombreEditar"
                name="nombreEditar"
                value={nombre}
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
                id="apellidoEditar"
                name="apellidoEditar"
                value={apellido}
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
                id="edadEditar"
                name="edadEditar"
                value={edad}
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
                id="numCedulaEditar"
                name="numCedulaEditar"
                value={cedula}
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
                name="sexoEditar"
                id="sexoEditar"
                required
                onChange={(event) => {
                  handleInputChange(event);
                  setSexo(event.target.value);
                }}
              >
                <option>{sexo}</option>
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
                id="licenciaEditar"
                name="licenciaEditar"
                value={licencia}
                required
                onChange={(event) => {
                  handleInputChange(event);
                  setLicencia(event.target.value);
                }}
              >
                <option>{licencia}</option>
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
                id="sangreEditar"
                name="sangreEditar"
                required
                onChange={(event) => {
                  handleInputChange(event);
                  setSangre(event.target.value);
                }}
              >
                <option value={sangre}>{sangre}</option>
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
                id="correoEditar"
                name="correoEditar"
                value={correo}
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
                id="telefonoEditar"
                name="telefonoEditar"
                value={telefono}
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
                // required
                onChange={(event) => {
                  handleInputChange(event);
                  handleFileChange(event);
                }}
              />
              <br></br>
              <button id="botonEnviarEditar" value="Enviar">
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
  var botonEnviar = document.getElementById("botonEnviarEditar");

  switch (campo) {
    case "edadEditar":
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

    case "numCedulaEditar":
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

    case "telefonoEditar":
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

    case "nombreEditar":
    case "apellido":
      if (!/^[a-zA-Z]+$/.test(valor)) {
        inputElement.classList.add("error");
        botonEnviar.disabled = true;
      } else {
        inputElement.classList.remove("error");
        botonEnviar.disabled = false;
      }
      break;

    case "correoEditar":
      if (!/^[a-zA-Z0-9._-]+@[a-zA-Z]+\.(com|net|ec)$/.test(valor)) {
        inputElement.classList.add("error");
        botonEnviar.disabled = true;
      } else {
        inputElement.classList.remove("error");
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

export default EditarChofer;
