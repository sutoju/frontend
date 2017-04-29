<template>
  <div class="item">
    <img ref="recipeImage" class="image" :src="imagesrc"/>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script>
// import Vibrant from 'node-vibrant'

// const getSwatch = (img) => {
//   const vibrant = new Vibrant(img)
//   const swatches = vibrant.swatches()
//   console.log(swatches)
// }

/*
* Results into:
* Vibrant #7a4426
* Muted #7b9eae
* DarkVibrant #348945
* DarkMuted #141414
* LightVibrant #f3ccb4
*/

export default {
  props: ['title', 'imagesrc'],
  name: 'list-item',
  mounted () {
    // const el = this.$refs.recipeImage
    // getSwatch(el)
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
  @extend .source-sans;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  background-color: white;

  // @media (min-width: 768px) {
    height: 220px;
    width: 220px;
    margin: 0 $medium $medium 0;
    padding: $medium;
    border: 1px solid $light_grey;
    border-radius: 10px;
    overflow: hidden;

    .title {
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
      width: 200%;
    }

  // }

  @media (max-width: 767px) {
    height: 100px;
    width: 100px;

    .title {
      font-size: 16pt;
    }
  }
  //   height: 80px;
  //   border-bottom: 1px solid #dedede;

  //   &:first-child {
  //     border-top: 1px solid #dedede;
  //   }

  //   .title {
  //     flex: 1;
  //     line-height: 0.9;
  //     font-size: 18pt;
  //     color: transparentize(#333, 0.1);
  //     background: white;
  //     padding: $small;

  //     .word {
  //       display: inline-block;
  //       background: white;
  //     }
  //   }

  //   .image {
  //     width: 120px;
  //   }
  // }
}

.title {
  text-transform: capitalize;
}

.content {
}
</style>
