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

## Disable Scroll On The Body When Modal Is Open

**Disable Scroll:**

- When the **modal is opened**, `document.body.style.overflow` is set to `"hidden"`, which prevents the body from scrolling.
  When the **modal is closed**, `document.body.style.overflow` is reset to `""` to re-enable scrolling.

**Cleanup on Unmount:**

- In the cleanup function of the `useEffect`, we **ensure** that the body scroll is re-enabled even if the modal closes while the component is unmounted.

```jsx
useEffect(() => {
  if (isModalOpen) {
    document.body.style.overflow = "hidden"; // Disable body scroll when modal is open
  } else {
    document.body.style.overflow = ""; // Re-enable body scroll when modal is closed
  }

  return () => {
    document.body.style.overflow = ""; // Ensure scroll is re-enabled on cleanup
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

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Disable body scroll when modal is open
    } else {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = ""; // Re-enable body scroll when modal is closed
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = ""; // Ensure scroll is re-enabled on cleanup
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

## Trap The Focus Within The Modal And Automatically Focus On The First Focusable Element When The Modal Is Opened

**Identify Focusable Elements:** Common focusable elements include buttons, input fields, and links.

- A `handleFocusTrap` function is created to manage focus within the modal:

- When the `"Tab"` key is pressed, it **checks** if the user is navigating backward (with "Shift + Tab") or forward.

- If the **first focusable element is currently active** and the user tries to navigate backward, the **focus is shifted** to the **last** focusable element.

- Conversely, if the **last focusable element is active** and the user tries to navigate forward, the **focus wraps around** to the **first** focusable element.

- This ensures that users **cannot tab out of the modal**, keeping them focused within its bounds.

```jsx
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
```

## Focus Returns To The Button That Opened The Modal

- **Storing a reference** to the button that opens the modal using `useRef`.
- Setting the focus **back** to that button when the modal is closed.

**Added useRef for Button Reference:**

- A `useRef` hook is used to **create a reference** (`openModalButtonRef`) for the button that opens the modal.

```jsx
import { useRef } from "react";
const openModalButtonRef = useRef(null); // Reference for the button that opens the modal
```

**Focus on the Button When Modal Closes:**

- In the `closeModal` function, after updating the modal's open state, the **focus is returned** to the button using `openModalButtonRef.current.focus()`.

```jsx
const closeModal = () => {
  setIsModalOpen(false);
  openModalButtonRef.current.focus(); // Set focus back to the open modal button
};
```

**Set the Reference to the Button:**

- The `ref` attribute is **added** to the button element to link it with the reference.

```jsx
<button
  onClick={openModal}
  className="modal-button"
  ref={openModalButtonRef} // Attach the ref to the button
>
  Open Modal
</button>
```

```jsx
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
```
