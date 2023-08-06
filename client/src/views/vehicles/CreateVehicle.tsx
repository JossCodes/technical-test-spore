import { CreateVehicleForm } from "@components/forms";
import { Container, Row } from "react-bootstrap";

export const CreateVehicle = () => {
  return (
    <Container className="py-3">
      <div className="text-center">
        <h1>Crear vehículo</h1>
      </div>
      <Row className="mt-3">
        <div className="col-md-6 offset-md-3">
          <CreateVehicleForm />
        </div>
      </Row>
    </Container>
  );
};
