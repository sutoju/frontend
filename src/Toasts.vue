<template>
  <div class="toast-container">
    <div class="container-small box well toast" v-for="text in getVisibleToasts">{{text}}</div>
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
}

.toast {
  @extend .sans-serif;
}

</style>
