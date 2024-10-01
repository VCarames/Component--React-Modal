import { useState } from "react";

function Modal() {
  // Define state to control modal visibility using useState
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Button to open the modal */}
      <button onClick={openModal} className="modal-button">
        Open Modal
      </button>

      {/* Modal structure, conditionally rendered based on state */}
      {isModalOpen && (
        <div
          className="modal-overlay"
          aria-modal="true" // Indicates that the modal is modal, preventing interaction with the rest of the page
          role="dialog" // Informs assistive technologies that this is a dialog/modal
          aria-labelledby="modal-heading" // Associates the modal with its heading for screen readers
        >
          <div className="modal-content">
            {/* Modal heading */}
            <h2 className="modal-heading" id="modal-heading">
              Modal Heading
            </h2>
            {/* Sample paragraph */}
            <p className="modal-paragraph">
              This is a sample paragraph inside the modal. You can add any
              content here.
            </p>
            {/* Button to close the modal */}
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
