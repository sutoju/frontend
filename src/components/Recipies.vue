<template>
    <div class="container fluid">
      <div class="title-first">Recipes</div>
  
      <div class="container fluid">
        <div class="container-header">
          <div class="container-title">Available with current items</div>
        </div>

      <div class="recipe-list">
        <list-item
            v-if="recipe.title !== 'All Recipes'"
            v-for="recipe in recipeList"
            :title="recipe.title"
            :link="/recipe/ + recipe.recipe_id"
            :imagesrc="recipe.image_url"
          >
        </list-item>
      </div>
    </div>

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
    this.setLoadingSomething(true)
    this.loadRecipeList()
      .then(() => this.setLoadingSomething(false))
  },
  computed: {
    ...mapGetters(['recipies', 'recipeList'])
  },
  methods: {
    ...mapActions(['loadRecipeList', 'loadRecipe', 'setLoadingSomething'])
  }
}

</script>

<style scoped lang="scss">
@import '../main.scss';

.recipe-list {
  margin-top: $medium;
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 767px) {
    justify-content: flex-start;
  }

  @media (min-width: 768px) {
  }
}

.recipe {
}

</style>
