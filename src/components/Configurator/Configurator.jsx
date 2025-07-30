import Button from '../Button/Button.jsx'
import "./Configurator.css"

const Configurator = () => {
  return (
    <div className='configurator'>
        <h2>Choose a Tribe</h2>
        <p>You can choose from any of the ten dragon tribes within the books.</p>
        <div className="action-row">
            <Button label="← Back" />
            <Button label="🎲 Randomize" />
            <Button label="Next →" />
        </div>
    </div>
  );
}

export default Configurator;