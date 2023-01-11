import App from '@/App.vue'
import { shallowMount } from '@vue/test-utils'

const wrapper = shallowMount( App );

describe( 'Componente App.vue', () => {
  test('App debe hacer match son el snapshot', () => {
    // console.log( wrapper.html() );
    expect( wrapper.html() ).toMatchSnapshot();
  })
})