import { Container, Button } from 'react-bootstrap'
import Formulario from './Formulario'
import ListadoBebidas from './ListadoBebidas'
import ModalBebida from './ModalBebida'
import useBebidas from '../hooks/useBebidas'

const AppBebidas = () => {
  const { favourites, handleMostrarFavoritos } = useBebidas()

  return (
    <>
      <header className="py-5">
          <h1>Buscador de Bebidas</h1>
        </header>

        <Container className='mt-5'>
          <div className="mb-5">
            <Button 
              variant='danger'
              disabled={ !favourites.length }
              onClick={handleMostrarFavoritos}
            >
              { !favourites.length ?  'No hay Favoritos' :  'Ver Favoritos'}
            </Button>
          </div>
          <Formulario />

          <ListadoBebidas />

          <ModalBebida />
        </Container>
    </>
  )
}

export default AppBebidas