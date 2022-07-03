import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ show, onClose, children, title }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className="StyledModalOverlay">
      <div className="StyledModal">
        <div className="StyledModalHeader">
          <a href="#" onClick={handleCloseClick}>
            x
          </a>
        </div>
        {title && <StyledModalTitle>{title}</StyledModalTitle>}
        <div className="StyledModalBody">{children}</div>
      </div>
      <style jsx global>{`
        .StyledModalBody {
          padding-top: 10px;
        }

        .StyledModalHeader {
          display: flex;
          justify-content: flex-end;
          font-size: 25px;
        }

        .StyledModal {
          background: white;
          box-shadow: 5px 5px 50px 20px #cdcdcd6b;
          width: 100%;
          max-width: 800px;
          border-radius: 15px;
          padding: 15px;
        }
        .StyledModalOverlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(236, 236, 236, 0.3);
        }
      `}</style>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root')
    );
  } else {
    return null;
  }
};

export default Modal;
