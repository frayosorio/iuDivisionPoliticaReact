import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import ModalEditar from '../componentes/EditarRegion/Modal';

import { obtenerEstilos, listarRegiones, listarPaises } from '../servicios/Listas';
import { Region } from '../modelos/modelos';
import Confirmacion from '../componentes/Confirmacion'

const columnas = [
    { field: "nombre", headerName: "Nombre", width: 300 },
    { field: "area", headerName: "Área", width: 200 },
    { field: "poblacion", headerName: "Población", width: 200 },
]

const Regiones = () => {

    const estilos = obtenerEstilos();

    //variable que almacenará la lista de regiones
    const [regiones, setRegiones] = useState([]);

    //variable que almacenará la lista de paises
    const [paises, setPaises] = useState([]);

    async function obtenerRegiones() {
        const regionesT = await listarRegiones(pais.id);
        setRegiones(regionesT);
        setEstadoListado(false);
    }

    async function obtenerPaises() {
        const paisesT = await listarPaises();
        setPaises(paisesT);
        setEstadoListadoPaises(false);
    }

    const [estadoListado, setEstadoListado] = useState(false);
    const [estadoListadoPaises, setEstadoListadoPaises] = useState(true);
    const [estadoModal, setEstadoModal] = useState(false);
    const [regionEditada, setRegionEditada] = useState({});
    const [estadoConfirmacion, setEstadoConfirmacion] = useState(false);
    const [pais, setPais] = useState({});

    var regionSeleccionada;

    if (estadoListado) {
        obtenerRegiones();
    }
    if (estadoListadoPaises) {
        obtenerPaises();
    }

    const agregar = () => {
        if (pais.id) {
            const regionE = new Region(-1, "", 0, 0);

            setRegionEditada(regionE);
            setEstadoModal(true);
        }
        else {
            window.alert("Por favor seleccione un país para la región a agregar");
        }
    }

    const modificar = () => {
        if (regionSeleccionada) {
            setRegionEditada(regionSeleccionada);
            setEstadoModal(true);
        }
        else {
            window.alert("Por favor seleccione la región a editar");
        }
    }

    const eliminar = () => {
        if (regionSeleccionada) {
            setRegionEditada(regionSeleccionada);
            setEstadoConfirmacion(true);
        }
        else {
            window.alert("Por favor seleccione la región a eliminar");
        }
    }

    const cerrarModal = () => {
        setEstadoModal(false);
        setEstadoListado(true);
    }

    const cerrarConfirmacion = () => {
        setEstadoConfirmacion(false);
    }

    const aceptarConfirmacion = () => {
        fetch(`http://localhost:3030/regiones/${pais.id}/${regionEditada.nombre}`,
            { method: 'delete' }
        )
            .then((res) => {
                if (res.status != 200) {
                    throw Error(res.statusText);
                }
                return res.json();
            })
            .then((json) => {
                window.alert(json.mensaje);
                setEstadoListado(true);
            })
            .catch((error) => {
                window.alert(`Error eliminando Región: ${error}`);
            });

    }

    const seleccionarPais = (e, paisEscogido) => {
        if (paisEscogido) {
            setPais(paisEscogido);
            setEstadoListado(true);
        }
    }

    return (
        <div>
            <center>
                <h1>
                    Lista de Regiones
                </h1>
            </center>
            <div style={{ height: 500, width: '100%' }}>
                <Button className={estilos.botonAgregar} onClick={agregar}>
                    Agregar
                </Button>
                <Button className={estilos.botonModificar} onClick={modificar}>
                    Modificar
                </Button>
                <Button className={estilos.botonEliminar} onClick={eliminar}>
                    Eliminar
                </Button>

                <Autocomplete
                    value={pais}
                    options={paises}
                    required
                    getOptionLabel={(option) => option.nombre || ""}
                    onChange={seleccionarPais}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="País"
                            variant="filled"
                        />
                    )
                    }
                />

                <DataGrid
                    rows={regiones}
                    columns={columnas}

                    onSelectionModelChange={(idRegiones) => {

                        const regionesSeleccionados = regiones.filter(
                            function (fila) {
                                return fila.id == idRegiones[0];
                            }
                        );
                        regionSeleccionada = regionesSeleccionados[0];
                    }

                    }
                />

                <ModalEditar estado={estadoModal} cerrar={cerrarModal} region={regionEditada} pais={pais} />

                <Confirmacion open={estadoConfirmacion}
                    titulo="Eliminando Región"
                    mensaje="Está seguro?"
                    cerrar={cerrarConfirmacion}
                    aceptar={aceptarConfirmacion}
                />
            </div>
        </div>
    );
}

export default Regiones; 