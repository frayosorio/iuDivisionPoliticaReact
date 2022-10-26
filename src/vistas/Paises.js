import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';

import { listarPaises } from '../servicios/Listas';

const columnas = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "nombre", headerName: "Nombre", width: 300 },
    { field: "codigoAlfa2", headerName: "Código Alfa 2", width: 200 },
    { field: "codigoAlfa3", headerName: "Código Alfa 3", width: 200 },
    { field: "tipoRegion", headerName: "Tipo de Región", width: 200 },
    { field: "continente", headerName: "Continente", width: 200 },
]

const Paises = () => {

    //variable que almacenará la lista de paises
    const [paises, setPaises] = useState([]);



    async function obtenerPaises() {
        const paisesT = await listarPaises();
        setPaises(paisesT);
        setEstadoListado(false);
    }

    const [estadoListado, setEstadoListado] = useState(true);

    if (estadoListado) {
        obtenerPaises()
    }

    return (
        <div>
            <center>
                <h1>
                    Lista de Paises
                </h1>
            </center>
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={paises}
                    columns={columnas}
                   />
            </div>
        </div>
    );
}

export default Paises; 