import { AlertModal } from "@components/modals";
import { ICreateVehiclePayload } from "@interfaces";
import { createVehicle } from "@services";
import { useState } from "react";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DEFAULT_FORM_DATA: ICreateVehiclePayload = {
  name: "",
  plates: "",
  brand: "",
  model: "",
  color: "",
  image: "",
};

const DEFAULT_ERRORS = {
  name: false,
  plates: false,
};

export const CreateVehicleForm = () => {
  const [formData, setFormData] =
    useState<ICreateVehiclePayload>(DEFAULT_FORM_DATA);
  const [errors, setErrors] = useState(DEFAULT_ERRORS);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();

  const validData = () => {
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
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validData()) {
      const { data } = await createVehicle(formData);
      const { newVehicle } = data;
      setAlertMessage(
        `El vehículo ${newVehicle.name} con placas ${newVehicle.plates} ha sido creado exitosamente`
      );
      setShowAlert(true);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-3">
          <FormLabel htmlFor="name">Nombre</FormLabel>
          <FormControl
            type="text"
            id="name"
            onChange={handleChange}
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
            placeholder="Ejemplo: Toyota"
          />
        </FormGroup>
        <FormGroup className="mb-3">
          <FormLabel htmlFor="model">Modelo</FormLabel>
          <FormControl
            type="text"
            id="model"
            onChange={handleChange}
            placeholder="Ejemplo: Corolla"
          />
        </FormGroup>
        <FormGroup className="mb-3">
          <FormLabel htmlFor="color">Color</FormLabel>
          <FormControl
            type="text"
            id="color"
            onChange={handleChange}
            placeholder="Ejemplo: Rojo"
          />
        </FormGroup>
        <FormGroup className="mb-3">
          <FormLabel htmlFor="image">Imagen</FormLabel>
          <FormControl
            type="text"
            id="image"
            onChange={handleChange}
            placeholder="Ejemplo: https://www.google.com/imagen.jpg"
          />
        </FormGroup>
        <div className="text-center">
          <Button
            variant="success"
            type="submit"
            className="d-block mx-auto px-4"
          >
            Crear
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
        title="¡Vehículo creado!"
        message={alertMessage}
        onClose={() => {
          setShowAlert(false);
          navigate("/dashboard");
        }}
        type="success"
      />
    </>
  );
};
