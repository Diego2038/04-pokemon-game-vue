import { shallowMount } from "@vue/test-utils";
import PokemonOptions from "@/components/PokemonOptions.vue";
import { pokemons } from "../mocks/pokemons.mock";

describe("PokemonOptions component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonOptions, {
      props: {
        pokemonsArray: pokemons,
      },
    });
  });

  test("Debe de hacer Match con el snapshot", () => {
    // console.log( wrapper.html() )
    expect(wrapper.html()).toMatchSnapshot();

    // Con esta no generas un archivo snapshot, pero es más sensible al cambio
    expect(wrapper.html()).toMatchInlineSnapshot(`
      <div class="options-container">
        <ul>
          <li>
            <!-- Puedes enviar más de un argumento --> bulbasaur
          </li>
          <li>
            <!-- Puedes enviar más de un argumento --> ivysaur
          </li>
          <li>
            <!-- Puedes enviar más de un argumento --> venusaur
          </li>
          <li>
            <!-- Puedes enviar más de un argumento --> charmander
          </li>
        </ul>
      </div>
    `);
  });

  test("Debe de mostrar las 4 opciones correctas", () => {
    // Que existan 4 li como opciones
    const liArrays = wrapper.findAll("li");
    expect(liArrays.length).toBe(4);

    // cada li debe de tener su nombre del pokemon
    for (let i = 0; i < liArrays.length; i++) {
      expect(liArrays[i].text()).toBe(pokemons[i].name);
    }
  });

  test('Debe emitir "selection" con sus respectivos parámetros al hacer click', () => {
    const [l1, l2, l3, l4] = wrapper.findAll("li");

    l1.trigger("click"); 
    l2.trigger("click"); 
    l3.trigger("click"); 
    l4.trigger("click"); 

    // console.log(wrapper.emitted("selection")); // Nótese que retorna un arreglo de todos los parámetros que retorna el emit
    expect( wrapper.emitted('selection').length ).toBe(4)

    expect( wrapper.emitted('selection')[0] ).toEqual( [{ name: 'bulbasaur', id: 1 }, 'dos', 'tres']) // OJO, agregué intencionalmente el componente 'dos' y 'tres' para "practicar" que la emisión de eventos se pueden agregar más de un parámetro (tantos como uno quiera)
    expect( wrapper.emitted('selection')[1] ).toEqual( [{ name: 'ivysaur', id: 2 }, 'dos', 'tres'])
    expect( wrapper.emitted('selection')[2] ).toEqual( [{ name: 'venusaur', id: 3 }, 'dos', 'tres'])
    expect( wrapper.emitted('selection')[3] ).toEqual( [{ name: 'charmander', id: 4 }, 'dos', 'tres'])
    

  });
});
