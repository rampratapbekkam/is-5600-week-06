const Button = ({ text, handleClick, disabled = false }) => {
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`f6 link dim ph3 pv2 mb2 dib white bg-black ma2 ${
        disabled ? 'o-50 not-allowed' : 'pointer'
      }`}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      {text}
    </button>
  );
};

export default Button;