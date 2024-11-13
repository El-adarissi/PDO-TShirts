/* eslint-disable react/prop-types */
import './dialog.css'; 

const DialogOneProducts = ({ message, onClose }) => {
  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
        <button className="dialog-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DialogOneProducts;
