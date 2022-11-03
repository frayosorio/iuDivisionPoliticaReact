import { makeStyles } from "@material-ui/core";
import { Pais, Region } from "../modelos/modelos";

export const obtenerEstilos = makeStyles(tema => ({
    botonAgregar: {
        borderRadius: 15,
        backgroundColor: "#21b6ae",
        padding: "10px 10px",
        fontSize: "18px"
    },
    botonModificar: {
        borderRadius: 15,
        backgroundColor: "#55ff55",
        padding: "10px 10px",
        fontSize: "18px"
    },
    botonEliminar: {
        borderRadius: 15,
        backgroundColor: "#ff5555",
        padding: "10px 10px",
        fontSize: "18px"
    }
}));


export const obtenerEstilosModal = makeStyles(tema => ({
    base: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: tema.spacing(2),

        '& .MuiTextField-root': {
            margin: tema.spacing(1),
            width: '300px',
        },
        '& .MuiButtonBase-root': {
            margin: tema.spacing(2),
        },
    },
}));


export const listarPaises = () => {
    //Consultar la lista de paises desde la API
    return fetch("http://localhost:3030/paises",
        {
            method: "GET",
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error, estado=${res.status}`);
            }
            return res.text();
        })
        .then((data) => {
            return data.length == 0 ? '{}' : JSON.parse(data);
        })
        .then((json) => {
            var paises = [];
            if (json != '{}') {
                json.map((item) => {
                    paises.push(new Pais(item.id,
                        item.nombre,
                        item.codigoAlfa2,
                        item.codigoAlfa3,
                        item.tipoRegion,
                        item.continente
                    ));
                });
            }
            return paises;
        })
        .catch(function (error) {
            window.alert(`Error consultando paises [${error}]`);
        });
}


export const listarRegiones = (idPais) => {
    //Consultar la lista de paises desde la API
    return fetch(`http://localhost:3030/regiones/${idPais}`,
        {
            method: "GET",
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error, estado=${res.status}`);
            }
            return res.text();
        })
        .then((data) => {
            return data.length == 0 ? '{}' : JSON.parse(data);
        })
        .then((json) => {
            var regiones = [];
            if (json != '{}') {
                json.map((item, indice) => {
                    regiones.push(new Region(indice,
                        item.nombre,
                        item.area,
                        item.poblacion
                    ));
                });
            }
            return regiones;
        })
        .catch(function (error) {
            window.alert(`Error consultando regiones [${error}]`);
        });
}