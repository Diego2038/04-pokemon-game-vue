import pokemonApi from "@/api/pokemonApi"
 

export const getPokemons = () => {
  const Pokemons = Array.from( Array(650) )
  return Pokemons.map( (_, index) => index + 1)
}

const getPokemonOptions = async () => {
  // return getPokemons()
  const mixedPokemons = getPokemons().sort( () => Math.random( ) - 0.5);
  // console.log( mixedPokemons);
  const pokemons = await getPokemonsNames( mixedPokemons.splice(0,4));
  // console.table(pokemons);
  return pokemons;
}

export const getPokemonsNames = async ([a,b,c,d] = [] ) => {
  // pokemonApi.get(`/${a}`)
  //   .then( resp => {
  //     const { name } = resp.data
  //     console.log( resp.data )
  //     console.log( name )
  //   })

  // console.log(a,b,c,d)
  // Se disparan 4 promesas a la vez
  const promiseArr = [
    pokemonApi.get(`/${ a }`),
    pokemonApi.get(`/${ b }`),
    pokemonApi.get(`/${ c }`),
    pokemonApi.get(`/${ d }`),
  ];

  const [p1,p2,p3,p4] = await Promise.all( promiseArr )
    // .then(  resp => { // Se puede obviar, con Promise.all lo ejecuta por defecto
    //   return resp
    // })
  
  return [
    { name : p1.data.name, id : p1.data.id},
    { name : p2.data.name, id : p2.data.id},
    { name : p3.data.name, id : p3.data.id},
    { name : p4.data.name, id : p4.data.id},
  ]

}

export default getPokemonOptions