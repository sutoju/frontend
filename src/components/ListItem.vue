<template>
  <div class="item">
    <div class="image" :style="{ 'background-image': 'url('+imagesrc+')' }">
      <div class="title">
        <div class="word" v-for="word in words">{{ word }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'imagesrc'],
  name: 'list-item',
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
  @extend .source-sans;
  position: relative;
  border-radius: 10px;
  border: 1px solid #dedede;
  margin: $small 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100px;
  overflow: hidden;

  @media (max-width: 767px) {
    height: 160px;

    .title {
      line-height: 0.9;
      font-size: 40pt;
      color: transparentize(#333, 0.1);

      .word {
        display: inline-block;
        background: white;
      }
    }
  }
}

.image {
  flex: 1;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
}

.title {
  text-transform: capitalize;
}

.content {
}
</style>
