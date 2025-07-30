import './InputBox.css'

function Input({label, id}) {
  return (
    <div className="input-group">
      <label className="label">{label}</label>
      <input autoComplete="off" name={label} id={id} className="input" />
      <div /></div>
  );
}

export default Input;
