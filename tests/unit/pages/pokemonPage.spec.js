import { shallowMount, mount } from "@vue/test-utils";
import  PokemonPage  from "@/pages/PokemonPage";
import  {pokemons } from "../mocks/pokemons.mock"

describe('PokemonPage Component', () => {

  let wrapper
  let getPokemonsMixedSpy
  beforeEach(() => {
    getPokemonsMixedSpy = jest.spyOn( PokemonPage.methods, 'getPokemonsMixed')
    
    wrapper = shallowMount( PokemonPage )

    // jest.clearAllMocks() // Para reiniciar todos los componentes de las pruebas, y así no hayan inconsistencias. OJO, pero si inicializas el spy en beforeEach, no podrás limpiar todos los mocks
  })
  
  test('Debe de hacer match con la snapshot', () => {
    console.log( PokemonPage.methods )
    expect( wrapper.html() ).toMatchSnapshot()
  })

  test('Debe de llamar mixPokemonArray al montarse el componente', () => {
    // Se debe de insertar el espía antes que se dispare el evento para que pueda escucharlo, sino, no podrá escucharlo cuando se dispare. Por eso se puso al comienzo antes del wrapper
    expect( getPokemonsMixedSpy ).toHaveBeenCalled()
  })

  test('Debe de hacer match con el Snapshot cuando cargan todos los pokemones', () => {
    // OJO: La diferencia entre el shallowMount y el mount, es que el shallowMount va a montar el componente sútilmente, simplificando mucha de sus partes y obviando otras para que sea lo más ligero posible. Mientras que el mount lo levanta como si estuviera montado en verdad, ejecutando como si fuera producción. Desde luego ambos son excelentes dependiendo del contexto
    const wrapper = shallowMount( PokemonPage, {
      data() {
        return {
          pokemonArr : pokemons,
          pokemon : pokemons[2],
          showPokemon : false,
          message : '',
          showAnswer : false
        }
      }
    })

    // console.log( wrapper.html())
    expect( wrapper.html()).toMatchSnapshot()

  })

  test('Debe de mostrar los componentes de PokemonPicture y PokemonOptions', () => {

    const wrapper = shallowMount( PokemonPage, {
      data() {
        return {
          pokemonArr : pokemons,
          pokemon : pokemons[2], // id = 3
          showPokemon : false,
          message : '',
          showAnswer : false
        }
      }
    })

    // NOTA: con shallowMounted dichos componentes están "hechos a medias", y sus nombres tienen agregados 'stub' y separado con -
    const pokemonPicture = wrapper.find('pokemon-picture-stub') 
    const pokemonOptions = wrapper.find('pokemon-options-stub') 

    // PokemonPicture debe de existir 
    expect( pokemonPicture.exists() ).toBeTruthy()
    // PokemonOptions debe de existir
    expect( pokemonOptions.exists() ).toBeTruthy()

    // Pokemon picture attribute pokemonId === 3
    // console.log( wrapper.html()) // Vital para saber cómo hacer estas especificaciones
    expect( pokemonPicture.attributes('pokemonid')).toBe("3")

    // PokemonOptions attribute pokemons toBe true
    // console.log( pokemonOptions.attributes('pokemonsarray') )
    // expect( pokemonOptions.attributes('pokemonsarray') ).not.toEqual(undefined) 
    expect( pokemonOptions.attributes('pokemonsarray') ).toBeTruthy() 

  })

  test('pruebas con checkAnswer', async () => {
    const wrapper = shallowMount( PokemonPage, {
      data() {
        return {
          pokemonArr : pokemons,
          pokemon : pokemons[2], // id = 3
          showPokemon : false,
          message : '',
          showAnswer : false
        }
      }
    }) 

    await wrapper.vm.checkAnswer( {pokemon: pokemons[2] , uno: 'uno', dos: 'dos'} )
    // console.log( wrapper.html() )

    expect( wrapper.find('h3').exists()).toBeTruthy()

    expect( wrapper.vm.showPokemon ).toBeTruthy()

    expect( wrapper.find('h3').text()).toBe(`Felicidades, acertaste, es ${pokemons[2].name}`)

    await wrapper.vm.checkAnswer( {pokemon: pokemons[0]} )

    expect( wrapper.vm.message).toBe('No es el pokemon correcto')

  })




})