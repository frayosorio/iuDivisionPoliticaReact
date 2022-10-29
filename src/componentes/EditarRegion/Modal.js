import Dialog from "@material-ui/core/Dialog"
import Formulario from "./Formulario";

const ModalEditar = ({ estado, cerrar, region }) => {
    return (
        <Dialog open={estado} onClose={cerrar} >
            <Formulario cerrarFormulario={cerrar} regionEditada={region} />
        </Dialog>
    );
}

export default ModalEditar;