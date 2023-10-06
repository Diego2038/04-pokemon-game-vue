<template>
  <div v-if="!pokemon">
    <h1>Por favor espere...</h1>
  </div>
  <div v-else class="fade-in">
    <h1>¿Quién es este Pokemon?</h1>
    <PokemonPicture :pokemonId=" pokemon.id " :showPokemon="showPokemon"></PokemonPicture>
    <PokemonOptions :pokemonsArray="pokemonArr"
      @selection="checkAnswer"> <!-- También lo puedes poner sin el parámetro, pero lo pongo para que sepas lo que significa-->
    </PokemonOptions>
    <!-- OJO: Habías probado trasladar los datos por medio de una función, pero las promesas no se resolvían. En cambio, cuando los trasladabas con una data, tiene todo el tiempo del mundo para esperar y actualizarse, por lo tanto con ello sí se actualizaba de manera idónea-->

    <template v-if="showAnswer" class="fade-in">
      <h3> {{message}}</h3>
      <button @click="newGame">
        Nuevo juego
      </button>
    </template>

  </div>
  
</template>

<script>
import PokemonOptions from '@/components/PokemonOptions.vue'
import PokemonPicture from '@/components/PokemonPicture.vue'
import getPokemonsOptions from '@/helpers/getPokemonOptions'


export default {
  name : 'pokemon-component',
  components : {
    PokemonOptions,
    PokemonPicture
  },
  data() {
    return {
      pokemonArr : [],
      pokemon : null,
      showPokemon : false,
      message : '',
      showAnswer : false
    }
  },
  methods : {
    async getPokemonsMixed() {
      // console.log(getPokemonsOptions())
      // return await getPokemonsOptions()
      this.pokemonArr = await getPokemonsOptions()
      // console.log(this.pokemonArr)
      const randInt = Math.floor( Math.random() * 4  )
      
      this.pokemon = this.pokemonArr[ randInt ]
    },

    checkAnswer({pokemon}) { // pokemonxD es lo que retorna el evento, definido en el componente hijo (y en el primer parámetro si llegaras a ponerlo)
      // console.log('Pokemon page llamado', pokemonxD.name, pokemonxD.id)
      // console.log( pokemonxD, otro, otroMas) 

      if( this.pokemon.id !== pokemon.id ){
        this.message = 'No es el pokemon correcto'
      } else {
        this.message = `Felicidades, acertaste, es ${pokemon.name}`
        this.showPokemon = true
      }
      this.showAnswer = true

      console.log('visto', pokemon.name, this.showPokemon )
    },

    async newGame () {
      this.pokemonArr = [],
      this.pokemon = null,
      this.showPokemon = false,
      this.message = '',
      this.showAnswer = false 
      await this.getPokemonsMixed()

      // Agregué un llamado retartado debido a que, por algún motivo, al hacer el llamado a la API pokemon no se actualizaba. Correción: El error estaba en Math.round, se cambió a Math.floor para que no genere un número 4 para un índice de sólo 4 objetos
      setTimeout(async () => {
        if ( !this.pokemon ){
          await this.getPokemonsMixed()
        }
      }, 2500)
      
      // this.updateComponente()
    },

    // updateComponente() {
    //   setTimeout(() => {
    //     if( !!pokemon) {
    //       this.newGame()
    //     }
    //   },1000)
      
    // }
  },
  mounted() {
    this.getPokemonsMixed()
  }
}
</script>

<style>

</style>