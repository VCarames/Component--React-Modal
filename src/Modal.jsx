import { useState, useEffect } from "react";

function Modal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
    // If the modal is not open, do not run the following code
    if (!isModalOpen) return;

    // Select the modal content to manage focus
    const modal = document.querySelector(".modal-content");

    // Select all focusable elements within the modal
    const focusableElements =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    const firstFocusableElement = modal.querySelectorAll(focusableElements)[0];
    const focusableContent = modal.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    // Handle focus trapping within the modal
    const handleFocusTrap = (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          // If Shift + Tab is pressed and focus is on the first element, loop to last element
          if (document.activeElement === firstFocusableElement) {
            e.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          // If Tab is pressed and focus is on the last element, loop to first element
          if (document.activeElement === lastFocusableElement) {
            e.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keydown", handleFocusTrap); // Add event listener for focus trapping
    document.body.style.overflow = "hidden";

    // Focus the first focusable element when the modal opens
    firstFocusableElement.focus();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keydown", handleFocusTrap); // Clean up focus trap listener
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <div>
      <button onClick={openModal} className="modal-button">
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
