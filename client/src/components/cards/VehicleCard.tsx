import { useNavigate } from "react-router-dom";

import { Col, Container, Row, Card, Button } from "react-bootstrap";
import { IVehicle, ModalTypes } from "@interfaces";

import { HiMap, HiPencilAlt, HiTrash } from "react-icons/hi";

import vehicleImage from "../../assets/car.jpg";
import "./VehicleCard.css";
import { AlertModal, DeleteModal } from "..";
import { useState } from "react";
import { deleteVehicle } from "@services";

interface Props {
  vehicle: IVehicle;
}
interface AlertModal {
  type: ModalTypes[keyof ModalTypes];
  active: boolean;
  title: string;
  message?: string;
}

export const VehicleCard = ({ vehicle }: Props) => {
  const navigate = useNavigate();

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [alertModal, setAlertModal] = useState<AlertModal>({
    active: false,
    message: "",
    type: "info",
    title: "",
  });

  const handleConfirmDelete = async () => {
    setShowModalDelete(false);
    try {
      await deleteVehicle(vehicle.id);
      setAlertModal({
        active: true,
        message: "El vehículo ha sido eliminado correctamente",
        title: "¡Vehículo eliminado!",
        type: "success",
      });
    } catch (error) {
      setAlertModal({
        active: true,
        message: "El vehículo no se pudo eliminar. Intente más tarde",
        title: "¡Error!",
        type: "danger",
      });
    }
  };

  return (
    <>
      <section>
        <Container fluid>
          <Row className="justify-content-center mb-3">
            <Col md={12} xl={10}>
              <Card className="shadow-0 border rounded-3">
                <Card.Body>
                  <Row>
                    <Col md={12} lg={3} xl={3} mb-4 mb-lg-0>
                      <div className="bg-image hover-zoom ripple rounded ripple-surface">
                        <img
                          src={vehicle.image || vehicleImage}
                          className="w-100"
                          alt="Product"
                        />
                        <a href="#!">
                          <div className="hover-overlay">
                            <div
                              className="mask"
                              style={{
                                backgroundColor: "rgba(253, 253, 253, 0.15)",
                              }}
                            ></div>
                          </div>
                        </a>
                      </div>
                    </Col>
                    <Col md={6} lg={6} xl={6} className={`text-center`}>
                      <div
                        style={{ minHeight: "100%" }}
                        className="d-flex flex-column"
                      >
                        <div className="flex-grow-0">
                          <h5>{vehicle.name}</h5>
                        </div>
                        <div className="flex-grow-1 d-flex align-items-center">
                          <Row>
                            <Col xs={3} md={6} xl={3} className="pb-2">
                              <span className="fw-bold">
                                Marca <br />
                              </span>
                              {vehicle.brand}
                            </Col>
                            {vehicle.model && (
                              <Col xs={3} md={6} xl={3} className="pb-2">
                                <span className="fw-bold">
                                  Modelo <br />
                                </span>
                                {vehicle.model}
                              </Col>
                            )}
                            {vehicle.color && (
                              <Col xs={3} md={6} xl={3} className="pb-2">
                                <span className="fw-bold">
                                  Color <br />
                                </span>
                                {vehicle.color}
                              </Col>
                            )}
                            {vehicle.plates && (
                              <Col xs={3} md={6} xl={3} className="pb-2">
                                <span className="fw-bold">
                                  Placas <br />
                                </span>
                                {vehicle.plates}
                              </Col>
                            )}

                            <Col>
                              <Button
                                variant="warning"
                                size="sm"
                                className="w-100 py-2"
                                onClick={() => {
                                  navigate(`/vehicle/map/${vehicle.id}`);
                                }}
                              >
                                <HiMap /> Ver Mapa
                              </Button>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </Col>
                    {vehicle.write && (
                      <Col
                        md={6}
                        lg={3}
                        xl={3}
                        className="border-sm-start-none border-start mt-4 mt-md-0"
                      >
                        <div
                          className="d-flex flex-column justify-content-center"
                          style={{ minHeight: "100%" }}
                        >
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() =>
                              navigate(`/vehicle/edit/${vehicle.id}`)
                            }
                          >
                            <HiPencilAlt /> Editar
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            className="mt-2"
                            onClick={() => setShowModalDelete(true)}
                          >
                            <HiTrash /> Eliminar
                          </Button>
                        </div>
                      </Col>
                    )}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        <DeleteModal
          active={showModalDelete}
          name={vehicle.name}
          onClose={() => setShowModalDelete(false)}
          onAccept={handleConfirmDelete}
        />

        <AlertModal
          active={alertModal.active}
          title={alertModal.title}
          message={alertModal.message}
          onClose={() => {
            setAlertModal({ ...alertModal, active: false });
            window.location.reload();
          }}
          type={alertModal.type}
        />
      </section>
    </>
  );
};
