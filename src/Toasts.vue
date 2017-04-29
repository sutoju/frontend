<template>
  <div class="toast-container">
    <div class="container toast" v-for="toast in getVisibleToasts">{{toast.text}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'toasts',
  computed: {
    ...mapGetters(['getVisibleToasts'])
  }
}

</script>

<style scoped lang="scss">
@import './main.scss';

.toast-container {
  position: absolute;
  bottom: 2 * $large;
  left: 2 * $large;

  @media (max-width: 767px) {
    top: $large * 4;
    left: $medium;
    right: $medium;
  }
}

.toast {
  @extend .source-sans;
  border-radius: $radius_small;
  color: #cacaca;
  padding: $medium;
  background-color: #474747;
}

</style>
