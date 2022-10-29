import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from "@material-ui/core";
import ModalEditar from '../componentes/EditarPais/Modal';

import { obtenerEstilos, listarPaises } from '../servicios/Listas';
import { Pais } from '../modelos/modelos';
import Confirmacion from '../componentes/Confirmacion'

const columnas = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "nombre", headerName: "Nombre", width: 300 },
    { field: "codigoAlfa2", headerName: "Código Alfa 2", width: 200 },
    { field: "codigoAlfa3", headerName: "Código Alfa 3", width: 200 },
    { field: "tipoRegion", headerName: "Tipo de Región", width: 200 },
    { field: "continente", headerName: "Continente", width: 200 },
]

const Paises = () => {

    const estilos = obtenerEstilos();

    //variable que almacenará la lista de paises
    const [paises, setPaises] = useState([]);



    async function obtenerPaises() {
        const paisesT = await listarPaises();
        setPaises(paisesT);
        setEstadoListado(false);
    }

    const [estadoListado, setEstadoListado] = useState(false);
    const [estadoModal, setEstadoModal] = useState(false);
    const [paisEditado, setPaisEditado] = useState({});
    const [estadoConfirmacion, setEstadoConfirmacion] = useState(false);

    var paisSeleccionado;

    if (estadoListado) {
        obtenerPaises()
    }

    const agregar = () => {
        const paisE = new Pais(-1, "", "", "", "", "");

        setPaisEditado(paisE);
        setEstadoModal(true);
    }

    const modificar = () => {
        if (paisSeleccionado) {
            setPaisEditado(paisSeleccionado);
            setEstadoModal(true);
        }
        else {
            window.alert("Por favor seleccione el país a editar");
        }
    }

    const eliminar = () => {
        if (paisSeleccionado) {
            setPaisEditado(paisSeleccionado);
            setEstadoConfirmacion(true);
        }
        else {
            window.alert("Por favor seleccione el país a eliminar");
        }
    }

    const cerrarModal = () => {
        setEstadoModal(false);
    }

    const cerrarConfirmacion = () => {
        setEstadoConfirmacion(false);
    }

    const aceptarConfirmacion = () => {
        fetch(`http://localhost:3030/paises/${paisEditado.id}`,
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
                window.alert(`Error eliminando País: ${error}`);
            });

    }

    return (
        <div>
            <center>
                <h1>
                    Lista de Paises
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

                <DataGrid
                    rows={paises}
                    columns={columnas}

                    onSelectionModelChange={(idPaises) => {

                        const paisesSeleccionados = paises.filter(
                            function (fila) {
                                return fila.id == idPaises[0];
                            }
                        );

                        paisSeleccionado = paisesSeleccionados[0];
                    }

                    }
                />

                <ModalEditar estado={estadoModal} cerrar={cerrarModal} pais={paisEditado} />
                <Confirmacion open={estadoConfirmacion}
                    titulo="Eliminado País"
                    mensaje="Está seguro?"
                    cerrar={cerrarConfirmacion}
                    aceptar={aceptarConfirmacion}
                />
            </div>
        </div>
    );
}

export default Paises; 