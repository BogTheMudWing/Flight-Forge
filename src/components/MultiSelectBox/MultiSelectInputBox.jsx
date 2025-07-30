import './MultiSelectBox.css'

function MultiSelect({label, id}) {
  return (
    <div className="input-group">
      <label className="label">{label}</label>
      <input autoComplete="off" name={label} id={id} className="input" />
      <div /></div>
  );
}

export default MultiSelect;
