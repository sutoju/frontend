<template>
  <div class="item" @click="pushRoute">
    <img ref="recipeImage" class="image" :src="imagesrc"/>
    <router-link :to="link" class="title">{{ title }}</router-link>
  </div>
</template>

<script>

export default {
  props: ['title', 'link', 'imagesrc'],
  name: 'list-item',
  methods: {
    pushRoute() {
      this.$router.push(this.link)
    }
  },
  computed: {
    words: function() {
      if (this.title) {
        return this.title.split(' ')
      }
      return []
    }
  }
}

</script>

<style scoped lang="scss">
@import '../main.scss';

.item {
  @extend .source-serif;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  background-color: white;
  cursor: pointer;
  height: 220px;
  width: 220px;
  margin: 0 $medium $medium 0;
  padding: $medium;
  border: 1px solid $light_grey;
  border-radius: 10px;
  overflow: hidden;

  &:active {
    .image {
      filter: brightness(0.6) blur(4px);
    }
  }

  .title {
    text-decoration: none;
    position: absolute;
    top: 0;
    left: 0;
    color: white;
    padding: $medium;
    font-size: 26pt;
  }

  .image {
    filter: brightness(0.8) blur(4px);
    position: absolute;
    left: -25%;
    top: -10%;
    width: 200%;
  }

  @media (max-width: 767px) {
    height: 100px;
    width: 100px;

    .title {
      font-size: 16pt;
    }
  }
}

.title {
  text-transform: capitalize;
}

</style>
