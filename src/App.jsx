import Header from './components/Header/Header.jsx'
import Configurator from './components/Configurator/Configurator.jsx'
import './App.css'

function App() {

  return (
    <>
      <Header />
      <div className='split-view'>
        <div>
          {/* Preview */}
        </div>
        <div>
          <Configurator />
        </div>
      </div>
    </>
  )
}

export default App
