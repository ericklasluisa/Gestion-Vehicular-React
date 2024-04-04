import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LogoCliente from '../../img/logo-cliente.png'
import '../../styles/inicio.css'
import { useParams } from 'react-router'

export const Inicio = () => {

    const [usuarios, setUsuario] = useState([]);
    const URI = 'http://localhost:8000/usuarios/';
    const { id } = useParams();

    useEffect(() => {
        // Función asincrónica para obtener los datos del vehículo
        const getUsuario = async () => {
            try {
                const res = await axios.get(URI + id);
                const data = res.data;
                setUsuario(data);
                console.log(data);
                
            } catch (error) {
                console.log(error);
            }
        };

        // Llamar a la función para obtener los datos del vehículo al montar el componente
        getUsuario();
    }, [])
    return (
        <section className="informacion">
            <article>
                <h1 className="titulo">Bienvenido</h1>
                <img width="30%" src={LogoCliente} alt="Logo-cliente" />
                <p></p>
               
                {usuarios.map((usuario, index) => (
                    <h3 key={index}>Usuario: {usuario.nombre} {usuario.apellido}</h3>
                ))}
            </article>
        </section>
    )
}

export default Inicio