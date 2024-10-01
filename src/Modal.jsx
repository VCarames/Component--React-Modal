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

  // Function to handle keydown event
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      // Check if the pressed key is "Escape"
      closeModal(); // Close the modal
    }
  };

  // Effect to add/remove the keydown event listener
  useEffect(() => {
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown); // Add listener when modal is open
    } else {
      window.removeEventListener("keydown", handleKeyDown); // Remove listener when modal is closed
    }

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
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
          onClick={handleOverlayClick} // Close modal on overlay click
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
