<template>
  <div v-if="animating" class="container">
    <div class="spinner">
      <icon name="circle-o-notch" scale="5" fw spin></icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'spinner',
  props: ['animating']
}

</script>

<style scoped lang="scss">
@import '../main.scss';

.container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner {
  top: 20vh;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 110px;
  height: 110px;
  color: white;
  background: black;
  opacity: 0.2;
  border-radius: 16px;
}

</style>
