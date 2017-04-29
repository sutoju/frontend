<template>
  <div class="item">
    <div class="title">{{ title }}</div>
    <div class="image" :style="{ 'background-image': 'url('+imagesrc+')' }">
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'imagesrc'],
  name: 'list-item'
}

</script>

<style scoped lang="scss">
@import '../main.scss';
.item {
  position: relative;
  border-radius: 10px;
  border: 1px solid #dedede;
  margin: $small 0;
  padding: $medium;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100px;

}

.image {
  flex: 1;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

.title {
  font-size: 16pt;
  text-transform: capitalize;
}

.content {
}
</style>
