<template>
    <div class="container fluid">
    <div class="title-first">Recipies</div>
  
    <div class="container fluid">
      <div class="container-header">
        <div class="container-title">Available with current items</div>
      </div>
    </div>

    <div class="recipe-list">
      <list-item
          v-for="recipe in recipeList"
          :title="recipe.title"
          :imagesrc="recipe.image_url"
        >
      </list-item>
    </div>

    <pre class="container fluid well box">
      {{ recipies }}
    </pre>
  
    <pre class="container fluid well box">
      {{ recipeList }}
    </pre>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ListItem from './ListItem'

export default {
  name: 'recipies',
  components: {
    ListItem
  },
  mounted () {
    console.log('mounted')
    this.loadRecipeList()
  },
  computed: {
    ...mapGetters(['recipies', 'recipeList'])
  },
  methods: {
    ...mapActions(['loadRecipeList', 'loadRecipe'])
  }
}

</script>

<style scoped lang="scss">
@import '../main.scss';

.recipe-list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  @media (max-width: 767px) {
    justify-content: flex-start;
  }
}

.recipe {
  min-width: 220px;
  max-width: 220px;
  overflow: hidden;
  text-align: center;
  background-color: white;
  border: 1px solid #dedede;
  box-shadow: 0px 1px 1px 0px rgba(132, 132, 132, 0.2);
  font-size: 1rem;
  margin: 0 $medium $medium 0;
  @extend .source-sans;
  color: #404040;

  @media (max-width: 767px) {
    font-size: 0.8rem;
    flex: 1 1 auto;
    min-width: 30%;
  }
}

</style>
