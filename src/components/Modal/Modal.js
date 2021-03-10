import './Modal.css';

const Modal = ({ handleClose, show, deleteItem, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button className="button danger" type="button" onClick={deleteItem}>
          Delete
        </button>
        <button className="button" type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal;
