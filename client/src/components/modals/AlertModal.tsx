import { IAlertModal, ITypeStyles } from "@interfaces";
import { SimpleModal } from "./";

import { BiSolidError } from "react-icons/bi";
import { BsFillCheckCircleFill, BsInfoCircleFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";

export const AlertModal = ({
  type,
  title,
  message,
  active,
  onClose,
}: IAlertModal) => {
  const typeStyle: ITypeStyles = {
    danger: {
      classType: "text-danger",
      icon: <ImCross />,
    },
    success: {
      classType: "text-success",
      icon: <BsFillCheckCircleFill />,
    },
    waring: {
      classType: "text-warning",
      icon: <BiSolidError />,
    },
    info: {
      classType: "text-info",
      icon: <BsInfoCircleFill />,
    },
  };
  return (
    <>
      {active && (
        <SimpleModal>
          <div className="modal-body text-center">
            <div
              className={typeStyle[type].classType}
              style={{ fontSize: "4em" }}
            >
              {typeStyle[type].icon}
            </div>
            {title && <h5 className="modal-title fs-2 mt-3">{title}</h5>}
            {message && <p className="mt-3 mb-0">{message}</p>}
          </div>
          <div className="modal-footer border-0">
            <button type="button" className="btn btn-primary" onClick={onClose}>
              Ok
            </button>
          </div>
        </SimpleModal>
      )}
    </>
  );
};
