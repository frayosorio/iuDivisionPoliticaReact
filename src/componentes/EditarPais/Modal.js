import Dialog from "@material-ui/core/Dialog"
import Formulario from "./Formulario";

const ModalEditar = ({ estado, cerrar, pais }) => {
    return (
        <Dialog open={estado} onClose={cerrar} >
            <Formulario cerrarFormulario={cerrar} paisEditado={pais} />
        </Dialog>
    );
}

export default ModalEditar;