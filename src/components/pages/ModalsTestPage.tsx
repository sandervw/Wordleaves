import { useState } from "react";

const ModalsTestPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);

  return (
    <main className="page container">
      <h1 className="page-title">Modal Testing Page</h1>
      <p className="page-meta">Test the three modal style variants</p>

      <div className="display-flex-column gap-large">
        <div className="container padding-large">
          <h2 className="page-title">1. Basic Modal</h2>
          <p>Centered modal with fixed positioning</p>
          <button
            className="btn-color margin-medium"
            onClick={() => setShowModal(!showModal)}
          >
            Toggle Basic Modal
          </button>
          {showModal && (
            <div className="modal">
              <h3 className="page-title">Basic Modal</h3>
              <p>This is a centered modal using .modal class</p>
              <button className="btn" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          )}
        </div>

        <div className="container padding-large">
          <h2 className="page-title">2. Modal with Backdrop</h2>
          <p>Semi-transparent overlay behind modal</p>
          <button
            className="btn-color margin-medium"
            onClick={() => setShowBackdrop(!showBackdrop)}
          >
            Toggle Backdrop Modal
          </button>
          {showBackdrop && (
            <>
              <div
                className="modal-backdrop"
                onClick={() => setShowBackdrop(false)}
              />
              <div className="modal">
                <h3 className="page-title">Modal with Backdrop</h3>
                <p>Click the dark backdrop to close this modal</p>
                <button className="btn" onClick={() => setShowBackdrop(false)}>
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default ModalsTestPage;
