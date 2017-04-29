<template>
  <div class="item">
    <img class="image" :src="imagesrc"/>
    <div class="title">
      <!--<div class="word" v-for="word in words">{{ word }}</div>-->
      {{ title }}
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
  border-bottom: 1px solid #dedede;
  
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  &:first-child {
    border-top: 1px solid #dedede;
  }

  @media (max-width: 767px) {
    height: 80px;

    .title {
      flex: 1;
      line-height: 0.9;
      font-size: 18pt;
      color: transparentize(#333, 0.1);
      background: white;
      padding: $small;

      .word {
        display: inline-block;
        background: white;
      }
    }
  }
}

.image {
  width: 120px;
  // background-position: left;
  // background-repeat: no-repeat;
  // background-size: 30%;
}

.title {
  text-transform: capitalize;
}

.content {
}
</style>
