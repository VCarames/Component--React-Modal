# Component--React-Modal

A modal is a user interface element that appears on top of the main content of a webpage without navigating away from the current page. They typically dim or disable interaction with the background content until the modal is addressed. Modals are commonly used for various purposes, such as displaying alerts, confirming actions, or presenting forms for user input.

## Basic Layout

```jsx
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
```

## Close Modal When Overlay Is Clicked

The "Close Modal When Overlay Is Clicked" code allows users to **dismiss** the modal by clicking **outside** of its content area, **specifically** on the overlay.

- The `handleOverlayClick` function is **triggered** when a click event occurs on the modal overlay.

- Inside this function, **a check is performed** to see if the clicked target (the element that triggered the event) **has the class** `modal-overlay`.

- If the check is **true** (indicating that the overlay itself was clicked), the `closeModal` function is invoked to hide the modal.

```jsx
// Function to handle overlay click
const handleOverlayClick = (e) => {
  // Close modal only if the overlay is clicked
  if (e.target.classList.contains("modal-overlay")) {
    closeModal();
  }
};
```

```jsx
import { useState } from "react";

function Modal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle overlay click
  const handleOverlayClick = (e) => {
    // Close modal only if the overlay is clicked
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

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
```
