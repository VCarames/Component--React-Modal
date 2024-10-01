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

## Close Modal When Users Press The “ESC” Key

**Keydown Event Handler:**

- The `handleKeyDown` function **checks** if the pressed key is "Escape". If it is, it calls the `closeModal` function to close the modal.

**Effect Hook for Event Listener:**

- The `useEffect` hook is used to **add or remove** the keydown event listener **based** on the modal's open state (`isModalOpen`).

- When the **modal is opened** (`isModalOpen` is `true`), the event listener is **added** to the `window` object to listen for keydown events.

- When the **modal is closed** (`isModalOpen` is false), the event listener is **removed**.

- The cleanup function **ensures** that the event listener is removed if the component unmounts or if the modal state changes.

```jsx
import { useEffect } from "react";

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
```

```jsx
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
```
