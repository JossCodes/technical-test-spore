import { MapComponent } from "@components/elements";
import { AlertModal } from "@components/modals";
import { getVehicleCoordinates, updateVehicleCoordinates } from "@services";
import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

export const MapVehicle = () => {
  const { id } = useParams();
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    lng: 0,
    write: false,
  });
  const [showAlert, setShowAlert] = useState(false);

  const getCoordinates = useCallback(async () => {
    if (!id) return;
    try {
      const { data } = await getVehicleCoordinates(parseInt(id));
      if (data.coordinates)
        setCoordinates({
          lat: data.coordinates.latitude,
          lng: data.coordinates.longitude,
          write: data.coordinates.write || false,
        });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
    }
  }, [id]);

  const handleSaveCoordinates = async ({
    lat,
    lng,
  }: {
    lat: number;
    lng: number;
  }) => {
    if (!id) return;
    try {
      await updateVehicleCoordinates({
        id: parseInt(id),
        latitude: lat,
        longitude: lng,
      });
      setCoordinates({ lat, lng, write: true });
      setShowAlert(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
    }
  };

  useEffect(() => {
    getCoordinates();
  }, [getCoordinates]);

  return (
    <Container className="py-3">
      <div className="text-center">
        <h1>Mapa de Vehículo</h1>
        <MapComponent
          lat={coordinates.lat}
          lng={coordinates.lng}
          onSaveCoordinates={handleSaveCoordinates}
        />
      </div>
      <AlertModal
        active={showAlert}
        title="Ubicación guardada"
        message="La ubicación del vehículo ha sido guardada correctamente"
        type="success"
        onClose={() => setShowAlert(false)}
      />
    </Container>
  );
};
