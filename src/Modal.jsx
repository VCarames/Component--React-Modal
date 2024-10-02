import { useState, useEffect, useRef } from "react";

function Modal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModalButtonRef = useRef(null); // Reference for the button that opens the modal

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    openModalButtonRef.current.focus(); // Set focus back to the open modal button
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    if (!isModalOpen) return;

    const modal = document.querySelector(".modal-content");
    const focusableElements =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const firstFocusableElement = modal.querySelectorAll(focusableElements)[0];
    const focusableContent = modal.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    const handleFocusTrap = (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            e.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            e.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keydown", handleFocusTrap);
    document.body.style.overflow = "hidden";

    firstFocusableElement.focus();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keydown", handleFocusTrap);
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <div>
      <button
        onClick={openModal}
        className="modal-button"
        ref={openModalButtonRef} // Attach the ref to the button
      >
        Open Modal
      </button>

      {isModalOpen && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-heading"
          onClick={handleOverlayClick}
        >
          <div className="modal-content">
            <h2 className="modal-heading" id="modal-heading">
              Modal Heading
            </h2>
            <p className="modal-paragraph">
              This is a sample paragraph inside the modal. You can add any
              content here.
            </p>
            <button onClick={closeModal} className="close-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
