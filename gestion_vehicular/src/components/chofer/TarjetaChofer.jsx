import React from "react";
import "../../styles/TarjetaChofer.css";

function TarjetaChofer(props) {
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

  const base64Content = codificarABase64(props.foto.data);

  return (
    <section>
      <button
        id="btn-message"
        className="button-message"
        onClick={() => {
          if (props.data) {
            props.handleChoferData(props.data);
          }
        }}
      >
        <div className="content-avatar">
          <div className="avatar">
            <img
              src={`data:image/*;base64,${base64Content}`}
              className="user-img"
              alt="Foto del Chofer"
            />
          </div>
        </div>
        <div className="notice-content">
          <div className="username">{props.CI}</div>
          <div className="lable-message">
            {props.nombreChofer + " " + props.apellidoChofer}
          </div>
          <div className="user-id">
            {props.nombreChofer + " " + props.apellidoChofer}
          </div>
        </div>
      </button>
    </section>
  );
}

export default TarjetaChofer;
