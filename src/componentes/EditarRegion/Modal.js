import { Dialog, DialogTitle } from "@material-ui/core";
import Formulario from "./Formulario";

const ModalEditar = ({ estado, cerrar, region, pais }) => {
    return (
        <Dialog open={estado} onClose={cerrar} >
             <DialogTitle>
                {region.id>=0?"Modificando región del país ":" Agregando región del país "}
                {pais.nombre}            
            </DialogTitle>
            <Formulario cerrarFormulario={cerrar} regionEditada={region} pais={pais}/>
        </Dialog>
    );
}

export default ModalEditar;