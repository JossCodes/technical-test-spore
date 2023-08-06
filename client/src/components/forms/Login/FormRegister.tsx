import { AlertModal } from "@components/modals";
import { useCookieSession } from "@hooks";
import { ModalTypes } from "@interfaces";
import { registerUser } from "@services";
import { getRegExp } from "@utils";
import { AxiosError } from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const defaultErrors = {
  email: "",
  password: "",
  name: "",
  role: "",
};

export const FormRegister = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
    role: "",
  });
  const [errors, setErrors] = useState(defaultErrors);
  const [activeAlert, setActiveAlert] = useState(false);
  const [alertData, setAlertData] = useState<{
    type: ModalTypes[keyof ModalTypes];
    title: string;
    message: string;
  }>({
    type: "danger",
    title: "",
    message: "",
  });

  const { saveUserSession } = useCookieSession();

  const validCredentials = () => {
    let countErrors = 0;
    const currentErrors = { ...defaultErrors };
    if (!credentials.name) {
      currentErrors.name = "El nombre es requerido";
      countErrors++;
    }
    if (!credentials.email) {
      currentErrors.email = "El correo electrónico es requerido";
      countErrors++;
    } else if (!getRegExp("email").test(credentials.email)) {
      currentErrors.email = "El correo electrónico es inválido";
      countErrors++;
    }
    if (!credentials.password) {
      currentErrors.password = "La contraseña es requerida";
      countErrors++;
    }
    if (!credentials.role) {
      currentErrors.role = "El rol es requerido";
      countErrors++;
    }
    if (countErrors > 0) {
      setErrors(currentErrors);
      return false;
    }
    setErrors(defaultErrors);
    return true;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (validCredentials()) {
      try {
        const { data } = await registerUser(credentials);
        saveUserSession(data.token);
        window.location.reload();
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          setAlertData({
            type: "danger",
            title: "Ocurrió un error",
            message: error.response?.data.error || error.message,
          });
        } else {
          setAlertData({
            type: "danger",
            title: "Ocurrió un error",
            message: "Favor de revisar su conexión e intentar más tarde",
          });
        }
        setActiveAlert(true);
      }
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre
          </label>
          <input
            type="name"
            name="name"
            className="form-control"
            onChange={onChange}
            placeholder="Ej. Juan Pérez"
          />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={onChange}
            placeholder="Ej. micorreo@example.com"
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={onChange}
            placeholder="Tu contraseña"
          />
          {errors.password && (
            <div className="text-danger">{errors.password}</div>
          )}
        </div>
        <div className="mb-3">
          <select
            className="form-select"
            name="role"
            aria-label="Default select example"
            onChange={(e) => {
              setCredentials({
                ...credentials,
                [e.target.name]: e.target.value,
              });
            }}
          >
            <option selected>Selecciona tu rol</option>
            <option value="superuser">Super Usuario</option>
            <option value="user">Usuario regular</option>
          </select>

          {errors.role && <div className="text-danger">{errors.role}</div>}
        </div>
        <button type="submit" className="btn btn-primary mx-auto d-block">
          Regístrarse
        </button>
        <div className="text-center mt-2">
          ¿Ya tienes cuenta?
          <Link
            to="/auth/login"
            className="link-underline link-dark d-block mt-1"
          >
            Inicia sesión
          </Link>
        </div>
      </form>

      <AlertModal
        type={alertData.type}
        title={alertData.title}
        message={alertData.message}
        active={activeAlert}
        onClose={() => setActiveAlert(false)}
      />
    </>
  );
};
