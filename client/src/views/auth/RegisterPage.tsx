import { FormRegister } from "@components/forms";
import { Container, Row, Col } from "react-bootstrap";

export const RegisterPage = () => {
  return (
    <Container fluid style={{ height: "100vh" }}>
      <Row className="h-100 align-items-center justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <div className="bg-light bg-gradient p-4 my-4 rounded">
            <RegisterContainer />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const RegisterContainer = () => {
  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} className="text-center">
          <h2>Vehicle Hub App</h2>
          <h4>¡Bienvenido!</h4>
          <h5>Ingresa tu datos para registrarte</h5>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col>
          <FormRegister />
        </Col>
      </Row>
    </Container>
  );
};
