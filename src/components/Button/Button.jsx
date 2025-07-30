import "./Button.css"

function Button({label, id, onclick}) {
  return (
    <button id={id} onClick={onclick}>{label}</button>
  );
}

export default Button;