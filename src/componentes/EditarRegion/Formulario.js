import { obtenerEstilosModal } from '../../servicios/Listas';
import { TextField, Button } from "@material-ui/core";
import React, { useState } from "react";

const Formulario = ({ cerrarFormulario, regionEditada, pais }) => {

    const estilos = obtenerEstilosModal();

    const [nombre, setNombre] = useState(regionEditada.nombre);
    const [area, setArea] = useState(regionEditada.area);
    const [poblacion, setPoblacion] = useState(regionEditada.poblacion);

    const guardar = async (e) => {
        let url = regionEditada.id >= 0 ? `http://localhost:3030/regiones/modificar/${pais.id}/${regionEditada.nombre}`: 
        `http://localhost:3030/regiones/agregar/${pais.id}`;
        fetch(url,
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    nombre: nombre,
                    area: eval(area),
                    poblacion: eval(poblacion)
                }
                )
            }
        ).then((res) => res.json())
            .then((json) => {
                window.alert(`La región [${json.nombre}] fue ${regionEditada.id >= 0 ? "modificada": "agregada"}`);
                cerrarFormulario();
            })
            .catch((error) => {
                window.alert(`Error actualizando región: ${error}`);
            })
    }

    return (
        <form className={estilos.base}>
            <TextField
                label="Nombre de la Región"
                variant="filled"
                required
                value={nombre}
                onChange={(e) => { setNombre(e.target.value) }}
            />
            <TextField
                label="Área"
                variant="filled"
                required
                value={area}
                onChange={(e) => { setArea(e.target.value) }}
            />
            <TextField
                label="Población"
                variant="filled"
                required
                value={poblacion}
                onChange={(e) => { setPoblacion(e.target.value) }}
            />

            <div>
                <Button variant="contained" onClick={cerrarFormulario}>
                    Cancelar
                </Button>
                <Button variant="contained" onClick={guardar} color="Primary">
                    Aceptar
                </Button>
            </div>

        </form>
    );

}

export default Formulario;