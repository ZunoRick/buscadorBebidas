import AppBebidas from './components/AppBebidas'
import { CategoriasProvider } from './context/CategoriasProvider'
import { BebidasProvider } from './context/BebidasProvider'

function App() {
  return(
    <CategoriasProvider>
      <BebidasProvider>
        <AppBebidas/>
      </BebidasProvider>
    </CategoriasProvider>
  )
}

export default App
