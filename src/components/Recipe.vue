<template>
  <div v-if="recipe && recipeMeta">
    <div class="recipe-header">
      <div class="recipe-image"
           v-bind:style="{ 'background-image': 'url(' + recipeMeta.image_url + ')' }"></div>
      <div class="recipe-title">{{ recipeMeta.title }}</div>
    </div>
  
    <div class="recipe container round">
      <li class="ingredient"
          v-for="ingredient in recipe"
          :key="ingredient">
        {{ ingredient }}
      </li>
    </div>
  
  </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'recipe',
  mounted() {
    if (this.$route.params.id) {
      if (this.recipeList.length === 0) {
        this.loadRecipeList()
      }
      if (!this.recipies[this.$route.params.id]) {
        // console.log('must load recipe ' + this.$route.params.id)
        this.loadRecipe(this.$route.params.id)
      }
    }
  },
  computed: {
    recipeMeta() {
      const recipe = this.recipeList.find(r => {
        // console.log(r.recipe_id, this.$route.params.id)
        const asd = r.recipe_id === this.$route.params.id
        // console.log(asd)
        return asd
      })
      if (recipe) {
        return recipe
      }
    },
    recipe() {
      return this.recipies[this.$route.params.id]
    },
    ...mapGetters(['recipies', 'recipeList'])
  },
  methods: {
    ...mapActions(['loadRecipe', 'loadRecipeList'])
  }
}
</script>

<style scoped lang="scss">
@import '../main.scss';

.recipe-header {
  position: relative;
  height: 240px;
  overflow: hidden;
}

.recipe-title {
  @extend .source-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  margin: $large;
  font-size: 50pt;
  color: white;

  @media (max-width: 767px) {
    font-size: 40pt;
  }
}

.recipe-image {
  top: -10px;
  left: -10px;
  position: absolute;
  filter: brightness(0.8) blur(4px);
  width: 120%;
  height: 120%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}

.recipe {
  margin: 0 auto;
  max-width: 600px;
}

.ingredient {
  @extend .source-sans;
  border-bottom: 1px solid $grey;
  padding-bottom: $medium;
  margin-bottom: $medium;
  font-size: 14pt;
  color: #414141;
  padding: $medium $small;

  &:last-child {
    border-bottom: none;
  }
}
</style>
