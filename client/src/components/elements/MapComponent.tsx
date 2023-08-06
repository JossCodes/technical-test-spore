import { useState, useEffect, useRef } from "react";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";
import { Option } from "react-google-places-autocomplete/build/types";
import { SingleValue } from "react-select";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { Button, Col, Container, Row } from "react-bootstrap";
import { HiArrowLeft, HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_GMAK;

interface Props {
  lat?: number;
  lng?: number;
  onSaveCoordinates: ({ lat, lng }: { lat: number; lng: number }) => void;
}

const DEFAULT_COORDINATES = {
  lat: 20.6866131,
  lng: -103.3507872,
};

export const MapComponent = ({
  onSaveCoordinates,
  ...initialCoordinates
}: Props) => {
  const mapContainerRef = useRef(null);
  const [coordinates, setCoordinates] = useState({
    lat: initialCoordinates?.lat || DEFAULT_COORDINATES.lat,
    lng: initialCoordinates?.lng || DEFAULT_COORDINATES.lng,
  });
  const [edit, setEdit] = useState(false);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: ["places"],
  });

  const onChangeLocationInput = (location: SingleValue<Option>) => {
    if (!location) return;
    geocodeByPlaceId(location.value.place_id)
      .then((results) => {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        setCoordinates({ lat, lng });
      })
      .catch((error) => console.error(error));
  };

  const handleSaveLocation = () => {
    onSaveCoordinates(coordinates);
    setEdit(false);
  };

  useEffect(() => {
    const { lat, lng } = initialCoordinates || {};
    if (edit) return;

    if (lat && lng && (lat !== coordinates.lat || lng !== coordinates.lng)) {
      setCoordinates({
        lat,
        lng,
      });
    }
  }, [initialCoordinates, coordinates, edit]);

  if (loadError) {
    return <div>Error al cargar el mapa</div>;
  }

  return (
    <>
      {isLoaded ? (
        <>
          <Container>
            <Row className="mb-3 justify-content-between">
              <Col xs={4} className="text-start">
                <Link
                  to={"/dashboard"}
                  className="link-offset-2 link-underline link-underline-opacity-0 link-dark fs-5"
                >
                  <HiArrowLeft /> Regresar
                </Link>
              </Col>
              <Col xs={4} className="text-end">
                {!edit ? (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => setEdit(true)}
                  >
                    <HiPencilAlt /> Editar Dirección
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        setEdit(false);
                        setCoordinates({
                          lat:
                            initialCoordinates?.lat || DEFAULT_COORDINATES.lat,
                          lng:
                            initialCoordinates?.lng || DEFAULT_COORDINATES.lng,
                        });
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      className="ms-2"
                      onClick={handleSaveLocation}
                    >
                      <HiPencilAlt /> Guardar Dirección
                    </Button>
                  </>
                )}
              </Col>
            </Row>
            {edit && (
              <GooglePlacesAutocomplete
                apiKey={API_KEY}
                selectProps={{
                  placeholder: "Ingresa la dirección",
                  noOptionsMessage: () => "No hay resultados",
                  onChange: onChangeLocationInput,
                  styles: {
                    input: (provided) => ({
                      ...provided,
                      color: "black",
                    }),
                    option: (provided) => ({
                      ...provided,
                      color: "black",
                    }),
                  },
                }}
              />
            )}
            {edit || initialCoordinates.lat || initialCoordinates.lng ? (
              <div
                style={{ height: "80vh", width: "100%" }}
                className="pt-4"
                ref={mapContainerRef}
              >
                <GoogleMap
                  mapContainerStyle={{
                    height: "100%",
                    width: "100%",
                  }}
                  center={coordinates}
                  zoom={15}
                >
                  <MarkerF position={coordinates} />
                </GoogleMap>
              </div>
            ) : (
              <div className="text-center">
                <h5>El vehículo no tiene una dirección</h5>
              </div>
            )}
          </Container>
        </>
      ) : (
        <div>Cargando...</div>
      )}
    </>
  );
};
