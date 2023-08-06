import { ReactNode } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Sidebar } from "@components/elements";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Row className="mx-0">
        <Col md={3} xl={2} className="sidebar p-0 z-1">
          <Sidebar />
        </Col>
        <Col md={9} xl={10} className="ml-auto">
          <Container>
            <div>{children}</div>
          </Container>
        </Col>
      </Row>
    </>
  );
};
