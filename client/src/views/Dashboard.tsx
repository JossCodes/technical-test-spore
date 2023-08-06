import { useEffect, useState } from "react";

import { AxiosError } from "axios";
import { getAllVehicles } from "@services";

import { Col, Container, Row, Spinner } from "react-bootstrap";

import { VehicleCard } from "@components/cards";
import { PaginationComponent } from "@components/elements/ui";

import { IVehicle } from "@interfaces";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const getVehicles = async (currentPage: number = 0) => {
    try {
      const { data } = await getAllVehicles({
        page: currentPage,
        pageSize: 5,
      });
      setVehicles(data.vehicles);
      setTotalPages(data.totalPages);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
    }
  };

  const onChangePage = (currentPage: number) => {
    setVehicles([]);
    getVehicles(currentPage);
  };

  useEffect(() => {
    getVehicles();
  }, []);

  return (
    <Container className="pt-3">
      <div className="text-center">
        <h1>Todos los vehículos</h1>
      </div>
      <div className="text-end">
        <Link to="/vehicle/create">
          <button className="btn btn-success">+ Agregar vehículo</button>
        </Link>
      </div>
      <Row className="mt-3">
        {vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <VehicleCard vehicle={vehicle} key={vehicle.id} />
          ))
        ) : (
          <Col className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        )}
      </Row>

      <PaginationComponent totalPages={totalPages} onChange={onChangePage} />
    </Container>
  );
};
