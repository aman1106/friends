import './Alert.css';

const Alert = ({ handleClose, show, message }) => {
  const showHideClassName = show ? "alert show" : "alert hide";

  return (
    <div className={showHideClassName}>
        {message}
        <span className="right pointer" onClick={handleClose}>x</span>
    </div>
  );
};

export default Alert;
