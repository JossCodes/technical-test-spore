import { AlertModal } from "@components/modals";
import { IVehicle } from "@interfaces";
import { updateVehicle } from "@services";
import { useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Col,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DEFAULT_ERRORS = {
  name: false,
  plates: false,
};

interface Props {
  vehicle: IVehicle | null;
}

export const EditVehicleForm = ({ vehicle }: Props) => {
  const [formData, setFormData] = useState<IVehicle | null>(null);
  const [errors, setErrors] = useState(DEFAULT_ERRORS);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();

  const validData = () => {
    if (!formData) return false;
    const arrErrors = {
      ...DEFAULT_ERRORS,
    };
    if (!formData.name) {
      arrErrors.name = true;
    }
    if (!formData.plates) {
      arrErrors.plates = true;
    }
    setErrors(arrErrors);
    if (arrErrors.name || arrErrors.plates) {
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData) return;
    if (validData()) {
      const { data } = await updateVehicle({
        ...formData,
      });
      setAlertMessage(`El vehículo ${data.vehicle.name} se editó exitosamente`);
      setShowAlert(true);
    }
  };

  useEffect(() => {
    if (vehicle) {
      setFormData(vehicle);
    }
  }, [vehicle]);

  return (
    <>
      {formData ? (
        <>
          <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-3">
              <FormLabel htmlFor="name">Nombre</FormLabel>
              <FormControl
                type="text"
                id="name"
                onChange={handleChange}
                value={formData.name}
                placeholder="Ejemplo: Camioneta de reparto"
              />
              {errors.name && (
                <Form.Text className="text-danger">
                  El nombre es requerido
                </Form.Text>
              )}
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel htmlFor="plates">Placas</FormLabel>
              <FormControl
                type="text"
                id="plates"
                onChange={handleChange}
                value={formData.plates}
                placeholder="Ejemplo: JW-60-261"
              />
              {errors.plates && (
                <Form.Text className="text-danger">
                  Las placas son requeridas
                </Form.Text>
              )}
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel htmlFor="brand">Marca</FormLabel>
              <FormControl
                type="text"
                id="brand"
                onChange={handleChange}
                value={formData.brand}
                placeholder="Ejemplo: Toyota"
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel htmlFor="model">Modelo</FormLabel>
              <FormControl
                type="text"
                id="model"
                onChange={handleChange}
                value={formData.model}
                placeholder="Ejemplo: Corolla"
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel htmlFor="color">Color</FormLabel>
              <FormControl
                type="text"
                id="color"
                onChange={handleChange}
                value={formData.color}
                placeholder="Ejemplo: Rojo"
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel htmlFor="image">Imagen</FormLabel>
              <FormControl
                type="text"
                id="image"
                onChange={handleChange}
                value={formData.image}
                placeholder="Ejemplo: https://www.google.com/imagen.jpg"
              />
            </FormGroup>
            <div className="text-center">
              <Button
                variant="success"
                type="submit"
                className="d-block mx-auto px-4"
              >
                Editar
              </Button>
              <Button
                variant="danger"
                className="d-block mx-auto mt-3"
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                Cancelar
              </Button>
            </div>
          </Form>
          <AlertModal
            active={showAlert}
            title="¡Vehículo actualizado!"
            message={alertMessage}
            onClose={() => {
              setShowAlert(false);
              navigate("/dashboard");
            }}
            type="success"
          />
        </>
      ) : (
        <Col className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Col>
      )}
    </>
  );
};
