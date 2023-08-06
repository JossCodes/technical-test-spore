import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { AxiosError } from "axios";

import { EditVehicleForm } from "@components/forms";
import { Container, Row } from "react-bootstrap";
import { IVehicle } from "@interfaces";
import { getOneVehicle } from "@services";

export const EditVehicle = () => {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<IVehicle | null>(null);
  const [notFound, setNotFound] = useState(false);

  const getVehicle = useCallback(async () => {
    if (id) {
      try {
        const { data } = await getOneVehicle({ id: parseInt(id) });
        setVehicle(data.vehicle);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error.response?.data.message);
          setNotFound(true);
        }
      }
    }
  }, [id]);

  useEffect(() => {
    getVehicle();
  }, [getVehicle]);

  return (
    <Container className="py-3">
      {!notFound ? (
        <>
          <div className="text-center">
            <h1>Editar vehículo</h1>
          </div>
          <Row className="mt-3">
            <div className="col-md-6 offset-md-3">
              <EditVehicleForm vehicle={vehicle} />
            </div>
          </Row>
        </>
      ) : (
        <div className="text-center">
          <h4>No se pudo encontrar el vehículo</h4>
        </div>
      )}
    </Container>
  );
};
