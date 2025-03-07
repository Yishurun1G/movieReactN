import { createContext, useState, useContext, useEffect} from "react";  

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

/*provide state to any of the components that are wrapped around it*/
export const MovieProvider = ({childern}) => {
    const [favourites, setFavourites] = useState([  ])

 useEffect(() => {
         const storedFavs = localStorage.getItem(favourites)
       
         if (storedFavs) setFavourites(JSON.parse(storedFavs))
 }, [])

  useEffect(() => {
localStorage.setItem('favouritrs', JSON.stringify(favourites))
   }, [favourites])

   const addToFavourites =(movie) =>{
    setFavourites(prev =>[...prev,movie] )

   }
   const removeFromFavourites =(movieId) => 
{
    setFavourites(prev =>prev .filter(movie => movie.id!==movieId))
}

const isFavourite =(movieId) => {
    return favourites.some(movie => movie.id === movieId)
}
 
 const value ={
    favourites,
    addToFavourites,
    removeFromFavourites,
    isFavourite
 }
 
 return <MovieContext.Provider value={value}>
          {childern}
       </MovieContext.Provider>
}
