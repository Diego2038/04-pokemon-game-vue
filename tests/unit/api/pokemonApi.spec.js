import pokemonApi from "@/api/pokemonApi"
import { shallowMount } from "@vue/test-utils"

describe('Pokemon API', () => {
  test('Axios debe de estar configurado con el API de Pokemon', () => {
    // console.log( pokemonApi.defaults.baseURL ) // IMPORTANTE: Cualquier cosa que no entiendes, sólo necesitas imprimirlo para conocer su composición, y actuar entorno a ello
    expect( pokemonApi.defaults.baseURL ).toBe('https://pokeapi.co/api/v2/pokemon')
  })
})