import { useEffect } from "react";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button 
          className="modal-close-button" 
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          ×
        </button>
        <div className="modal-body">
          <h2 className="modal-title">¡Gracias por acompañarnos! ❤️</h2>
          <p className="modal-text">
            Para poder mantener el proyecto y seguir mejorando, desde el <strong>1ero de diciembre</strong>, dejaremos de ofrecer la versión gratuita.
          </p>
          <p className="modal-text">
            Puedes continuar con todas las funciones actualizando tu plan.
          </p>
          <button 
            className="button modal-button" 
            onClick={onClose}
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

