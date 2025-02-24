import { useContext, createContext, useState } from "react";

const ModalContext = createContext();

function ModalContextProvider({ children }) {
  const [activeModal, setActiveModal] = useState("");

  return (
    <ModalContext.Provider value={{ activeModal, setActiveModal }}>
      {children}
    </ModalContext.Provider>
  );
}

function UseModalContext() {
  return useContext(ModalContext);
}

export { UseModalContext, ModalContextProvider };
