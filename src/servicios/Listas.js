export const Pais = function (id, nombre, codigoAlfa2, codigoAlfa3, tipoRegion, continente) {
    this.id = id;
    this.nombre = nombre;
    this.codigoAlfa2 = codigoAlfa2;
    this.codigoAlfa3 = codigoAlfa3;
    this.tipoRegion = tipoRegion;
    this.continente = continente;
}


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
            return res.json();
        })
        .then((json) => {
            var paises = [];
            json.map((item) => {
                paises.push(new Pais(item.id,
                    item.nombre,
                    item.codigoAlfa2,
                    item.codigoAlfa3,
                    item.tipoRegion,
                    item.continente
                ));
            });
            return paises;
        })
        .catch(function (error) {
            window.alert(`Error consultando paises [${error}]`);
        });


}