import Dialog from "@material-ui/core/Dialog"
import Formulario from "./Formulario";

const ModalEditar = ({ estado, cerrar, region, idpais }) => {
    return (
        <Dialog open={estado} onClose={cerrar} >
            <Formulario cerrarFormulario={cerrar} regionEditada={region} idpais={idpais}/>
        </Dialog>
    );
}

export default ModalEditar;