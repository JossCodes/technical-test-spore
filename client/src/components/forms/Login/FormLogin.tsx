import { AlertModal } from "@components/modals";
import { useCookieSession } from "@hooks";
import { ModalTypes } from "@interfaces";
import { loginUser } from "@services";
import { getRegExp } from "@utils";
import { AxiosError } from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const defaultErrors = {
  email: "",
  password: "",
};

export const FormLogin = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
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
        const { data } = await loginUser(credentials);
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
        <button type="submit" className="btn btn-primary mx-auto d-block">
          Iniciar sesión
        </button>
        <div className="text-center mt-2">
          ¿No tienes cuenta?
          <Link
            to="/auth/register"
            className="link-underline link-dark d-block mt-1"
          >
            Regístrate
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
