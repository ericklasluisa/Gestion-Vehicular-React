import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Chofer from './Chofer';

const URI = 'http://localhost:8000/choferes/';

const CompGeneralChofer = () => {
    // Estado para almacenar los datos del vehículo
    const [choferData, setChoferData] = useState();
    const { cedula } = useParams();

    
    useEffect(() => {
        // Función asincrónica para obtener los datos del vehículo
        const getChofer = async () => {
            try {
                const res = await axios.get(URI + cedula);
                const data = res.data;
                // Actualizar el estado con los datos del vehículo
                setChoferData(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };

        // Llamar a la función para obtener los datos del vehículo al montar el componente
        getChofer();
    }, []);
    
    console.log(choferData);
    return (
        <div>
            <Chofer choferData={choferData} />
        </div>
    );
};

export default CompGeneralChofer;
