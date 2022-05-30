import { useState, useEffect, createContext } from 'react'
import axios from 'axios'

const BebidasContext = createContext()

const BebidasProvider = ({children}) =>{
  const [bebidas, setBebidas] = useState([])
  const [modal, setModal] = useState(false)
  const [bebidaId, setBebidaId] = useState(null)
  const [receta, setReceta] = useState({})
  const [cargando, setCargando] = useState(false)
  const [favourites, setFavourites] = useState(
    localStorage.getItem('favouriteDrinks') ? JSON.parse(localStorage.getItem('favouriteDrinks')) : []
  )
  const [isFavourite, setIsFavourite] = useState(false)
  const [verFavoritos, setVerFavoritos] = useState(false)

  const consultarBebida = async (datos) =>{
    setBebidas([])
    setVerFavoritos(false)
    try {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`
      const { data } = await axios(url)
      setBebidas(data.drinks);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setCargando(true)
    const obtenerReceta = async ()=>{
      if(!bebidaId) return

      try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`
        const { data } = await axios(url)
        setReceta(data.drinks[0]);
        setIsFavourite(favourites.some(bebida => bebida.idDrink === bebidaId));
      } catch (error) {
        console.log(error);
      } finally{
        setCargando(false)
      }
    }
    obtenerReceta()
  }, [bebidaId])

  useEffect(() => {
    const favoritos = () => {
      if(isFavourite){
        if(!favourites.some(bebida => bebida.idDrink === bebidaId))
          setFavourites([...favourites, receta])
      }
      else {
        const favoritos = favourites.filter( favorito => favorito.idDrink !== bebidaId)
        setFavourites(favoritos)
      }
    }
    favoritos()
  }, [isFavourite])

  useEffect(() => {
    localStorage.setItem('favouriteDrinks', JSON.stringify(favourites) ?? []);
  }, [favourites])

  useEffect(() => {
    const listarFavoritos = () =>{
      if(verFavoritos)
        setBebidas(favourites)
    }
    listarFavoritos()
  }, [verFavoritos, favourites])
  
  
  const handleBebidaIdClick = id =>{
    setBebidaId(id)
  }

  const handleModalClick = () =>{
    setModal(!modal)
  }

  const handleAddFavourite = () =>{
    setIsFavourite(!isFavourite)
  }

  const handleMostrarFavoritos = () =>{
    setVerFavoritos(!verFavoritos)
  } 

  return(
    <BebidasContext.Provider
      value={{
        consultarBebida,
        bebidas,
        handleModalClick,
        modal,
        handleBebidaIdClick,
        receta,
        cargando,
        handleAddFavourite,
        isFavourite,
        favourites,
        handleMostrarFavoritos
      }}
    >
      {children}
    </BebidasContext.Provider>
  )
}

export {
  BebidasProvider
}

export default BebidasContext