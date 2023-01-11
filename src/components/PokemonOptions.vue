<template>
  <div class="options-container">
    <ul>
      <li v-for="pokemon in pokemonsArray" 
      :key="pokemon.id"
      @click="$emit( 'selection', pokemon, 'dos', 'tres' )" > <!-- Puedes enviar más de un argumento -->
        {{pokemon.name}}
      </li>
    </ul>
  </div>
</template>

<script>
// selection es el nombre del evento que emites, el padre lo recibe y lo consume de ser necesario
export default {
  name: 'pokemonOptions',
  props : {
    pokemonsArray : {
      type : Array,
      required : true
    }
  }
}
</script>

<style scoped>
ul {
    list-style-type: none;
}
li {
    background-color: white;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
    margin-bottom: 10px;
    width: 250px;
}

li:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.options-container {
    display: flex;
    justify-content: center;
}
</style>