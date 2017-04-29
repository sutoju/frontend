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
}

.toast {
  @extend .source-sans;
  border: 1px solid #dedede;
  border-radius: $radius_small;
  box-shadow: 0px 1px 1px 0px rgba(132, 132, 132, 0.2);
  color: #cacaca;
  background-color: #474747;
}

</style>
