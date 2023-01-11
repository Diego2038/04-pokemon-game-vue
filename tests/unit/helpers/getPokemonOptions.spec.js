import getPokemonsOptions, { getPokemons, getPokemonsNames } from "@/helpers/getPokemonOptions";


// IMPORTANTE: Cuando hagas pruebas, empieza siempre desde las más fáciles e independientes, hasta las más complejas y dependientes


describe('getPokemonOptions helpers', () => { 
  test('Debe de regresar un arreglo de números', () => { 
    // console.log( getPokemons() )
    expect( getPokemons().length ).toBe(650)
    expect( typeof( getPokemons()[Math.round( Math.random() * 650 ) ] ) ).toBe('number')
  })

  test('Debe de retornar un arreglo con 4 elementos con nombres de pokemon', async () => {
    const pokemons = await getPokemonsNames([1,2,3,4])
    // console.log( pokemons )
    expect( pokemons).toStrictEqual( [ // Para comparar objetos entre sí
    // LEE LOS ERRORES, CARAJO
      { name: 'bulbasaur', id: 1 },
      { name: 'ivysaur', id: 2 },
      { name: 'venusaur', id: 3 },
      { name: 'charmander', id: 4 }
    ])
  })

  test('getPokemonsOption debe de retornar un arreglo mezclado', async () => {
    const pokemons = await getPokemonsOptions()
    console.log( pokemons )
    expect( pokemons.length ).toBe(4)

    expect( pokemons ).toEqual([
      { 
        name: expect.any(String), 
        id: expect.any(Number) 
      },
      { 
        name: expect.any(String), 
        id: expect.any(Number) 
      },
      { 
        name: expect.any(String), 
        id: expect.any(Number) 
      },
      { 
        name: expect.any(String), 
        id: expect.any(Number)
       }
    ])
  })
})