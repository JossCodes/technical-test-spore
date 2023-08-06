import { BiSolidError } from "react-icons/bi";
import { SimpleModal } from "./SimpleModal";

interface Props {
  active: boolean;
  name: string;
  onClose: () => void;
  onAccept: () => void;
}

export const DeleteModal = ({ active, name, onClose, onAccept }: Props) => {
  return (
    <>
      {active && (
        <SimpleModal>
          <div className="modal-body text-center">
            <div className={"text-warning"} style={{ fontSize: "4em" }}>
              <BiSolidError />
            </div>
            <h6 className="modal-title fs-2 mt-3">
              ¿Estás seguro de eliminar el vehículo <strong>{name}</strong>?
            </h6>
            <p className="mt-3 mb-0">Esta acción no se puede deshacer</p>
          </div>
          <div className="modal-footer border-0">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onAccept}
            >
              Confirmar
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </SimpleModal>
      )}
    </>
  );
};
