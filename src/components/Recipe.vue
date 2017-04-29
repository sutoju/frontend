<template>
    <div v-if="recipe && recipeMeta">
    <div class="recipe-header">
      <div class="recipe-image" v-bind:style="{ 'background-image': 'url(' + recipeMeta.image_url + ')' }"></div>
      <div class="recipe-title">{{ recipeMeta.title }}</div>
    </div>

      <div class="recipe container round">
        <li class="ingredient" v-for="ingredient in recipe">
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
        console.log('must load recipe ' + this.$route.params.id)
        this.loadRecipe(this.$route.params.id)
      }
    }
  },
  computed: {
    recipeMeta () {
      const recipe = this.recipeList.find(r => {
        console.log(r.recipe_id, this.$route.params.id)
        const asd = r.recipe_id === this.$route.params.id
        console.log(asd)
        return asd
      })
      if (recipe) {
        return recipe
      }
    },
    recipe () {
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
  z-index: 999;
  color: white;
}

.recipe-image {
  top: -10px;
  left: -10px;
  position: absolute;
  filter: blur(5px);
  width: 120%;
  height: 120%;
  background-repeat: no-repeat;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
}

.ingredient {
  @extend .source-sans;
  font-size: 16pt;
  color: #414141;
  padding: $small;
}

</style>
