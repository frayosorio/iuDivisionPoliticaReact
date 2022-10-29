import { Routes, Route } from 'react-router-dom'

import Paises from '../vistas/Paises'
import Regiones from '../vistas/Regiones'
import Inicio from '../vistas/Inicio'


const Rutas = () => {

    return (
        <Routes>
            <Route path='/' element={<Inicio />} />
            <Route path='/paises' element={<Paises />} />
            <Route path='/regiones' element={<Regiones />} />
        </Routes>
    );
}

export default Rutas;