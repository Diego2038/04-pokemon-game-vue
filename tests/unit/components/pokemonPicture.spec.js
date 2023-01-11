import { shallowMount } from "@vue/test-utils";
import PokemonPicture  from '@/components/pokemonPicture.vue'

describe('pokemonPicture component', () => {
  

  test(' Debe de hacer match con el snapshot', () => {
    const wrapper = shallowMount( PokemonPicture, {
      props : {
        pokemonId : 1,
        showPokemon : false
      }
    });

    expect( wrapper.html() ).toMatchSnapshot();
  })

  test(' Debe de mostrar la imagen oculta y el pokemon 100', () => {
    const wrapper = shallowMount( PokemonPicture, {
      props : {
        pokemonId : 100,
        showPokemon : false
      }
    })
    const imgHidden = wrapper.find('[id-test="img-hidden"]')
    // console.log( imgHidden )
    
    // console.log( wrapper.vm.pokemonId ) // Para ver las propiedades del props
    // console.log( wrapper.vm.imgSrc)
    // console.log( imgHidden.classes() ) // Para definir si tiene la clase hidden-pokemon
    // console.log( imgHidden.attributes('src'))

    expect( imgHidden.exists() ).toBeTruthy()

    expect( imgHidden.classes('hidden-pokemon')).toBeTruthy()

    expect( wrapper.vm.pokemonId ).toBe(100)

    expect( imgHidden.attributes('src')).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg')

    expect( wrapper.vm.imgSrc ).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg')

    




  })

  test('Debe de mostrar el pokemon si showPokemon = true ', () => {
    const wrapper = shallowMount( PokemonPicture, {
      props : {
        pokemonId : 1,
        showPokemon : true
      }
    })

    const imgHidden = wrapper.find('[id-test="img-hidden"]')
    const imgShown = wrapper.find('[id-test="img-shown"]')

    expect( imgHidden.exists() ).toBeFalsy()

    expect( imgShown.exists() ).toBeTruthy()

  })
})