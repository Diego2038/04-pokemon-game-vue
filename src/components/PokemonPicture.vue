<template>
  <div class="pokemon-container">
    <img :src="imgSrc" alt="Pokemon misterioso" id-test="img-hidden" class="hidden-pokemon" v-if="!showPokemon">
    <img :src="imgSrc" alt="Pokemon revelado" id-test="img-shown" class="fade-in" v-if="showPokemon">
  </div>
  
</template>

<script>
export default {
  name: 'pokemonPicture',
  props : {
    pokemonId : {
      required : true,
      type : Number
    },
    showPokemon : {
      required : true,
      type : Boolean,
      default : false
    }
  },
  computed : {
    imgSrc() {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonId}.svg`
    }
  }
}
</script>
  
<style scoped>
.pokemon-container {
    height: 200px;
}
img {
    height: 200px; 
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
}
.hidden-pokemon {
    filter: brightness(0);
}
</style>