import { useState } from "react";

import { useCookieSession } from "@hooks";

import { RxCross1 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";

const SideBarContent = () => {
  const { onCloseSession } = useCookieSession();
  const handleLogout = () => {
    onCloseSession();
    window.location.reload();
  };
  return (
    <div style={{ minHeight: "100vh" }} className="pt-3 position-relative">
      <div className="text-center">
        <h2>Vehicles Hub</h2>
      </div>
      <div className="p-4 p-md-0">
        <ul style={{ listStyle: "none" }} className="m-0 p-0">
          <li className="mt-5">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="d-md-none" style={{ padding: "2em" }}></div>
      <div
        className="fs-1 position-fixed top-0 start-0 d-md-none bg-light w-100 pb-2 pe-4"
        style={{
          cursor: "pointer",
          transition: "all .3s",
          zIndex: 1000,
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-end">
          {isOpen ? <RxCross1 /> : <GiHamburgerMenu />}
        </div>
      </div>
      <div
        className={`${
          !isOpen
            ? "d-none"
            : "position-fixed top-0 bottom-0 end-0 start-0 bg-light"
        } d-md-none`}
        style={{ transition: "all .3s" }}
      >
        <SideBarContent />
      </div>
      <div className="d-none d-md-block bg-light px-3 position-fixed">
        <SideBarContent />
      </div>
    </>
  );
};
